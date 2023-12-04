import {
  FETCH_GRADES,
  FETCH_GRADES_FAIL,
  FETCH_GRADES_SUCCESS,
} from "../actions/gardeActions/types";

const INITIAL_STATE = {
  isLoading: false,
  grades: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GRADES:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_GRADES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        grades: action.payload,
      };
    case FETCH_GRADES_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
