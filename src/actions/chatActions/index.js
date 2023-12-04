import { NEW_USER_ONLINE, REMOVE_ONLINE_USER, SET_ONLINE_USERS } from "./types";

export const setOnlineUsers = (newUser) => {
  return { type: SET_ONLINE_USERS, payload: newUser };
};

export const setNewOnlineUser = (newUser) => {
  return { type: NEW_USER_ONLINE, payload: newUser };
};

export const removeOnlineUser = (idUser) => {
  return { type: REMOVE_ONLINE_USER, payload: idUser };
};
