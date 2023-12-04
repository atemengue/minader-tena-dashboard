import api from "../../api";
import http from "../../api/http";
import {
  DISPLAY_NEW_USER_PICTURE,
  DISPLAY_NEW_USER_PICTURE_DATA,
  FETCH_ROLES_SUCCESS,
  FETCH_USERS_SUCCESS,
} from "./types";

export const displayUserPhoto = (event) => (dispatch) => {
  const file = event.target.files[0];
  // File Preview
  const reader = new FileReader();

  reader.onload = () => {
    dispatch({
      type: DISPLAY_NEW_USER_PICTURE,
      payload: reader.result,
    });

    dispatch({
      type: DISPLAY_NEW_USER_PICTURE_DATA,
      payload: file,
    });
  };
  reader.abort = () => {
    dispatch({
      type: DISPLAY_NEW_USER_PICTURE,
      payload: "images/user.png",
    });
    dispatch({
      type: DISPLAY_NEW_USER_PICTURE_DATA,
      payload: null,
    });
  };
  reader.onloadend = () => {
    if (file === undefined) {
      dispatch({
        type: DISPLAY_NEW_USER_PICTURE,
        payload: "images/user.png",
      });
      dispatch({
        type: DISPLAY_NEW_USER_PICTURE_DATA,
        payload: null,
      });
    }
  };
  reader.readAsDataURL(file);
};

export const createUser = async (data) => {
  const formData = new FormData();
  if (data.photoUrl) {
    formData.append("file", data.userPhotoData);
  }
  formData.append("noms", data.noms);
  formData.append("prenoms", data.prenoms);
  formData.append("email", data.email);
  formData.append("motDePasse", data.password);
  formData.append("roleIdRole", data.roleIdRole);
  const response = await http.post("/users", formData);
  const user = await http.get(`/users/${response.data.idUser}`);
  return user;
};

export const fetchRoles = () => async (dispatch) => {
  try {
    const roles = await api.get("/roles");
    dispatch({ type: FETCH_ROLES_SUCCESS, payload: roles.data });
  } catch (error) {
    throw Error({ error });
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const users = await api.get("/users");
    dispatch({ type: FETCH_USERS_SUCCESS, payload: users.data });
  } catch (error) {
    throw Error({ error });
  }
};

export const fetchUser = async (idUser) => await api.get(`/users/${idUser}`);

export const updateUserPhoto = async (data) => {
  const formData = new FormData();
  if (data.photoUrl) {
    formData.append("file", data.userPhotoData);
  }
  formData.append("idUser", data.idUser);
  const user = await http.patch("/users/photo", formData);
  return user;
};

export const updateUserProfil = async (data) => {
  const idUser = data.idUser;
  const response = await api.patch(`/users/${idUser}`, data);
  return response;
};

export const deleteUserProfil = async (idUser) => {
  const response = await api.delete("/users", {
    data: { idUser },
  });
  return response;
};
