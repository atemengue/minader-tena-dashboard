import {
  CHECK_CURRENT_USER,
  CHECK_CURRENT_USER_FAIL,
  CHECK_CURRENT_USER_SUCCESS,
  CLEAN_USER_INPUT,
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
} from "../actions/userActions/types";

const INITIAL_STATE = {
  isSigned: false,
  isLoadingUpdate: false,
  error: null,
  profile: {
    idUser: "",
    noms: "",
    prenoms: "",
    email: "",
    motDePasse: null,
    confirmMotDePasse: null,
    ancienMotDePasse: "",
    roles: [],
  },
  userPhoto: {
    userPhotoData: null, // UPLOAD FILE IMAGE
    photoUrl: null,
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_CURRENT_USER:
      return { ...state };
    case CHECK_CURRENT_USER_SUCCESS:
      return { ...state, profile: action.payload, isSigned: true, error: null };
    case CHECK_CURRENT_USER_FAIL:
      return { ...state, isSigned: false, error: action.payload.response.data };
    case DISPLAY_USER_NAME:
      return {
        ...state,
        profile: { ...state.profile, noms: action.payload },
      };
    case DISPLAY_USER_SURNAME: {
      return {
        ...state,
        profile: { ...state.profile, prenoms: action.payload },
      };
    }
    case DISPLAY_USER_PASSWORD:
      return {
        ...state,
        profile: { ...state.profile, motDePasse: action.payload },
      };

    case DISPLAY_USER_PASSWORD_CONFIRM:
      return {
        ...state,
        profile: { ...state.profile, confirmMotDePasse: action.payload },
      };

    case DISPLAY_USER_OLD_PASSWORD:
      return {
        ...state,
        profile: { ...state.profile, ancienMotDePasse: action.payload },
      };
    case DISPLAY_USER_PICTURE:
      return {
        ...state,
        userPhoto: {
          ...state.userPhoto,
          photoUrl: action.payload,
        },
      };
    case RESET_USER_PHOTO:
      return {
        ...state,
        userPhoto: {
          ...state.userPhoto,
          photoUrl: null,
          userPhotoData: null,
        },
      };
    case DISPLAY_USER_PICTURE_DATA:
      return {
        ...state,
        userPhoto: {
          ...state.userPhoto,
          userPhotoData: action.payload,
        },
      };
    case CLEAN_USER_INPUT:
      return {
        ...state,
        profile: {
          ...state.profile,
          confirmMotDePasse: "",
          motDePasse: "",
          ancienMotDePasse: "",
        },
        userPhoto: {
          ...state.userPhoto,
          photoUrl: null,
          userPhotoData: null,
        },
      };
    case UPDATE_USER_PROFIL:
      return {
        ...state,
        isLoadingUpdate: true,
      };
    case UPDATE_USER_PROFIL_SUCCESS:
      return {
        ...state,
        isLoadingUpdate: false,
        profile: {
          ...state.profile,
          motDePasse: "",
          confirmMotDePasse: "",
        },
      };
    case UPDATE_USER_PROFIL_FAIL:
      return {
        ...state,
        isLoadingUpdate: false,
      };
    default:
      return state;
  }
}
