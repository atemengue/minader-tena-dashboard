import api from "../../api";
import { ERROR_CLOSE, SET_ERROR } from "../types";
import {
  CREATE_DOMAINE_ETUDE,
  DELETE_DOMAINE_ETUDE,
  FETCH_DOMAINES_ETUDES,
} from "./types";

export const fetchDomaineEtude = (_) => async (dispatch) => {
  try {
    const response = await api.get("/domaineEtude");
    dispatch({ type: FETCH_DOMAINES_ETUDES, payload: response.data });
  } catch (error) {
    throw error;
  }
};

export const fetchDomaineDetails = (id) => {
  const response = api.get(`/domaineEtude/${id}`);
  return response;
};

export const createDomaineEtude = (data) => async (dispatch) => {
  dispatch({ type: ERROR_CLOSE });
  let response = null;
  try {
    response = await api.post("/domaineEtude", data);
    dispatch({ type: CREATE_DOMAINE_ETUDE, payload: response.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.response || error });
    return error.response.data;
  }
  return response.data;
};

export const createOptionEtude = (data) => {
  const response = api.post("/optionEtude", data);
  return response;
};

export const deleteDomaine = (idDomaineEtude) => async (dispatch) => {
  dispatch({ type: ERROR_CLOSE });
  let response = null;
  try {
    response = await api.delete("/domaineEtude", {
      data: { idDomaineEtude },
    });
    dispatch({ type: DELETE_DOMAINE_ETUDE, payload: response.data });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.response || error });
    return error.response.data;
  }
  return response.data;
};

export const deleteOptionEtude = (idOptionEtude) => {
  const response = api.delete("/optionEtude", {
    data: { idOptionEtude },
  });
  return response;
};
