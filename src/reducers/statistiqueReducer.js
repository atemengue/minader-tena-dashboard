import {
  GET_CLASSIFICATION,
  GET_CLASSIFICATION_SUCCESS,
  GET_CLASSIFICATION_FAIL,
} from "../actions/types";

// faire la gestion des errreurs dans le reducer

const INITIAL_STATE = {
  loading: false,
  classification: [],
  error: "",
  total: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CLASSIFICATION:
      return { ...state, loading: true };
    case GET_CLASSIFICATION_SUCCESS:
      return {
        ...state,
        classification: action.payload.corps,
        loading: false,
        total: action.payload.totalGeneral,
      };
    case GET_CLASSIFICATION_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
