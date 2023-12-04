import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_FAIL,
  FETCH_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIE,
  UPDATE_CATEGORIE_FAIL,
  UPDATE_CATEGORIE_SUCCESS,
} from "../actions/configurationActions/type";

const INITIAL_STATE = {
  isLoading: false,
  categories: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload,
      };
    case FETCH_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_CATEGORIE:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_CATEGORIE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: state.categories.forEach((categorie, index) => {
          if (categorie.idCategorie === action.payload.idCategorie) {
            state.categories[index].ageRetraite = action.payload.ageRetraite;
          }
        }),
      };
    case UPDATE_CATEGORIE_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
