import {
  FETCH_POSITIONS,
  FETCH_POSITIONS_FAIL,
  FETCH_POSITIONS_SUCCESS,
  FETCH_POSITIONS_PERSONNELS,
  FETCH_POSITIONS_PERSONNELS_FAIL,
  FETCH_POSITIONS_PERSONNELS_SUCCESS,
  FETCH_POSITIONS_NUMBER,
} from "../actions/types";

// faire la gestion des errreurs dans le reducer

const INITIAL_STATE = {
  personnels: [],
  personnel: null,
  isLoadingOne: false,
  isLoadingTwo: false,
  positionNumber: null,
  positionList: [],
  position: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSITIONS_NUMBER: {
      return { ...state, position: action.payload, isLoadingOne: false };
    }
    case FETCH_POSITIONS:
      return { ...state, isLoadingOne: true };
    case FETCH_POSITIONS_SUCCESS:
      return {
        ...state,
        isLoadingOne: false,
        positionList: action.payload,
      };
    case FETCH_POSITIONS_FAIL:
      return { ...state, isLoadingOne: true };
    case FETCH_POSITIONS_PERSONNELS:
      return { ...state, isLoadingTwo: true };
    case FETCH_POSITIONS_PERSONNELS_SUCCESS:
      return {
        ...state,
        isLoadingTwo: false,
        personnels: action.payload.data,
        positionNumber: action.payload.total,
      };
    case FETCH_POSITIONS_PERSONNELS_FAIL:
      return {
        ...state,
        isLoadingTwo: false,
      };
    default:
      return state;
  }
};
