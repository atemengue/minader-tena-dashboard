import { ERROR_CLOSE, SET_ERROR } from "../actions/types";

const INITIAL_STATE = {
  error: null,
  message: null,
  isClosed: true,
};

export default (state = INITIAL_STATE, action) => {
  const { error, type } = action;
  if (type === ERROR_CLOSE) {
    return {
      error: null,
      isClosed: true,
    };
  } else if (type === SET_ERROR) {
    return {
      error: error,
      isClosed: false,
    };
  } else {
    return state;
  }
};
