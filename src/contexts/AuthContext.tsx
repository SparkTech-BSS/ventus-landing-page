import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { addSeconds } from "date-fns";
import Router from "next/router";
import { UserDTO, LoginDTO } from "../dto";
import { getCurrentUserObject } from "../services/auth.service";
import { api } from "../services/api";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserDTO | null | any;
  signIn: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  getLoginStatus: () => any;
  openLoginModal: boolean;
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export async function signOut() {
  try {
    if (typeof window !== "undefined") {
      const { "ventus.refreshToken": refresh_token } = parseCookies();
      const { data } = await api.post("logout", {
        refreshToken: refresh_token,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    destroyCookie(undefined, "ventus.token");
    destroyCookie(undefined, "ventus.refreshToken");
    destroyCookie(undefined, "ventus.tokenDateExpiration");
    destroyCookie(undefined, "ventus.refreshTokenDateExpiration");

    Router.push("/");
  }
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "ventus.token": access_token } = parseCookies();

    if (access_token || !(access_token === "undefined")) {
      setUser(getCurrentUserObject());
    }
  }, []);

  async function signIn({ username, password }: UserDTO) {
    const { data } = await api.post("login", { username, password });

    const access_token = data.access_token;

    const refresh_token = data.refresh_token;

    setCookie(undefined, "ventus.token", access_token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days,
      // path: '/'
    });

    setCookie(undefined, "ventus.refreshToken", refresh_token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days,
    });

    const date = new Date();

    const expirationTokenDate = String(addSeconds(date, data?.expires_in));

    const expirationRefreshTokenDate = String(
      addSeconds(date, data?.refresh_expires_in)
    );

    setCookie(undefined, "ventus.tokenDateExpiration", expirationTokenDate);

    setCookie(
      undefined,
      "ventus.refreshTokenDateExpiration",
      expirationRefreshTokenDate
    );

    setCookie(undefined, "login.status", data.statusCode, {
      maxAge: 24 * 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

    setUser(getCurrentUserObject());

    setOpenLoginModal(false);
  }

  async function logout() {
    try {
      if (typeof window !== "undefined") {
        const { "ventus.refreshToken": refresh_token } = parseCookies();
        const { data } = await api.post("logout", {
          refreshToken: refresh_token,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      destroyCookie(undefined, "ventus.token");
      destroyCookie(undefined, "ventus.refreshToken");
      destroyCookie(undefined, "ventus.tokenDateExpiration");
      destroyCookie(undefined, "ventus.refreshTokenDateExpiration");

      setUser(getCurrentUserObject());

      Router.push("/");
    }
  }

  function getLoginStatus() {
    const { "login.status": error } = parseCookies() as any;
    return error;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        logout,
        getLoginStatus,
        openLoginModal,
        setOpenLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
