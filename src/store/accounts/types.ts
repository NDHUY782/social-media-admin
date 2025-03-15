export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export interface AuthenticatedUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
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

export interface AccountState {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

export type AccountActionTypes =
  | LogInRequest
  | LogInSuccess
  | LogInFailure
  | LogOut;
