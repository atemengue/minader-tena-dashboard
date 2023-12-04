import api from "../../api";
import {
  DISPLAY_GRADE,
  FETCH_GRADES,
  FETCH_GRADES_FAIL,
  FETCH_GRADES_SUCCESS,
} from "./types";

export const fetchGrades = (_) => async (dispatch) => {
  dispatch({ type: FETCH_GRADES });
  try {
    const response = await api.get("/grades");
    dispatch({ type: FETCH_GRADES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_GRADES_FAIL });
  }
};

export const displayGrade = (value) => ({
  type: DISPLAY_GRADE,
  payload: value,
});
