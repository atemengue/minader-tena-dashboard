import api from "../../api";
import { disconnectSocket } from "../../realTimeCommunication/socketConnection";
import {
  CHECK_TOKEN,
  CHECK_TOKEN_FAIL,
  CHECK_TOKEN_SUCCESS,
  EMAIL_CHANGED,
  EMAIL_LOGIN,
  EMAIL_LOGIN_FAIL,
  EMAIL_LOGIN_SUCCESS,
  LOG_OUT,
  PASSWORD_CHANGED,
} from "../types";
import { CHECK_CURRENT_USER_SUCCESS } from "../userActions/types";

export const emailChanged = (email) => ({
  type: EMAIL_CHANGED,
  payload: email,
});

export const passwordChanged = (password) => ({
  type: PASSWORD_CHANGED,
  payload: password,
});

export const login = (data) => async (dispatch) => {
  dispatch({ type: EMAIL_LOGIN });
  try {
    const response = await api.post("/users/login", data);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("roles", response.data.roles);
    localStorage.setItem(
      "userDetails",
      JSON.stringify({
        token: response.data.token,
      })
    );

    dispatch({ type: EMAIL_LOGIN_SUCCESS, payload: response.data.token });
    dispatch({ type: CHECK_CURRENT_USER_SUCCESS, payload: response.data.user });
  } catch (err) {
    dispatch({ type: EMAIL_LOGIN_FAIL, payload: err.response.data.err });
  }
};

export const checkToken = () => async (dispatch) => {
  dispatch({ type: CHECK_TOKEN });
  try {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: CHECK_TOKEN_SUCCESS, payload: token });
    } else {
      dispatch({ type: CHECK_TOKEN_FAIL });
    }
  } catch (error) {
    dispatch({ type: CHECK_TOKEN_FAIL });
  }
};

export const logout = () => (dispatch) => {
  let idUser = JSON.parse(localStorage.getItem("userDetails"))?.idUser;
  disconnectSocket(idUser);
  localStorage.removeItem("token");
  localStorage.removeItem("scopes");
  localStorage.removeItem("roles");
  localStorage.removeItem("userDetails");
  dispatch({ type: LOG_OUT });
};
