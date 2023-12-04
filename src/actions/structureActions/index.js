import api from "../../api";
import {
  FETCH_ALL_STRUCTURES,
  FETCH_ALL_STRUCTURES_SUCCESS,
  FETCH_NATURES_POSTES,
  FETCH_NATURES_POSTES_FAIL,
  FETCH_NATURES_POSTES_SUCCESSS,
  FETCH_NATURES_STRUCTURE,
  FETCH_NATURES_STRUCTURE_SUCCESS,
  FETCH_POSTES_BY_NATURE_POSTE,
  FETCH_POSTES_BY_NATURE_POSTE_FAIL,
  FETCH_POSTES_BY_NATURE_POSTE_SUCCESS,
  FETCH_STRUCTURE,
  FETCH_STRUCTURES,
  FETCH_STRUCTURES_BY_NATURE,
  FETCH_STRUCTURES_BY_NATURE_FAIL,
  FETCH_STRUCTURES_BY_NATURE_SUCCESS,
  FETCH_STRUCTURES_DECONCENTRES,
  FETCH_STRUCTURES_DECONCENTRES_SUCCESS,
  FETCH_STRUCTURES_FAIL,
  FETCH_STRUCTURES_SUCCESS,
  FETCH_STRUCTURE_SUCCESS,
  FETCH_TYPES_STRUCTURE,
  FETCH_TYPES_STRUCTURE_SUCCESS,
} from "../types";

export const fetchStructures = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_STRUCTURES });
  try {
    const response = await api.get("/structures");
    dispatch({ type: FETCH_ALL_STRUCTURES_SUCCESS, payload: response.data });
  } catch (error) {
    new Error(`erreur sur la requete${error}`); // gerer l'erreur
  }
};

export const fetchStructure = (idStructure) =>
  api.get(`/structures/${idStructure}`);

// export const fetchStructure = (idStructure) => async (dispatch) => {
//   dispatch({ type: FETCH_STRUCTURE });
//   try {
//     const response = await api.get(`/structures/${idStructure}`);
//     dispatch({ type: FETCH_STRUCTURE_SUCCESS, payload: response.data });
//   } catch (error) {
//     new Error(`erreur sur la requete${error}`); // gerer l'erreur
//   }
// };

export const fetchStructuresDeconcentres = () => async (dispatch) => {
  dispatch({ type: FETCH_STRUCTURES_DECONCENTRES });
  try {
    const response = await api.get("/structures/deconcentres");
    dispatch({
      type: FETCH_STRUCTURES_DECONCENTRES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    new Error(`erreur sur la requete${error}`); // gerer l'erreur
  }
};

export const fetchNaturePostes = () => async (dispatch) => {
  dispatch({ type: FETCH_NATURES_POSTES });
  try {
    const response = await api.get("/naturePostes");
    dispatch({
      type: FETCH_NATURES_POSTES_SUCCESSS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_NATURES_POSTES_FAIL });
  }
};

export const fetchTypeStructures = () => async (dispatch) => {
  dispatch({ type: FETCH_TYPES_STRUCTURE });
  try {
    const response = await api.get("/typeStructures");
    dispatch({
      type: FETCH_TYPES_STRUCTURE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // gerer les erreurs
  }
};

export const fetchNatureStructures = () => async (dispatch) => {
  dispatch({ type: FETCH_NATURES_STRUCTURE });
  try {
    const response = await api.get("/natureStructures");
    dispatch({
      type: FETCH_NATURES_STRUCTURE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // gerer les erreurs
  }
};

export const fetchStructureByType = (idType) => async (dispatch) => {
  dispatch({ type: FETCH_STRUCTURES });
  try {
    const response = await api.get(`/typeStructures/${idType}`);
    dispatch({
      type: FETCH_STRUCTURES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_STRUCTURES_FAIL });
  }
};

export const fetchStructureByNature = (idNature) => async (dispatch) => {
  dispatch({ type: FETCH_STRUCTURES_BY_NATURE });
  try {
    const response = await api.get(`/natureStructures/${idNature}`);
    dispatch({
      type: FETCH_STRUCTURES_BY_NATURE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_STRUCTURES_BY_NATURE_FAIL });
  }
};

export const fetchPosteByNature = (nature) => async (dispatch) => {
  dispatch({ type: FETCH_POSTES_BY_NATURE_POSTE });
  try {
    const response = await api.get(`/postes/nature/${nature}`);
    dispatch({
      type: FETCH_POSTES_BY_NATURE_POSTE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_POSTES_BY_NATURE_POSTE_FAIL });
  }
};

export const createStructure = (structure) => {
  return api.post("/structures", structure);
};
