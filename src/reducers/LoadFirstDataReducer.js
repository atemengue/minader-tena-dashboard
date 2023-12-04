import { API_FIRST_CALL_SUCCESS } from "../actions/types";

// faire la gestion des errreurs dans le reducer

const INITIAL_STATE = {
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_FIRST_CALL_SUCCESS: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};
