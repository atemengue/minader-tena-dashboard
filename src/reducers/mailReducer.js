import { mailActions } from "../actions/mailActions";

const initState = {
  mails: [],
  pendingMail: [],
  onLineUsers: [],
};

const reducer = (state = initState, action) => {
  {
    switch (action.type) {
      case mailActions.SET_PENDIND_MAILS:
        return {
          ...state,
          pendingMail: action.payload,
        };
      case mailActions.SET_MAILS:
        return {
          ...state,
          mails: action.payload,
        };
      case mailActions.SET_ONLINE_USERS:
        return {
          ...state,
          onLineUsers: action.payload,
        };
      default:
        return state;
    }
  }
};

export default reducer;
