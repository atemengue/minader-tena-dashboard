import api from "../../api";
import {
  GET_CLASSIFICATION,
  GET_CLASSIFICATION_FAIL,
  GET_CLASSIFICATION_SUCCESS,
} from "../types";

export const getClassification = () => async (dispatch) => {
  dispatch({ type: GET_CLASSIFICATION });
  try {
    const response = await api.get("/statistiques/classification");
    dispatch({
      type: GET_CLASSIFICATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GET_CLASSIFICATION_FAIL });
  }
};
