import {
  CREATE_DOMAINE_ETUDE,
  DELETE_DOMAINE_ETUDE,
  FETCH_DOMAINES_ETUDES,
  FETCH_DOMAINE_ETUDE,
} from "../actions/domaineOptionActions/types";

const INITIAL_STATE = {
  domaineEtudes: [],
  domaineEtude: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOMAINES_ETUDES:
      return {
        ...state,
        domaineEtudes: action.payload,
      };
    case CREATE_DOMAINE_ETUDE:
      return {
        ...state,
        domaineEtudes: [action.payload.data, ...state.domaineEtudes],
      };
    case FETCH_DOMAINE_ETUDE:
      return {
        ...state,
        domaineEtude: action.payload.data,
      };

    case DELETE_DOMAINE_ETUDE: {
      return {
        domaineEtudes: [
          ...state.domaineEtudes.filter(
            (item) => item.idDomaineEtude !== action.payload.data
          ),
        ],
      };
    }

    default:
      return state;
  }
};
