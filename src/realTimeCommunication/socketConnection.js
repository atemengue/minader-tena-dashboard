import io from "socket.io-client";
import {
  removeOnlineUser,
  setNewOnlineUser,
  setOnlineUsers,
} from "../actions/chatActions";
import { SERVER_URL } from "../config";
import store from "../store";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  if (userDetails) {
    socket = io(`${SERVER_URL}`, {
      auth: {
        token: userDetails.token,
      },
    });

    // socket connection
    socket.on("connect", () => {
      // console.log("successuf connected with socket.io server");
      // console.log(socket.id);
    });

    // // socket online-users
    // socket.on("online-users", (data) => {
    //   const { onlineUsers } = data;
    //   store.dispatch(setOnlineUsers(onlineUsers));
    // });

    // socket online-users
    socket.on("online-new-user", (data) => {
      const { newUser } = data;
      store.dispatch(setNewOnlineUser(newUser));
    });

    socket.on("remove-user", (data) => {
      const { idUser } = data;
      store.dispatch(removeOnlineUser(idUser));
    });
  }
};

export const disconnectSocket = (idUser) => {
  socket.emit("logout", idUser);
};
