import api from "../../api";
import {
  FETCH_RETRAITES,
  FETCH_RETRAITES_FAIL,
  FETCH_RETRAITES_SUCCESS,
} from "../types";

export const fetchRetraites = (anneeRetraite, moinsRetraite) => async (
  dispatch
) => {
  dispatch({ type: FETCH_RETRAITES });
  try {
    const response = await api.post(`/retraites`, {
      anneeRetraite,
      moinsRetraite,
    });
    dispatch({ type: FETCH_RETRAITES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_RETRAITES_FAIL });
  }
};
