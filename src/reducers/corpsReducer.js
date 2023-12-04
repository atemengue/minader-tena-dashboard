import {
  FETCH_CORPS,
  FETCH_CORPS_FAIL,
  FETCH_CORPS_SUCCESS,
} from "../actions/corpsActions/types";

const INITIAL_STATE = {
  isLoading: false,
  corps: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CORPS:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CORPS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        corps: [
          {
            idCorps: 0,
            libelleCorps: "Tout les corps",
            grades: [],
          },
          ...action.payload,
        ],
      };
    case FETCH_CORPS_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
