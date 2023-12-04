import {
  CHECK_TOKEN,
  CHECK_TOKEN_FAIL,
  CHECK_TOKEN_SUCCESS,
  EMAIL_CHANGED,
  EMAIL_LOGIN,
  EMAIL_LOGIN_FAIL,
  EMAIL_LOGIN_SUCCESS,
  LOG_OUT,
  PASSWORD_CHANGED,
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  token: null,
  roles: [],
  authState: false,
  isToken: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECK_TOKEN:
      return { ...state, loading: true };
    case CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        isToken: true,
      };
    case CHECK_TOKEN_FAIL:
      return {
        ...state,
        loading: false,
        isToken: false,
      };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case EMAIL_LOGIN:
      return { ...state, loading: true, error: "" };
    case EMAIL_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        email: "",
        password: "",
        isToken: true,
      };
    case EMAIL_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isToken: false,
        error: action.payload,
      };
    case LOG_OUT:
      return { ...state, loading: false, token: null, isToken: false };
    default:
      return state;
  }
};
