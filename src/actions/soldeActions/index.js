import api from "../../api";
import {
  ERROR_CLOSE,
  FETCH_SOCLE_SUCCESS,
  FETCH_SOLDES,
  FETCH_SOLDES_NUMBER,
  FETCH_SOLDES_PERSONNELS,
  FETCH_SOLDES_PERSONNELS_SUCCESS,
  SET_ERROR,
  UPDATE_MATRICULES,
  UPDATE_MATRICULES_FAIL,
  UPDATE_MATRICULES_SUCCESS,
} from "../types";

export const fetchStatusSolde = () => async (dispatch) => {
  dispatch({ type: FETCH_SOLDES });
  try {
    const response = await api.get("/personnels/statusSolde");
    dispatch({ type: FETCH_SOLDES_NUMBER, payload: response.data });
  } catch (error) {
    new Error(`erreur sur la requete${error}`);
  }
};

export const fetchSoldePersonnels = (statut) => async (dispatch) => {
  dispatch({ type: FETCH_SOLDES_PERSONNELS });
  try {
    const response = await api.get(`/personnels/solde/${statut}`);
    dispatch({
      type: FETCH_SOLDES_PERSONNELS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR });
  }
};

export const updateMatricules = (listMatricules) => async (dispatch) => {
  dispatch({ type: UPDATE_MATRICULES });
  dispatch({ type: ERROR_CLOSE });
  let response = null;
  try {
    response = await api.put(`/personnels/solde/update`, listMatricules);
    dispatch({
      type: UPDATE_MATRICULES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.response || error });
    dispatch({ type: UPDATE_MATRICULES_FAIL });
    return error.response.data;
  }
  return response.data;
};

export const fetchSocle = () => async (dispatch) => {
  try {
    const response = await api.get("/solde/socle");
    dispatch({
      type: FETCH_SOCLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    new Error(`erreur sur la requete${error}`);
  }
};
