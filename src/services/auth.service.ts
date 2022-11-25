import { parseCookies } from "nookies";
import decode from "jwt-decode";

export const getCurrentUserObject = (): any => {
  const { "ventus.token": access_token } = parseCookies();
  if (access_token == "undefined" || !access_token) return "";
  //   console.log('yes')
  const data_decoded: any = decode(access_token);
  return data_decoded;
};

export const getRefreshTokenObject = (refresh_token: string): any => {
  return decode(refresh_token);
};
