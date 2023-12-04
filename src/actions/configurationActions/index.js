import api from "../../api";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIE,
  UPDATE_CATEGORIE_FAIL,
  UPDATE_CATEGORIE_SUCCESS,
} from "./type";

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORIES });
    const categories = await api.get("/categories");
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories.data });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAIL });
  }
};

export const updateCategorie = ({ idCategorie, ageRetraite }) => async (
  dispatch
) => {
  dispatch({ type: UPDATE_CATEGORIE });
  try {
    const response = await api.put("/categories", { idCategorie, ageRetraite });
    await api.put("/personnels/retraite", { idCategorie, ageRetraite });
    dispatch({ type: UPDATE_CATEGORIE_SUCCESS, payload: response.data[1] });
  } catch (error) {
    dispatch({ type: UPDATE_CATEGORIE_FAIL });
  }
};

export const createCategorie = () => async (dispatch) => {
  try {
  } catch (error) {}
};

export const deleteCategorie = () => async (dispatch) => {
  try {
  } catch (error) {}
};
