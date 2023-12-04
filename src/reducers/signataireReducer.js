import { FETCH_SIGNATAIRES } from "../actions/signataireActions/types";

const INITIAL_STATE = {
  signataires: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SIGNATAIRES:
      return {
        ...state,
        signataires: action.payload,
      };

    default:
      return state;
  }
}
