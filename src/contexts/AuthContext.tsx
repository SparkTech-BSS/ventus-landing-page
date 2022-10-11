import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { UserDTO, LoginDTO } from "../dto";
import { getCurrentUserObject } from "../services/auth.service";
import { api } from "../services/api";

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserDTO | null;
  signIn: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  getLoginStatus: () => any;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);

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

    setCookie(undefined, "ventus.token", access_token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setCookie(undefined, "login.status", data.error, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

    setUser(getCurrentUserObject());

    Router.push("/");
  }

  function logout() {
    destroyCookie(null, "ventus.token");
    Router.push("/");
    Router.reload();
  }

  function getLoginStatus() {
    const { "login.status": error } = parseCookies() as any;
    return error;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout, getLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
