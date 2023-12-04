import axios from "axios";
import api from "../../api";
import http from "../../api/http";
import { SET_ERROR } from "../types";
import {
  CHANGE_DASHBOARD_ACTIF,
  CLEAR_INPUT_ALL_SPET,
  CLEAR_INPUT_SPET_FOUR,
  CLEAR_INPUT_SPET_ONE,
  CLEAR_INPUT_SPET_THREE,
  CLEAR_INPUT_SPET_TWO,
  CREATE_PERSONNEL,
  CREATE_PERSONNEL_FAIL,
  CREATE_PERSONNEL_SUCCESS,
  DELETE_MOUVEMENT,
  DELETE_PERSONNEL,
  DELETE_PERSONNEL_FILE,
  DISPLAY_DATE_OBTENTION_DIPLOME_MAX,
  DISPLAY_DIPLOME_MAX,
  DISPLAY_DOMAINE_DIPLOME_MAX,
  DISPLAY_LIEU_DELIVRANCE,
  DISPLAY_NIVEAU_INSTRUCTION,
  DISPLAY_OPTION_DIPLOME_MAX,
  DISPLAY_PERSONNEL_ACTE_NUMBER,
  DISPLAY_PERSONNEL_ARRONDISSEMENT,
  DISPLAY_PERSONNEL_CHILDREN_NUMBER,
  DISPLAY_PERSONNEL_CLASSE,
  DISPLAY_PERSONNEL_DATE_CNI,
  DISPLAY_PERSONNEL_DATE_ENTREE_AU_MINISTERE,
  DISPLAY_PERSONNEL_DATE_NAISSANCE,
  DISPLAY_PERSONNEL_DATE_PRISE_EFFECTIVE,
  DISPLAY_PERSONNEL_DATE_RECRUTEMENT,
  DISPLAY_PERSONNEL_DEPARTEMENT,
  DISPLAY_PERSONNEL_ECHELON,
  DISPLAY_PERSONNEL_EMAIL,
  DISPLAY_PERSONNEL_GRADE_ACTUEL,
  DISPLAY_PERSONNEL_GRADE_RECRUTEMENT,
  DISPLAY_PERSONNEL_ID_STRUCTURE,
  DISPLAY_PERSONNEL_INDICE,
  DISPLAY_PERSONNEL_LADY_NAME,
  DISPLAY_PERSONNEL_LIEU_NAISSANCE,
  DISPLAY_PERSONNEL_MATRICULE,
  DISPLAY_PERSONNEL_NAME,
  DISPLAY_PERSONNEL_NATURE_RECRUTEMENT,
  DISPLAY_PERSONNEL_NUMERO_CNI,
  DISPLAY_PERSONNEL_PHONES,
  DISPLAY_PERSONNEL_PICTURE,
  DISPLAY_PERSONNEL_PICTURE_DATA,
  DISPLAY_PERSONNEL_POSITION_ADMINISTRATIVE,
  DISPLAY_PERSONNEL_REGIME_MATRIMONIAL,
  DISPLAY_PERSONNEL_REGION,
  DISPLAY_PERSONNEL_SEXE,
  DISPLAY_PERSONNEL_STATUT_MATRIMONIAL,
  DISPLAY_PERSONNEL_SUBNAME,
  DISPLAY_STATUS_ADMINISTRATIF,
  FETCH_ARCHIVES_PERSONNEL,
  FETCH_PERSONNEL,
  FETCH_PERSONNELS,
  FETCH_PERSONNELS_25000_JEUNES_FAIL,
  FETCH_PERSONNELS_25000_JEUNES_SUCCESS,
  FETCH_PERSONNELS_FAIL,
  FETCH_PERSONNELS_STATUS_ADMIN,
  FETCH_PERSONNELS_STATUS_ADMIN_FAIL,
  FETCH_PERSONNELS_STATUS_ADMIN_SUCCESS,
  FETCH_PERSONNELS_SUCCESS,
  FETCH_PERSONNEL_FAIL,
  FETCH_PERSONNEL_SUCCESS,
  RESET_PHOTO_PROFILE,
  UPDATE_PERSONNEL_INFORMATIONS_SUCCESS,
  UPDATE_PERSONNEL_MOUVEMENT,
  UPDATE_PERSONNEL_MOUVEMENT_FAIL,
  UPDATE_PERSONNEL_MOUVEMENT_SUCCESS,
  UPDATE_POSITION_RETRAITE_SUCCESS,
} from "./types";

export const changeDashboardActifplayEmail = (number) => ({
  type: CHANGE_DASHBOARD_ACTIF,
  payload: number,
});

