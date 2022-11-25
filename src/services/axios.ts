import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { addSeconds } from "date-fns";
import { getRefreshTokenObject } from "./auth.service";
import { signOut } from "../contexts/AuthContext";
import { AuthTokenError } from "./errors/AuthTokenError";

//https://dev.ventusapi.com
//https://ventusapi.com/

interface AxiosErrorResponse {
  code?: string;
  statusCode?: number | any;
}

interface failedRequestsQueueData {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError) => void;
}

let isRefreshing = false;
let failedRequestsQueue: failedRequestsQueueData[] = [];

export function getAPIClient(ctx?: any) {
  let cookies: any;

  const { "ventus.token": access_token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "https://dev.ventusapi.com/",
  });

  api.interceptors.request.use((config) => {
    // console.log(config);

    return config;
  });

  if (access_token) {
    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  }

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.status === 401) {
        if (error.response?.data?.statusCode === 401) {
          cookies = parseCookies(ctx);
          const originalConfig = error.config;

          const { "ventus.token": access_token } = cookies;

          const { "ventus.refreshToken": refresh_token } = cookies;

          const { "ventus.tokenDateExpiration": expirationTokenDate } = cookies;

          const {
            "ventus.refreshTokenDateExpiration": expirationRefreshTokenDate,
          } = cookies;

          // const tokenDecoded = getRefreshTokenObject(access_token);

          // const refreshTokenDecoded = getRefreshTokenObject(refresh_token);

          const currentData = new Date();

          if (
            currentData > new Date(expirationTokenDate) &&
            currentData < new Date(expirationRefreshTokenDate)
          ) {
            if (!isRefreshing) {
              isRefreshing = true;

              api
                .post("/refresh_token", {
                  refreshToken: refresh_token,
                })
                .then((response) => {
                  const { data } = response;

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

                  const expirationTokenDate = String(
                    addSeconds(date, data?.expires_in)
                  );

                  const expirationRefreshTokenDate = String(
                    addSeconds(date, data?.refresh_expires_in)
                  );

                  setCookie(
                    undefined,
                    "ventus.tokenDateExpiration",
                    expirationTokenDate
                  );

                  setCookie(
                    undefined,
                    "ventus.refreshTokenDateExpiration",
                    expirationRefreshTokenDate
                  );

                  api.defaults.headers.common.Authorization = `Bearer ${access_token}`;

                  failedRequestsQueue.forEach((request) =>
                    request.onSuccess(access_token)
                  );

                  failedRequestsQueue = [];
                })
                .catch((err) => {
                  console.log(err);
                  failedRequestsQueue.forEach((request) =>
                    request.onFailure(err)
                  );
                  failedRequestsQueue = [];

                  if (typeof window !== "undefined") {
                    signOut();
                  }
                })
                .finally(() => {
                  isRefreshing = false;
                });
            }

            return new Promise((resolve, reject) => {
              failedRequestsQueue.push({
                onSuccess: (token: string) => {
                  if (originalConfig?.headers) {
                    originalConfig.headers.Authorization = `Bearer ${token}`;

                    resolve(api(originalConfig));
                  }

                  // originalConfig.headers['Authorization'] = `Bearer ${token}`

                  // originalConfig.headers.common!.Authorization = `Bearer ${token}`

                  // resolve(api(originalConfig))
                },
                onFailure: (err: AxiosError) => {
                  reject(err);
                },
              });
            });
          } else if (
            currentData > new Date(expirationTokenDate) &&
            currentData > new Date(expirationRefreshTokenDate)
          ) {
            if (typeof window !== "undefined") {
              signOut();
            } else {
              return Promise.reject(new AuthTokenError());
            }
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

//josedasilva0112@gmail.com
//123456
