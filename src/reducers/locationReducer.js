import {
  FETCH_ALL_LOCATIONS,
  FETCH_ALL_LOCATIONS_FAIL,
  FETCH_ALL_LOCATIONS_SUCCESS,
} from "../actions/locationActions/types";

const INITIAL_STATE = {
  isLoading: false,
  regions: [],
  arrondissements: [],
  departements: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_LOCATIONS: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_ALL_LOCATIONS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        regions: action.payload.regions,
        arrondissements: action.payload.arrondissements,
        departements: action.payload.departements,
      };
    }
    case FETCH_ALL_LOCATIONS_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};