export const fetchPersonnels = (status) => async (dispatch) => {
  dispatch({ type: FETCH_PERSONNELS });
  try {
    let response = null;
    switch (status) {
      case 0:
        response = await api.get("/personnels/actifs");
        break;
      case 1:
      case 2:
      case 3:
        response = await api.get(`/personnels/status/${status}`);
        break;
      case 4:
        response = await api.get(`/personnels/retraites`);
        break;
      case 5:
        response = await api.get(`/personnels`);
        break;
      default:
        response = await api.get("/personnels/actifs");
        break;
    }

    dispatch({ type: FETCH_PERSONNELS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PERSONNELS_FAIL });
  }
};

export const fetchPersonnel = (matricule) => async (dispatch) => {
  dispatch({ type: FETCH_PERSONNEL });
  try {
    const response = await api.get(`/personnels/${matricule}`);
    dispatch({ type: FETCH_PERSONNEL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PERSONNEL_FAIL });
  }
};

export const fetchPersonnelForArchive = (matricule) =>
  api.get(`/personnels/${matricule}`);

// export const fetchPersonnelNumber = () => async (dispatch) => {
//   try {
//     const response = await api("/personnels/statusdivision");
//     dispatch({ type: FETCH_PERSONNELS_NUMBER, payload: response.data });
//   } catch (error) {
//     new Error(`erreur sur la requete${error}`);
//   }
// };

export const fetchPersonnelNumber = async () =>
  await api("/personnels/statusdivision");

// export const fetchPersonnelsActifs = () => async (dispatch) => {
//   dispatch({ type: FETCH_PERSONNEL });
//   try {
//     const response = await api.get("/personnels/actifs");
//     dispatch({ type: FETCH_PERSONNELS_ACTIF_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: FETCH_PERSONNELS_ACTIF_FAIL, payload: error });
//   }
// };

export const fetchPersonnelsActifs = () => api.get("/personnels/actifs");

