export const LOGIN_REQUEST = "LOGIN_REQUEST" as const;
export const LOGIN_SUCCESS = "LOGIN_SUCCESS" as const;
export const LOGIN_FAILURE = "LOGIN_FAILURE" as const;
export const LOGOUT = "LOGOUT";

export const LOAD_CURRENT_LOGIN_USER_REQUEST =
  "LOAD_CURRENT_LOGIN_USER_REQUEST" as const;
export const LOAD_CURRENT_LOGIN_USER_SUCCESS =
  "LOAD_CURRENT_LOGIN_USER_SUCCESS" as const;
export const LOAD_CURRENT_LOGIN_USER_FAILURE =
  "LOAD_CURRENT_LOGIN_USER_FAILURE" as const;
export interface AuthenticatedUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  role: string;
}
interface LogInRequest {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}
interface LogInSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    data: {
      token: string;
      user: AuthenticatedUser;
    };
  };
}
interface LogInFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}
interface LogOut {
  type: typeof LOGOUT;
}

interface LoadCurrentLoginUserRequest {
  type: typeof LOAD_CURRENT_LOGIN_USER_REQUEST;
}

interface LoadCurrentLoginUserSuccess {
  type: typeof LOAD_CURRENT_LOGIN_USER_SUCCESS;
  payload: {
    data: {
      // token: string;
      user: AuthenticatedUser;
    };
  };
}

interface LoadCurrentLoginUserFailure {
  type: typeof LOAD_CURRENT_LOGIN_USER_FAILURE;
  payload: {
    error: string;
  };
}

export interface AccountState {
  data: {
    user: AuthenticatedUser | null;
  };
  loading: boolean;
  error: string | null;
  token: string | null;
}

export type AccountActionTypes =
  | LogInRequest
  | LogInSuccess
  | LogInFailure
  | LogOut
  | LoadCurrentLoginUserRequest
  | LoadCurrentLoginUserSuccess
  | LoadCurrentLoginUserFailure;
