import {
  CREATE_STRUCTURE_SUCCESS,
  FETCH_ALL_STRUCTURES_SUCCESS,
  FETCH_NATURES_STRUCTURE,
  FETCH_NATURES_STRUCTURE_SUCCESS,
  FETCH_STRUCTURE,
  FETCH_STRUCTURES,
  FETCH_STRUCTURES_BY_NATURE,
  FETCH_STRUCTURES_BY_NATURE_SUCCESS,
  FETCH_STRUCTURES_FAIL,
  FETCH_STRUCTURES_SUCCESS,
  FETCH_STRUCTURE_FAIL,
  FETCH_STRUCTURE_SUCCESS,
  FETCH_TYPES_STRUCTURE,
  FETCH_TYPES_STRUCTURE_SUCCESS,
} from "../actions/types";

const INIITAL_STATE = {
  data: null, // RENOMMER structureByTye
  typeStructures: [],
  structure: null,
  isLoadingStructure: false,
  isLoadingByType: false,
  isLoadingByNature: false,
  natureStructures: [],
  structuresByNature: null,
  isLoadingStructureByNature: false,
  structures: null, // revoir
};

// nettoyer le reducer
// ajouter la gestion des erreurs
export default (state = INIITAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_STRUCTURES_SUCCESS:
      return { ...state, structures: action.payload };
    case FETCH_STRUCTURES:
      return { ...state, isLoadingByType: true };
    case FETCH_STRUCTURES_SUCCESS:
      return {
        ...state,
        isLoadingByType: false,
        data: action.payload,
        total: action.payload.total,
      };
    case FETCH_STRUCTURES_FAIL:
      return {
        ...state,
        isLoadingByType: false,
      };
    case FETCH_STRUCTURE:
      return {
        ...state,
        isLoadingStructure: true,
      };
    case FETCH_STRUCTURE_SUCCESS:
      return { ...state, structure: action.payload, isLoadingStructure: false };
    case FETCH_STRUCTURE_FAIL:
      return {
        ...state,
        isLoadingStructure: false,
      };
    case FETCH_TYPES_STRUCTURE:
      return {
        ...state,
        isLoadingByType: true,
      };
    case FETCH_TYPES_STRUCTURE_SUCCESS:
      return {
        ...state,
        isLoadingByType: false,
        typeStructures: action.payload.data,
      };

    case FETCH_NATURES_STRUCTURE:
      return {
        ...state,
        isLoadingByNature: true,
      };
    case FETCH_NATURES_STRUCTURE_SUCCESS:
      return {
        ...state,
        natureStructures: action.payload.data,
      };
    case FETCH_STRUCTURES_BY_NATURE:
      return {
        ...state,
        isLoadingStructureByNature: true,
      };
    case FETCH_STRUCTURES_BY_NATURE_SUCCESS: {
      return {
        ...state,
        isLoadingStructureByNature: false,
        structuresByNature: action.payload,
      };
    }
    case CREATE_STRUCTURE_SUCCESS: {
      return {
        ...state,
        structures: {
          ...state.structures,
          data: [action.payload, ...state.structures.data],
        },
      };
    }
    default:
      return state;
  }
};
