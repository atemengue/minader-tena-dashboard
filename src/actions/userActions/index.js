import api from "../../api";
import http from "../../api/http";
import {
  CHECK_CURRENT_USER,
  CHECK_CURRENT_USER_FAIL,
  CHECK_CURRENT_USER_SUCCESS,
  CLEAN_USER_INPUT,
  DISPLAY_USER_EMAIL,
  DISPLAY_USER_NAME,
  DISPLAY_USER_OLD_PASSWORD,
  DISPLAY_USER_PASSWORD,
  DISPLAY_USER_PASSWORD_CONFIRM,
  DISPLAY_USER_PICTURE,
  DISPLAY_USER_PICTURE_DATA,
  DISPLAY_USER_SURNAME,
  RESET_USER_PHOTO,
  UPDATE_USER_PROFIL,
  UPDATE_USER_PROFIL_FAIL,
  UPDATE_USER_PROFIL_SUCCESS,
} from "./types";

export const checkCurrentUser = (_) => async (dispatch) => {
  dispatch({ type: CHECK_CURRENT_USER });
  try {
    const response = await api.get("/users/me");
    localStorage.setItem("userDetails", JSON.stringify(response.data));

    dispatch({ type: CHECK_CURRENT_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CHECK_CURRENT_USER_FAIL, payload: error });
  }
};

export const displayUserName = (name) => ({
  type: DISPLAY_USER_NAME,
  payload: name,
});

export const displayUserSurName = (surname) => ({
  type: DISPLAY_USER_SURNAME,
  payload: surname,
});

export const displayUserEmail = (email) => ({
  type: DISPLAY_USER_EMAIL,
  payload: email,
});

export const displayUserPassword = (password) => ({
  type: DISPLAY_USER_PASSWORD,
  payload: password,
});

export const displayUserConfirmPass = (password) => ({
  type: DISPLAY_USER_PASSWORD_CONFIRM,
  payload: password,
});

export const displayUserOldPassword = (password) => ({
  type: DISPLAY_USER_OLD_PASSWORD,
  payload: password,
});

export const updateUserProfil = (user, photo) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFIL });
  const formData = new FormData();
  if (photo.photoUrl) {
    formData.append("file", photo.userPhotoData);
  }
  formData.append("noms", user.noms);
  formData.append("prenoms", user.prenoms);
  if (user.motDePasse && user.motDePasse !== "") {
    formData.append("motDePasse", user.motDePasse);
  }
  formData.append("confirmMotDePasse", user.confirmMotDePasse);
  formData.append("userIdArchive", user.userIdArchive);
  formData.append("idUser", user.idUser);

  try {
    await http.put("/users", formData);
    dispatch({ type: UPDATE_USER_PROFIL_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_USER_PROFIL_FAIL, payload: error });
  }
};

export const displayUserPhoto = (event) => (dispatch) => {
  const file = event.target.files[0];
  // File Preview
  const reader = new FileReader();

  reader.onload = () => {
    dispatch({
      type: DISPLAY_USER_PICTURE,
      payload: reader.result,
    });

    dispatch({
      type: DISPLAY_USER_PICTURE_DATA,
      payload: file,
    });
  };
  reader.abort = () => {
    dispatch({
      type: DISPLAY_USER_PICTURE,
      payload: "images/user.png",
    });
    dispatch({
      type: DISPLAY_USER_PICTURE_DATA,
      payload: null,
    });
  };
  reader.onloadend = () => {
    if (file === undefined) {
      dispatch({
        type: DISPLAY_USER_PICTURE,
        payload: "images/user.png",
      });
      dispatch({
        type: DISPLAY_USER_PICTURE_DATA,
        payload: null,
      });
    }
  };
  reader.readAsDataURL(file);
};

export const resetUserPhoto = () => (dispatch) => {
  dispatch({ type: RESET_USER_PHOTO });
};

export const clearPhoto = () => (dispatch) => {
  dispatch({ type: CLEAN_USER_INPUT });
};
