import { Dispatch } from "react";
import {
  AccountActionTypes,
  LOAD_CURRENT_LOGIN_USER_FAILURE,
  LOAD_CURRENT_LOGIN_USER_REQUEST,
  LOAD_CURRENT_LOGIN_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import { userService } from "../../services";

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email: email,
        password: password,
      },
    });

    try {
      const response = await userService.login(email, password);

      const { token, refreshToken, ...user } = response.data;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { data: { token, refreshToken, user } },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: (error as Error).message },
      });
    }
  };
};
export const getCurrentLoginUser = () => {
  return async (dispatch: Dispatch<AccountActionTypes>) => {
    dispatch({
      type: LOAD_CURRENT_LOGIN_USER_REQUEST,
    });
    try {
      const response = await userService.getCurrentLoginUser();
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_SUCCESS,
        payload: {
          data: {
            // token: response.data.token,
            user: {
              _id: response.data._id,
              email: response.data.email,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              avatar: response.data.image,
              role: response.data.role,
            },
          },
        },
      });
    } catch (error) {
      dispatch({
        type: LOAD_CURRENT_LOGIN_USER_FAILURE,
        payload: { error: (error as Error).message },
      });
    }
  };
};
export const logout = (): AccountActionTypes => {
  return {
    type: LOGOUT,
  };
};
