import api from "../../api";
import { API_FIRST_CALL_SUCCESS } from "../types";

export const startApiSuccess = () => (dispatch) => {
  dispatch({ type: API_FIRST_CALL_SUCCESS, payload: false });
};
