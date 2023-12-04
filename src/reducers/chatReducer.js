import {
  SET_ONLINE_USERS,
  NEW_USER_ONLINE,
  REMOVE_ONLINE_USER,
} from "../actions/chatActions/types";

const initState = {
  onLineUsers: [],
  chatUsers: [],
};

const reducer = (state = initState, action) => {
  const inOnline = state.chatUsers.find((user) =>
    user.idUser === action.payload?.idUser ? true : false
  );

  {
    switch (action.type) {
      case SET_ONLINE_USERS:
        return {
          ...state,
          onLineUsers: [...state.onLineUsers, action.payload],
        };
      case NEW_USER_ONLINE:
        return {
          ...state,
          chatUsers: !inOnline
            ? [...state.chatUsers, action.payload]
            : state.chatUsers,
        };
      case REMOVE_ONLINE_USER:
        return {
          ...state,
          chatUsers: state.chatUsers.filter(
            (user) => user.idUser !== action.payload
          ),
        };
      default:
        return state;
    }
  }
};

export default reducer;
