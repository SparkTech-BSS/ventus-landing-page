import axios from "axios";
import { parseCookies } from "nookies";

//https://dev.ventusapi.com
//https://ventusapi.com/

export function getAPIClient(ctx?: any) {
  const { 'ventus.token': access_token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://dev.ventusapi.com/'
  })

  api.interceptors.request.use(config => {
    // console.log(config);

    return config;
  })

  if (access_token) {
    api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
  }

  return api;
}

//josedasilva0112@gmail.com
//123456