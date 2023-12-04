import {
  ALL_IN_ONE_POSTE,
  ALL_IN_ONE_POSTE_FAIL,
  DELETE_POSTES,
  DELETE_POSTES_SUCCESS,
  FETCH_NATURES_POSTES,
  FETCH_NATURES_POSTES_FAIL,
  FETCH_NATURES_POSTES_SUCCESSS,
  FETCH_POSTES,
  FETCH_POSTES_BY_NATURE_POSTE,
  FETCH_POSTES_BY_NATURE_POSTE_FAIL,
  FETCH_POSTES_BY_NATURE_POSTE_SUCCESS,
  FETCH_POSTES_BY_RANG,
  FETCH_POSTES_BY_RANG_FAIL,
  FETCH_POSTES_BY_RANG_SUCCESS,
  FETCH_POSTES_SUCCESS,
  FETCH_POSTE_SUCCESS,
  FETCH_RANGS_POSTES,
  FETCH_RANGS_POSTES_FAIL,
  FETCH_RANGS_POSTES_SUCCESS,
  UPDATE_MATRICULES_FAIL,
  UPDATE_POSTES,
  UPDATE_POSTES_SUCCESS,
  UPDATE_POSTE_INFORMATIONS_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  updateNumber: null,
  isLoadindAllPoste: false,
  isLoadingUpdate: false,
  isLoadingNature: false,
  isLoadingPosteByNature: false,
  isLoadingPosteByRang: false,
  isLoadindAllInOnePoste: false,
  rangList: [],
  postesRang: [],
  postesNature: [],
  natureList: [],
  postes: [],
  poste: {},
  isLoadingDelete: false,
  allInOnePoste: [],
};

// reorganiser le reducer des structures et des postes
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_POSTES:
      return { ...state, isLoadingDelete: true };
    case DELETE_POSTES_SUCCESS:
      return { ...state, isLoadingDelete: false };
    case FETCH_POSTES:
      return { ...state, isLoadindAllPoste: true };
    case FETCH_POSTES_SUCCESS:
      return { ...state, postes: action.payload, isLoadindAllPoste: false };
    case FETCH_POSTE_SUCCESS:
      return { ...state, poste: action.payload };
    case UPDATE_POSTES:
      return { ...state, isLoadingUpdate: true };
    case UPDATE_POSTES_SUCCESS:
      return { ...state, isLoadingUpdate: false, updateNumber: action.payload };
    case UPDATE_MATRICULES_FAIL:
      return { ...state, isLoadingUpdate: false };
    case FETCH_RANGS_POSTES:
      return { ...state, isLoadingRang: true };
    case FETCH_RANGS_POSTES_SUCCESS:
      return { ...state, isLoadingRang: false, rangList: action.payload };
    case FETCH_RANGS_POSTES_FAIL:
      return { ...state, isLoadingRang: false };
    case FETCH_POSTES_BY_RANG:
      return { ...state, isLoadingPosteByRang: true };
    case FETCH_POSTES_BY_RANG_SUCCESS:
      return {
        ...state,
        postesRang: action.payload.data,
        isLoadingPosteByRang: false,
      };
    case FETCH_POSTES_BY_RANG_FAIL:
      return { ...state, isLoadingPosteByRang: false };
    case FETCH_NATURES_POSTES:
      return {
        ...state,
        isLoadingNature: true,
      };
    case FETCH_NATURES_POSTES_SUCCESSS:
      return {
        ...state,
        isLoadingNature: false,
        natureList: [
          {
            idNaturePoste: 100,
            libelleNaturePoste: "Toutes les Natures",
          },
          ...action.payload,
        ],
      };
    case FETCH_NATURES_POSTES_FAIL:
      return {
        ...state,
        isLoadingNature: false,
      };

    case FETCH_POSTES_BY_NATURE_POSTE:
      return {
        ...state,
        isLoadingPosteByNature: true,
      };
    case FETCH_POSTES_BY_NATURE_POSTE_SUCCESS:
      return {
        ...state,
        postesNature: action.payload.data,
        isLoadingPosteByNature: false,
      };
    case FETCH_POSTES_BY_NATURE_POSTE_FAIL:
      return {
        ...state,
        isLoadingPosteByNature: false,
      };
    case UPDATE_POSTE_INFORMATIONS_SUCCESS:
      return {
        ...state,
      };

    case ALL_IN_ONE_POSTE:
      return {
        ...state,
        allInOnePoste: action.payload.data,
        isLoadindAllInOnePoste: true,
      };
    case ALL_IN_ONE_POSTE_FAIL:
      return {
        ...state,
        isLoadindAllInOnePoste: false,
      };
    default:
      return state;
  }
};
