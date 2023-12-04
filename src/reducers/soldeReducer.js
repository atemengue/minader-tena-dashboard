import {
  FETCH_SOCLE_SUCCESS,
  FETCH_SOLDES_NUMBER,
  FETCH_SOLDES_PERSONNELS,
  FETCH_SOLDES_PERSONNELS_FAIL,
  FETCH_SOLDES_PERSONNELS_SUCCESS,
  UPDATE_MATRICULES,
  UPDATE_MATRICULES_FAIL,
  UPDATE_MATRICULES_SUCCESS,
} from "../actions/types";

// faire la gestion des errreurs dans le reducer

const INITIAL_STATE = {
  personnels: [],
  personnel: null,
  isLoadingOne: false,
  isLoadingTwo: false,
  isLoading: false,
  soldeNumber: 0,
  solde: null,
  socle: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SOLDES_NUMBER:
      return { ...state, solde: action.payload, isLoadingOne: false };
    case FETCH_SOLDES_PERSONNELS:
      return { ...state, isLoadingTwo: true };
    case FETCH_SOLDES_PERSONNELS_SUCCESS:
      return {
        ...state,
        isLoadingTwo: false,
        personnels: action.payload.data,
        soldeNumber: action.payload.total,
      };
    case FETCH_SOLDES_PERSONNELS_FAIL:
      return {
        ...state,
        isLoadingTwo: false,
      };

    case UPDATE_MATRICULES:
      return { ...state, isLoading: true };
    case UPDATE_MATRICULES_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_MATRICULES_FAIL:
      return { ...state, isLoading: false };
    case FETCH_SOCLE_SUCCESS: {
      return { ...state, socle: action.payload };
    }
    default:
      return state;
  }
};
