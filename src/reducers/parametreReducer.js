import {
  CLEAR_INPUT_ADD_NEW_USER,
  CREATE_NEW_USER,
  CREATE_NEW_USER_SUCCESS,
  DELETE_USER,
  DISPLAY_NEW_USER_EMAIL,
  DISPLAY_NEW_USER_NAME,
  DISPLAY_NEW_USER_OLD_PASSWORD,
  DISPLAY_NEW_USER_PASSWORD,
  DISPLAY_NEW_USER_PASSWORD_CONFIRM,
  DISPLAY_NEW_USER_PICTURE,
  DISPLAY_NEW_USER_PICTURE_DATA,
  DISPLAY_NEW_USER_ROLE,
  DISPLAY_NEW_USER_SURNAME,
  FETCH_ROLES_SUCCESS,
  FETCH_USER,
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  RESET_NEW_USER_PHOTO,
} from "../actions/parametreActions/types";

const INITIAL_STATE = {
  user: null,
  userPhoto: {
    userPhotoData: "", // UPLOAD FILE IMAGE
    photoUrl: "",
  },
  isLoadingCreate: false,
  isLoading: false,
  users: [],
  roles: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DISPLAY_NEW_USER_NAME:
      return { ...state, user: { ...state.user, noms: action.payload } };
    case DISPLAY_NEW_USER_SURNAME: {
      return {
        ...state,
        user: { ...state.user, prenoms: action.payload },
      };
    }
    case DISPLAY_NEW_USER_PASSWORD:
      return {
        ...state,
        user: { ...state.user, motDePasse: action.payload },
      };
    case DISPLAY_NEW_USER_EMAIL:
      return {
        ...state,
        user: { ...state.user, email: action.payload },
      };
    case DISPLAY_NEW_USER_PASSWORD_CONFIRM:
      return {
        ...state,
        user: { ...state.user, confirmMotDePasse: action.payload },
      };

    case DISPLAY_NEW_USER_OLD_PASSWORD:
      return {
        ...state,
        user: { ...state.user, ancienMotDePasse: action.payload },
      };
    case DISPLAY_NEW_USER_PICTURE:
      return {
        ...state,
        userPhoto: {
          ...state.userPhoto,
          photoUrl: action.payload,
        },
      };
    case RESET_NEW_USER_PHOTO:
      return {
        ...state,
        userPhoto: {
          ...state.userPhoto,
          photoUrl: null,
          userPhotoData: null,
        },
      };
    case DISPLAY_NEW_USER_PICTURE_DATA:
      return {
        ...state,
        userPhoto: {
          ...state.userPhoto,
          userPhotoData: action.payload,
        },
      };
    case DISPLAY_NEW_USER_ROLE:
      return {
        ...state,
        user: {
          ...state.user,
          roleIdRole: action.payload,
        },
      };
    case CLEAR_INPUT_ADD_NEW_USER:
      return {
        ...state,
        user: INITIAL_STATE.user,
        userPhoto: INITIAL_STATE.userPhoto,
      };

    case CREATE_NEW_USER:
      return {
        ...state,
        isLoadingCreate: true,
      };
    case CREATE_NEW_USER_SUCCESS: {
      return {
        ...state,
        isLoadingCreate: false,
        users: [action.payload, ...state.users],
        user: INITIAL_STATE.user,
        userPhoto: INITIAL_STATE.userPhoto,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        users: [
          ...state.users.filter((user) => user.idUser !== action.payload),
        ],
      };
    }
    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
