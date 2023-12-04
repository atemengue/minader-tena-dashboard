import api from "../../api";
import {
  ALL_IN_ONE_POSTE,
  DELETE_POSTES,
  DELETE_POSTES_FAIL,
  DELETE_POSTES_SUCCESS,
  FETCH_POSTE,
  FETCH_POSTES,
  FETCH_POSTES_BY_RANG,
  FETCH_POSTES_BY_RANG_FAIL,
  FETCH_POSTES_BY_RANG_SUCCESS,
  FETCH_POSTES_FAIL,
  FETCH_POSTES_SUCCESS,
  FETCH_POSTE_FAIL,
  FETCH_POSTE_SUCCESS,
  FETCH_RANGS_POSTES,
  FETCH_RANGS_POSTES_FAIL,
  FETCH_RANGS_POSTES_SUCCESS,
  UPDATE_POSTES,
  UPDATE_POSTES_FAIL,
  UPDATE_POSTES_SUCCESS,
  UPDATE_POSTE_INFORMATIONS_SUCCESS,
} from "../types";

export const updatePostes = (postes) => async (dispatch) => {
  dispatch({ type: UPDATE_POSTES });
  try {
    const response = await api.put(`/postes/updateMany`, postes);
    dispatch({
      type: UPDATE_POSTES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_POSTES_FAIL });
  }
};

export const fetchRangPostes = () => async (dispatch) => {
  dispatch({ type: FETCH_RANGS_POSTES });
  try {
    const response = await api.get("/rangPoste");
    dispatch({
      type: FETCH_RANGS_POSTES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_RANGS_POSTES_FAIL });
  }
};

export const fetchPosteByRang = (rang) => async (dispatch) => {
  dispatch({ type: FETCH_POSTES_BY_RANG });
  try {
    const response = await api.get(`/postes/rang/${rang}`);
    dispatch({
      type: FETCH_POSTES_BY_RANG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_POSTES_BY_RANG_FAIL });
  }
};

// export const fetchAllInOnePoste = (type = false, value) => async (dispatch) => {
//   dispatch({ type: ALL_IN_ONE_POSTE});
//   try {
//     if (type)
//   } catch (error) {

//   }

// }

export const fetchPostes = () => async (dispatch) => {
  dispatch({ type: FETCH_POSTES });
  try {
    const response = await api.get("/postes");
    dispatch({
      type: FETCH_POSTES_SUCCESS,
      payload: response.data.postes,
    });
  } catch (error) {
    dispatch({ type: FETCH_POSTES_FAIL });
  }
};

export const fetchPoste = (idPoste) => async (dispatch) => {
  dispatch({ type: FETCH_POSTE });
  try {
    const response = await api.get(`/postes/${idPoste}`);
    dispatch({
      type: FETCH_POSTE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_POSTE_FAIL });
  }
};

export const deletePostes = (postes) => async (dispatch) => {
  dispatch({ type: DELETE_POSTES });
  try {
    await api.delete("/postes", {
      data: { postesId: postes },
    });
    dispatch({ type: DELETE_POSTES_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_POSTES_FAIL });
  }
};

export const updatePosteInformation = (idPoste, data) => async (dispatch) => {
  try {
    const response = await api.put(`/postes/${idPoste}`, data);
    dispatch({
      type: UPDATE_POSTE_INFORMATIONS_SUCCESS,
    });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};
