import {
  FETCH_RETRAITES,
  FETCH_RETRAITES_SUCCESS,
  FETCH_RETRAITES_FAIL,
} from "../actions/types";

const INIITAL_STATE = {
  retraites: [],
  isloadingRetraites: false,
  retraiteNumber: null,
};

export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RETRAITES:
      return { ...state, isloadingRetraites: true };
    case FETCH_RETRAITES_SUCCESS:
      return {
        ...state,
        isloadingRetraites: false,
        retraites: action.payload.data,
        retraiteNumber: action.payload.total,
      };
    case FETCH_RETRAITES_FAIL:
      return {
        ...state,
        isloadingRetraites: false,
      };
    default:
      return state;
  }
};
