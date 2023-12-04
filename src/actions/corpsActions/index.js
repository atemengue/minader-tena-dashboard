import api from "../../api";
import { FETCH_CORPS, FETCH_CORPS_FAIL, FETCH_CORPS_SUCCESS } from "./types";

export const fetchCorps = (_) => async (dispatch) => {
  dispatch({ type: FETCH_CORPS });
  try {
    const response = await api.get("/corps");
    dispatch({ type: FETCH_CORPS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CORPS_FAIL });
  }
};
