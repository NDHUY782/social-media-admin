import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USERS_FAILURE,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  IAddUserRequest,
  IUpdateUserRequest,
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersActionTypes,
} from "./types";
import { Action, Dispatch } from "redux";

import { userService } from "../../services";
import { UrlConstants } from "../../constants";
import { NavigateFunction } from "react-router-dom";
import { alertError, alertSuccess, clearAlert } from "../alert/actions";
import { AlertActionTypes } from "../alert/types";
import { ThunkDispatch } from "redux-thunk";

export const loadUsersPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_PAGING_REQUEST,
      });

      const res = await userService.getUsersPaging(keyword, currentPage);
      dispatch({
        type: LOAD_USERS_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USERS_PAGING_FAILURE,
        payload: { error: (error as Error).message },
      });
    }
  };
};
export const loadAdminsPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_PAGING_REQUEST,
      });

      const res = await userService.getAdminsPaging(keyword, currentPage);
      dispatch({
        type: LOAD_USERS_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USERS_PAGING_FAILURE,
        payload: { error: (error as Error).message },
      });
    }
  };
};

export const addAdmin = (user: IAddUserRequest, navigate: NavigateFunction) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: ADD_USER_REQUEST,
      });

      await userService.addAdminForSystem(user);
      dispatch({
        type: ADD_USER_SUCCESS,
      });

      dispatch(alertSuccess("Add user successfully"));

      navigate(UrlConstants.USERS_LIST);
    } catch (error) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: { error: (error as Error).message },
      });

      dispatch(alertError("Add user Failure"));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 2000);
  };
};
export const getAdminById = (id: string) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: GET_USER_BY_ID_REQUEST,
      });

      const res = await userService.getAdminById(id);

      dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: {
          user: res,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_USER_BY_ID_FAILURE,
        payload: { error: (error as Error).message },
      });
    }
  };
};

export const updateAdmin = (
  id: string,
  user: IUpdateUserRequest,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });

      await userService.updateAdmin(id, user);

      dispatch({
        type: UPDATE_USER_SUCCESS,
      });

      dispatch(alertSuccess("Cập nhật người dùng thành công"));

      navigate(UrlConstants.ADMIN_LIST);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error: (error as Error).message },
      });
      dispatch(alertError("Cập nhật người dùng thất bại"));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const deleteAdmins = (user_ids: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, Action>) => {
    try {
      dispatch({
        type: DELETE_USERS_REQUEST,
      });

      await userService.deleteAdmins(user_ids);
      dispatch({
        type: DELETE_USERS_SUCCESS,
      });
      dispatch(loadUsersPaging("", 1));
    } catch (error) {
      dispatch({
        type: DELETE_USERS_FAILURE,
        payload: { error: (error as Error).message },
      });
    }
  };
};
