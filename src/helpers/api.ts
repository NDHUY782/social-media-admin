import axios from "axios";
import env from "react-dotenv";
import { AppState, store } from "../store";
import { UrlConstants } from "../constants";
import {
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "../store/accounts/types";

const api = axios.create({
  baseURL: `${env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response.status === 401) {
      const originalRequest = err.config;
      const currentState = store.getState() as AppState;
      const refreshToken = currentState.account.refreshToken;
      if (
        err.response.status === 401 &&
        originalRequest.url === `${env.API_URL}/api/users/refresh-token`
      ) {
        window.location.href = UrlConstants.LOGIN;
        return Promise.reject(err);
      }

      if (
        err.response.data.error === "jwt expired" &&
        err.response.statusText === "Unauthorized"
      ) {
        if (refreshToken) {
          store.dispatch({
            type: REFRESH_TOKEN_REQUEST,
          });
          // try {
          //   const response = await api.post("/users/refresh-token", {
          //     refreshToken: refreshToken,
          //   });
          //   store.dispatch({
          //     type: REFRESH_TOKEN_SUCCESS,
          //     payload: {
          //       token: response.data.token,
          //       refreshToken: response.data.refreshToken,
          //     },
          //   });
          //   api.defaults.headers.common[
          //     "Authorization"
          //   ] = `Bearer ${response.data.token}`;
          //   originalRequest.headers[
          //     "Authorization"
          //   ] = `Bearer ${response.data.token}`;
          //   return api(originalRequest);
          // } catch (err) {
          //   store.dispatch({
          //     type: REFRESH_TOKEN_FAILURE,
          //     payload: { err: (err as Error).message },
          //   });
          //   window.location.href = UrlConstants.LOGIN;
          //   return Promise.reject(err);
          // }
          return api
            .post("/users/refresh-token", { refreshToken: refreshToken })
            .then((response) => {
              store.dispatch({
                type: REFRESH_TOKEN_SUCCESS,
                payload: {
                  token: response.data.token,
                  refreshToken: response.data.refreshToken,
                },
              });
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${response.data.token}`;
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${response.data.token}`;
              return api(originalRequest);
            })
            .catch((err) => {
              store.dispatch({
                type: REFRESH_TOKEN_FAILURE,
                payload: {
                  error: err.toString(),
                },
              });
              window.location.href = UrlConstants.LOGIN;
            });
        } else {
          console.log("Refresh token not available.");
          window.location.href = UrlConstants.LOGIN;
        }
      } else {
        // Nếu lỗi 401 không phải do jwt expired thì chuyển hướng luôn
        window.location.href = UrlConstants.LOGIN;
        return Promise.reject(err);
      }

      // store.dispatch(logout());
      // window.location.href = UrlConstants.LOGIN;
    }
    Promise.reject(err);
  }
);
export { api };
