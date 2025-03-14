import { Dispatch } from "react";
import {
  AccountActionType,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
import { userService } from "../../services";

export const login = (email: string, password: string) => {
  return (dispatch: Dispatch<AccountActionType>) => {
    dispatch({
      type: LOGIN_REQUEST,
      payload: { email: email, password: password },
    });
    userService.login(email, password).then(
      (res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res });
      },
      (error) => {
        dispatch({ type: LOGIN_FAILURE, payload: { error: error.toString() } });
      }
    );
  };
};
export const logout = (): AccountActionType => {
  return {
    type: LOGOUT,
  };
};
