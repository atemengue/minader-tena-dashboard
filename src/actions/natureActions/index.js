import api from "../../api";
import {
  FETCH_ACTE,
  FETCH_ACTES,
  FETCH_ACTES_SUCCESS,
  FETCH_ACTE_SUCCESS,
  FETCH_NATURES_ACTES,
} from "../types";

export const fetchNatureActes = () => async (dispatch) => {
  try {
    const natures = await api.get("/natureActes");
    dispatch({ type: FETCH_NATURES_ACTES, payload: natures.data });
  } catch (error) {
    throw Error({ error });
  }
};

export const fetchActes = () => async (dispatch) => {
  dispatch({ type: FETCH_ACTES });
  try {
    const actes = await api.get("/actes");
    dispatch({ type: FETCH_ACTES_SUCCESS, payload: actes.data });
  } catch (error) {
    throw Error({ error });
  }
};

export const fetchActesReactQuery = () => api.get("/actes");

export const fetchActe = (idActe) => async (dispatch) => {
  dispatch({ type: FETCH_ACTE });
  try {
    const acte = await api.get(`/actes/${idActe}`);
    dispatch({ type: FETCH_ACTE_SUCCESS, payload: acte.data });
  } catch (error) {
    throw Error({ error });
  }
};
