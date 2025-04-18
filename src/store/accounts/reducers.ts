import {
  AccountActionTypes,
  AccountState,
  LOAD_CURRENT_LOGIN_USER_FAILURE,
  LOAD_CURRENT_LOGIN_USER_REQUEST,
  LOAD_CURRENT_LOGIN_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
} from "./types";
const initialState: AccountState = {
  data: { user: null },
  loading: false,
  error: null,
  token: null,
  refreshToken: null,
};
const accountReducer = (
  state: AccountState = initialState,
  action: AccountActionTypes
): AccountState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        data: { user: action.payload.data.user },
        token: action.payload.data.token,
        refreshToken: action.payload.data.refreshToken,
        loading: false,
        error: null,
      };
      // const newState = {
      //   ...state,
      //   data: { user: action.payload.data.user },
      //   token: action.payload.data.token,
      //   loading: false,
      //   error: null,
      // };
      // console.log("login success:", newState);
      // return newState;
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        token: null,
        refreshToken: null,
        loading: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        data: { user: null },
        token: null,
        error: null,
        loading: false,
      };
    }
    case LOAD_CURRENT_LOGIN_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case LOAD_CURRENT_LOGIN_USER_SUCCESS: {
      return {
        ...state,
        data: { user: action.payload.data.user },
        loading: false,
        error: null,
      };
      // const newState = {
      //   ...state,
      //   data: { user: action.payload.data.user },
      //   // token: action.payload.data.token,
      //   loading: false,
      //   error: null,
      // };
      // console.log("load curernt user:", newState);
      // return newState;
    }
    case LOAD_CURRENT_LOGIN_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return { ...state, loading: true };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      };
    }
    case REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        token: null,
        refreshToken: null,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
export default accountReducer;
