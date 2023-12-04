import {
  ALERT_CLOSE_MESSAGE,
  ALERT_OPEN_MESSAGE,
} from "../actions/alertActions/types";

const initState = {
  showAlertMessage: false,
  alertMessageContent: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ALERT_OPEN_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.payload,
      };
    case ALERT_CLOSE_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };
    default:
      return state;
  }
};

export default reducer;
