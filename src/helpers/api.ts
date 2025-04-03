import axios from "axios";
import env from "react-dotenv";
import { store } from "../store";
import { logout } from "../store/accounts/actions";
import { UrlConstants } from "../constants";

const api = axios.create({
  baseURL: `${env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch(logout());
      window.location.href = UrlConstants.LOGIN;
    }
    Promise.reject(err);
  }
);
export { api };
