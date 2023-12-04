import { ALERT_CLOSE_MESSAGE, ALERT_OPEN_MESSAGE } from "./types";

export const openAlertMessage = (message) => {
  return {
    type: ALERT_OPEN_MESSAGE,
    payload: message,
  };
};

export const closeAlertMessage = () => {
  return {
    type: ALERT_CLOSE_MESSAGE,
  };
};
