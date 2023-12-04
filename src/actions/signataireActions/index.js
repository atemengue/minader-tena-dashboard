import api from "../../api";
import { FETCH_SIGNATAIRES } from "./types";

export const fetchSignataires = () => async (dispatch) => {
  try {
    const signataires = await api.get("/signataires");
    dispatch({ type: FETCH_SIGNATAIRES, payload: signataires.data });
  } catch (error) {
    throw Error({ error });
  }
};
