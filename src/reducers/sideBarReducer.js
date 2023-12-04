import { SET_NAV_HIDDEN, SET_NAV_SHOW } from "../actions/types";

const INITIAL_STATE = {
  sidebarShow: "responsive",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NAV_HIDDEN:
      return { ...state, sidebarShow: false };
    case SET_NAV_SHOW:
      return { ...state, sidebarShow: "responsive" };
    default:
      return state;
  }
};
