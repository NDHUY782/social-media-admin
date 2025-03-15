import {
  AccountActionTypes,
  AccountState,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./types";
const initialState: AccountState = {
  user: null,
  loading: false,
  error: null,
  token: null,
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
      return { ...state, token: action.payload.data.token, loading: false };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    }
    case LOGOUT: {
      return { ...state, user: null, token: null, loading: false };
    }
    default:
      return state;
  }
};
export default accountReducer;