export const fetchPersonnel25000jeunes = () => async (dispatch) => {
  dispatch({ type: FETCH_PERSONNEL });

  try {
    const response = await api.get("/personnels/jeunes25000");
    dispatch({
      type: FETCH_PERSONNELS_25000_JEUNES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Revoir le code ici
    dispatch({ type: FETCH_PERSONNELS_25000_JEUNES_FAIL, payload: error });
  }
};

export const fetchPersonnelByStatusAdmin = (data) => async (dispatch) => {
  dispatch({ type: FETCH_PERSONNELS_STATUS_ADMIN });
  try {
    const response = await api.post("/personnels/statusAdmin", data);
    dispatch({
      type: FETCH_PERSONNELS_STATUS_ADMIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: FETCH_PERSONNELS_STATUS_ADMIN_FAIL, payload: error });
  }
};

export const updatePersonnelStructure =
  (idStructure, personnels, decision) => async (dispatch) => {
    dispatch({ type: UPDATE_PERSONNEL_MOUVEMENT });
    try {
      const response = await api.put("personnels/structure", {
        idStructure,
        personnels,
        decision,
      });
      dispatch({
        type: UPDATE_PERSONNEL_MOUVEMENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: UPDATE_PERSONNEL_MOUVEMENT_FAIL });
    }
  };

// faire une function pour le mouvement
export const mouvement_affectation = (data, acte) => async (dispatch) => {
  dispatch({ type: UPDATE_PERSONNEL_MOUVEMENT });
  try {
    const response = await api.put("personnels/structures", {
      data,
      acte,
    });
    dispatch({
      type: UPDATE_PERSONNEL_MOUVEMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_PERSONNEL_MOUVEMENT_FAIL });
  }
};

export const mouvement_postes = (data, acte) => async (dispatch) => {
  dispatch({ type: UPDATE_PERSONNEL_MOUVEMENT });
  try {
    const response = await api.patch("postes/personnels", {
      data,
      acte,
    });
    dispatch({
      type: UPDATE_PERSONNEL_MOUVEMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_PERSONNEL_MOUVEMENT_FAIL });
  }
};

export const displayPersonnelPicture = (event) => (dispatch) => {
  const file = event.target.files[0];
  // File Preview
  const reader = new FileReader();
  reader.onload = () => {
    dispatch({
      type: DISPLAY_PERSONNEL_PICTURE,
      payload: reader.result,
    });

    dispatch({
      type: DISPLAY_PERSONNEL_PICTURE_DATA,
      payload: file,
    });
  };
  reader.abort = () => {
    dispatch({
      type: DISPLAY_PERSONNEL_PICTURE,
      payload: "images/user.png",
    });
    dispatch({
      type: DISPLAY_PERSONNEL_PICTURE_DATA,
      payload: null,
    });
  };
  reader.onloadend = () => {
    if (file === undefined) {
      dispatch({
        type: DISPLAY_PERSONNEL_PICTURE,
        payload: "images/user.png",
      });
      dispatch({
        type: DISPLAY_PERSONNEL_PICTURE_DATA,
        payload: null,
      });
    }
  };
  reader.readAsDataURL(file);
};

export const resetPhoto = () => (dispatch) => {
  dispatch({ type: RESET_PHOTO_PROFILE });
};

export const displayName = (value) => ({
  type: DISPLAY_PERSONNEL_NAME,
  payload: value,
});

export const displaySubName = (value) => ({
  type: DISPLAY_PERSONNEL_SUBNAME,
  payload: value,
});

export const displayMatricule = (matricule) => ({
  type: DISPLAY_PERSONNEL_MATRICULE,
  payload: matricule,
});

export const displaySexe = (sexe) => ({
  type: DISPLAY_PERSONNEL_SEXE,
  payload: sexe,
});

export const displayLadyName = (ladyName) => ({
  type: DISPLAY_PERSONNEL_LADY_NAME,
  payload: ladyName,
});
export const displayPhone = (phone) => ({
  type: DISPLAY_PERSONNEL_PHONES,
  payload: phone,
});

export const displayEmail = (email) => ({
  type: DISPLAY_PERSONNEL_EMAIL,
  payload: email,
});

export const displayBirthPlace = (place) => ({
  type: DISPLAY_PERSONNEL_LIEU_NAISSANCE,
  payload: place,
});

export const displayBirthDate = (date) => ({
  type: DISPLAY_PERSONNEL_DATE_NAISSANCE,
  payload: date,
});

export const displayCNINumber = (number) => ({
  type: DISPLAY_PERSONNEL_NUMERO_CNI,
  payload: number,
});

export const displayCNIDate = (date) => ({
  type: DISPLAY_PERSONNEL_DATE_CNI,
  payload: date,
});

export const displayMarriedState = (value) => ({
  type: DISPLAY_PERSONNEL_STATUT_MATRIMONIAL,
  payload: value,
});

export const displayRegimeState = (value) => ({
  type: DISPLAY_PERSONNEL_REGIME_MATRIMONIAL,
  payload: value,
});

export const displayChildreNum = (value) => ({
  type: DISPLAY_PERSONNEL_CHILDREN_NUMBER,
  payload: value,
});

export const clearInputSpetOne = (_) => (dispatch) => {
  dispatch({ type: CLEAR_INPUT_SPET_ONE });
};

export const clearInputSpeTwo = (_) => (dispatch) => {
  dispatch({ type: CLEAR_INPUT_SPET_TWO });
};
export const clearInputSpeThree = (_) => (dispatch) => {
  dispatch({ type: CLEAR_INPUT_SPET_THREE });
};

export const clearInputSpeFour = (_) => (dispatch) => {
  dispatch({ type: CLEAR_INPUT_SPET_FOUR });
};

export const displayNatureRecrutement = (nature) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_NATURE_RECRUTEMENT, payload: nature });
};

export const displayActeNumber = (acteNumber) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_ACTE_NUMBER, payload: acteNumber });
};
export const displayActeDate = (date) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_DATE_RECRUTEMENT, payload: date });
};

export const displayGradeRecrutement = (grade) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_GRADE_RECRUTEMENT, payload: grade });
};

export const displayGradeActuel = (grade) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_GRADE_ACTUEL, payload: grade });
};

export const displayIndice = (indice) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_INDICE, payload: indice });
};

export const displayClasse = (classe) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_CLASSE, payload: classe });
};

export const displayEchelon = (echelon) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_ECHELON, payload: echelon });
};

export const displayRegion = (region) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_REGION, payload: region });
};

export const displayDepartement = (departement) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_DEPARTEMENT, payload: departement });
};

export const displayArrondissement = (value) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_ARRONDISSEMENT, payload: value });
};

export const displayDatePriseEffective = (date) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_DATE_PRISE_EFFECTIVE, payload: date });
};

export const displayDateEntrerMinistere = (date) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_DATE_ENTREE_AU_MINISTERE, payload: date });
};

export const displayPositionAdministrative = (position) => (dispatch) => {
  dispatch({
    type: DISPLAY_PERSONNEL_POSITION_ADMINISTRATIVE,
    payload: position,
  });
};

export const displayIdStructure = (id) => (dispatch) => {
  dispatch({ type: DISPLAY_PERSONNEL_ID_STRUCTURE, payload: id });
};

export const displayLieuDelivrance = (place) => (dispatch) => {
  dispatch({ type: DISPLAY_LIEU_DELIVRANCE, payload: place });
};
export const displayNiveauInstruction = (niveau) => (dispatch) => {
  dispatch({ type: DISPLAY_NIVEAU_INSTRUCTION, payload: niveau });
};

