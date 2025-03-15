import { Dispatch } from "react";
import {
  AccountActionTypes,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import { userService } from "../../services";
import { history } from "../../helpers";

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
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
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
