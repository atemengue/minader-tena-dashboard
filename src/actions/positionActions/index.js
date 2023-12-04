import api from "../../api";
import {
  FETCH_POSITIONS,
  FETCH_POSITIONS_FAIL,
  FETCH_POSITIONS_NUMBER,
  FETCH_POSITIONS_PERSONNELS,
  FETCH_POSITIONS_PERSONNELS_FAIL,
  FETCH_POSITIONS_PERSONNELS_SUCCESS,
  FETCH_POSITIONS_SUCCESS,
} from "../types";

export const fetchPositions = () => async (dispatch) => {
  dispatch({ type: FETCH_POSITIONS });
  try {
    const response = await api.get("/positions");
    dispatch({ type: FETCH_POSITIONS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_POSITIONS_FAIL });
  }
};

export const fetchStatusPostion = () => async (dispatch) => {
  dispatch({ type: FETCH_POSITIONS });
  try {
    const response = await api.get("/personnels/statusposition");
    dispatch({ type: FETCH_POSITIONS_NUMBER, payload: response.data });
  } catch (error) {
    new Error(`erreur sur la requete${error}`);
  }
};

export const fetchPositionsPersonnels = (position) => async (dispatch) => {
  dispatch({ type: FETCH_POSITIONS_PERSONNELS });
  try {
    const response = await api.get(`/personnelsposition/${position}`);
    dispatch({
      type: FETCH_POSITIONS_PERSONNELS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_POSITIONS_PERSONNELS_FAIL });
  }
};
