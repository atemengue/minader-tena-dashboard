import {
  FETCH_ACTES,
  FETCH_ACTES_SUCCESS,
  FETCH_ACTE_SUCCESS,
  FETCH_NATURES_ACTES,
} from "../actions/types";

const INITIAL_STATE = {
  naturesActes: [],
  actes: [],
  loader: false,
  acte: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_NATURES_ACTES:
      return {
        ...state,
        naturesActes: action.payload,
      };

    case FETCH_ACTES:
      return {
        ...state,
        loader: true,
      };
    case FETCH_ACTES_SUCCESS:
      return {
        ...state,
        actes: action.payload.data,
        loader: false,
      };
    case FETCH_ACTE_SUCCESS: {
      return {
        ...state,
        acte: action.payload,
      };
    }
    default:
      return state;
  }
}