export const displayOptionDiplomeMax = (option) => (dispatch) => {
  dispatch({
    type: DISPLAY_OPTION_DIPLOME_MAX,
    payload: option,
  });
};

export const displayDomaineDiplomeMax = (domaine) => (dispatch) => {
  dispatch({
    type: DISPLAY_DOMAINE_DIPLOME_MAX,
    payload: domaine,
  });
};

export const displayDiplomeMaX = (diplome) => (dispatch) => {
  dispatch({ type: DISPLAY_DIPLOME_MAX, payload: diplome });
};

export const displayDateObtention = (date) => (dispatch) => {
  dispatch({ type: DISPLAY_DATE_OBTENTION_DIPLOME_MAX, payload: date });
};

export const createPersonnel = (data, photo) => async (dispatch) => {
  dispatch({ type: CREATE_PERSONNEL });
  const formData = new FormData();
  if (photo.photoUrl) {
    formData.append("file", photo.personnelPhotoData);
  }
  formData.append("data", JSON.stringify(data));
  try {
    const response = await http.post("/personnels", formData);
    const newPersonnel = await http.get(
      `/personnels/api/${response.data?.data.matricule}`
    );
    dispatch({ type: CREATE_PERSONNEL_SUCCESS, payload: newPersonnel.data });
    dispatch({ type: CLEAR_INPUT_ALL_SPET });
  } catch (error) {
    dispatch({ type: CREATE_PERSONNEL_FAIL, payload: error });
  }
};

// UPLOAD PARTS
export const uploadFiles = (data, fields) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://172.16.40.12:3001/api/personnels/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    //   console.log(response);
  } catch (error) {
    // console.log(error);
    throw new Error(`error: ${error}`);
  }
};

// DISPLAY STATUT ADMIN FOR VIEW GRADES CORPS
export const displayStatusAdmin = (status) => (dispatch) => {
  dispatch({ type: DISPLAY_STATUS_ADMINISTRATIF, payload: status });
};

export const fetchArchivesPersonnel = (idArchive) => async (dispatch) => {
  try {
    const response = await api.get("/personnels/archives", {
      params: {
        path: idArchive,
        parent: "public/archives/personnels", // oarametre dynamique
      },
    });
    dispatch({ type: FETCH_ARCHIVES_PERSONNEL, payload: response.data });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const updatePersonnelInformation =
  (matricule, data) => async (dispatch) => {
    try {
      const response = await api.patch(`/personnels/${matricule}`, data);
      dispatch({
        type: UPDATE_PERSONNEL_INFORMATIONS_SUCCESS,
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  };

export const deletePersonnel = (matricule) => async (dispatch) => {
  let response = null;
  try {
    response = await api.delete("/personnels", {
      data: { matricule },
    });
    dispatch({ type: DELETE_PERSONNEL, payload: matricule });
  } catch (error) {
    dispatch({ type: SET_ERROR, error: error.response || error });
    return error.response.data;
  }
  return response.data;
};

export const deletePersonnelDocument = (data) => async (dispatch) => {
  try {
    const response = await api.post("/personnels/removeFile", data);
    dispatch({
      type: DELETE_PERSONNEL_FILE,
      payload: response.data,
    });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

export const deleteMouvement = (idMouvement) => async (dispatch) => {
  try {
    const response = await api.delete("/personnels/mouvement", {
      data: { idMouvement },
    });
    dispatch({ type: DELETE_MOUVEMENT, payload: response.data.idMouvement });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
};

// UPDATE POSITION RETRAITE
export const updatePersonnelRetraite =
  (matricules, position) => async (dispatch) => {
    try {
      const response = await api.put("/personnels/pa/update", {
        matricules,
        position,
      });
      dispatch({
        type: UPDATE_POSITION_RETRAITE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  };

// UPDATE POSITION ONE BY ONE
export const updatePersonnelPosition = (personnels) => {
  const response = api.patch("/personnels/position", {
    data: personnels,
  });
  return response;
};

// update personnel photo de profil
export const updatePersonnelPhoto = async (data) => {
  const formData = new FormData();
  if (data.photoUrl) {
    formData.append("file", data.userPhotoData);
  }
  formData.append("matricule", data.matricule);
  const user = await http.patch("/personnels/photo", formData);
  return user;
};

// get Niveaux d'etudes
export const getNiveauxEtudes = async () => await api.get("/niveauEtudes");

export const updateFolderNumberArchive = ({ matricule, value }) =>
  api.put("/personnel/archives/folder/update", {
    matricule,
    value,
  });
