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
  FETCH_PERSONNELS,
  FETCH_PERSONNELS_25000_JEUNES_SUCCESS,
  FETCH_PERSONNELS_ACTIF_SUCCESS,
  FETCH_PERSONNELS_FAIL,
  FETCH_PERSONNELS_NUMBER,
  FETCH_PERSONNELS_STATUS_ADMIN_SUCCESS,
  FETCH_PERSONNELS_SUCCESS,
  FETCH_PERSONNEL_FAIL,
  FETCH_PERSONNEL_SUCCESS,
  RESET_PHOTO_PROFILE,
  UPDATE_PERSONNEL_INFORMATIONS_SUCCESS,
  UPDATE_PERSONNEL_MOUVEMENT,
  UPDATE_PERSONNEL_MOUVEMENT_FAIL,
  UPDATE_PERSONNEL_MOUVEMENT_SUCCESS,
} from "../actions/personnelActions/types";

const INITIAL_STATE = {
  personnels: [],
  archives: [],
  personnel: null,
  isLoading: false,
  isLoadingCreate: false,
  division: {
    total: "",
    actif: "",
    fonctionnaires: "",
    contractuels: "",
    decisionnaires: "",
    retraites: "",
  }, // number a modifier le nome
  statutNumber: null,
  personnelActifs: [],
  personnel25000Jeunes: [],
  personnelStatusAdmin: {
    data: [],
    total: "",
  },
  error: null,
  errorMouvement: null,
  isLoadingMouvement: false,
  newPersonnel: {
    noms: "",
    prenoms: "",
    matricule: "",
    telephones: "",
    nomJeuneFille: "",
    dateNaissance: "",
    lieuNaissance: "",
    arrondissementIdArrondissement: 0, // VIDE
    departementIdDepartement: 0, // VIDE  ICI
    regionIdRegion: 0, // VIDE ICI
    email: "",
    sexe: null,
    numeroCNI: null,
    dateCNI: null,
    statutMatrimonial: 1,
    regimeMatrimonial: 1,
    nbEnfant: 0,
    dateRecrutement: null,
    natureActeRecrutement: 0, // VOIR COTE CONCEPTION
    numeroActeRecrutement: null, // VOIR COTE CONCEPTION
    indice: null,
    echelon: null,
    classe: null,
    gradeIdGrade: 0, //gardeActuel
    gradeRecrutement: 0, // gradeRecrutement
    dateDePriseEffective: null,
    dateEntreeMinistere: null,
    structureIdStructure: 5000, // STRUCTURE D'ATTENTE D'AFFECTATION
    positionAdministrativeIdPositionAdministrative: 2,
    lieuDelivranceCNI: null,
    niveauInstruction: null,
    diplomeMax: null,
    dateObtentionDiplomeMax: null,
    domaineDiplomeMax: 0,
    optionDiplomeMax: 0,
  },
  newPersonnelPhoto: {
    personnelPhotoData: null, // UPLOAD FILE IMAGE
    photoUrl: null,
  },

  statusAdministratif: 1, // FONCTIONNAIRE CONTRACTUELS OU DECISIONNAIRE

  dashboardActifPersonnel: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_DASHBOARD_ACTIF:
      return {
        ...state,
        dashboardActifPersonnel: action.payload,
      };
    case FETCH_PERSONNELS_ACTIF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        personnelActifs: action.payload.data,
      };

    case FETCH_PERSONNELS_STATUS_ADMIN_SUCCESS:
      return {
        ...state,
        personnelStatusAdmin: {
          data: action.payload.data,
          total: action.payload.total,
        },
      };

    case FETCH_PERSONNEL_FAIL: {
      return { ...state, error: action.payload };
    }
    case FETCH_PERSONNELS:
      return { ...state, isLoading: true };
    case FETCH_PERSONNELS_SUCCESS: // all people
      return {
        ...state,
        isLoading: false,
        personnels: action.payload.data,
        statutNumber: action.payload.total,
      };
    case FETCH_PERSONNELS_25000_JEUNES_SUCCESS: // all people
      return {
        ...state,
        isLoading: false,
        personnel25000Jeunes: action.payload.data,
      };
    case FETCH_PERSONNELS_FAIL:
      return { ...state, isLoading: false };
    case FETCH_PERSONNELS_NUMBER: // number by status
      return { ...state, division: action.payload };
    case FETCH_PERSONNEL_SUCCESS: // one person
      return { ...state, isLoading: false, personnel: action.payload };
    case UPDATE_PERSONNEL_MOUVEMENT:
      return { ...state, isLoadingMouvement: true };
    case UPDATE_PERSONNEL_MOUVEMENT_SUCCESS:
      return { ...state, isLoadingMouvement: false, errorMouvement: false };
    case UPDATE_PERSONNEL_MOUVEMENT_FAIL:
      return { ...state, isLoadingMouvement: false, errorMouvement: true };
    case DISPLAY_PERSONNEL_PICTURE:
      return {
        ...state,
        newPersonnelPhoto: {
          ...state.newPersonnelPhoto,
          photoUrl: action.payload,
        },
      };
    case RESET_PHOTO_PROFILE:
      return {
        ...state,
        newPersonnelPhoto: {
          ...state.newPersonnelPhoto,
          photoUrl: null,
          personnelPhotoData: null,
        },
      };
    case DISPLAY_PERSONNEL_NAME:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          noms: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_SUBNAME:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          prenoms: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_MATRICULE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          matricule: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_SEXE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          sexe: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_LADY_NAME:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          nomJeuneFille: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_PHONES:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          telephones: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_EMAIL:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          email: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_DATE_NAISSANCE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          dateNaissance: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_LIEU_NAISSANCE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          lieuNaissance: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_NUMERO_CNI:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          numeroCNI: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_DATE_CNI:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          dateCNI: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_STATUT_MATRIMONIAL:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          statutMatrimonial: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_REGIME_MATRIMONIAL:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          regimeMatrimonial: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_CHILDREN_NUMBER:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          nbEnfant: action.payload,
        },
      };
    case CLEAR_INPUT_SPET_ONE: {
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          noms: "",
          prenoms: "",
          matricule: "",
          telephones: "",
          nomJeuneFille: "",
          email: "",
          sexe: null,
        },
        newPersonnelPhoto: {
          ...state.newPersonnelPhoto,
          photoUrl: null,
          personnelPhotoData: null,
        },
      };
    }
    case CLEAR_INPUT_SPET_TWO: {
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          dateNaissance: "",
          lieuNaissance: "",
          arrondissementIdArrondissement: 93,
          departementIdDepartement: 17,
          regionIdRegion: 4,
          numeroCNI: null,
          dateCNI: null,
          statutMatrimonial: 1,
          regimeMatrimonial: 1,
          nbEnfant: 0,
          lieuDelivranceCNI: null,
        },
      };
    }
    case CLEAR_INPUT_SPET_THREE: {
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          indice: null,
          echelon: null,
          classe: null,
          gradeIdGrade: 0, //gardeActuel
          gradeRecrutement: 0, // gradeRecrutement
          niveauInstruction: 1,
          diplomeMax: null,
          dateObtentionDiplomeMax: null,
          dateRecrutement: null,
          natureActeRecrutement: 1, // VOIR COTE CONCEPTION
          numeroActeRecrutement: null, // VOIR COTE CONCEPTION
        },
      };
    }

    case CLEAR_INPUT_ALL_SPET: {
      return {
        ...state,
        newPersonnel: INITIAL_STATE.newPersonnel,
      };
    }
    case CLEAR_INPUT_SPET_FOUR: {
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,

          structureIdStructure: 4,
          positionAdministrativeIdPositionAdministrative: 2,
          dateDePriseEffective: null,
        },
      };
    }
    case DISPLAY_PERSONNEL_DATE_RECRUTEMENT:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          dateRecrutement: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_NATURE_RECRUTEMENT:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          natureActeRecrutement: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_ACTE_NUMBER:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          numeroActeRecrutement: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_GRADE_RECRUTEMENT:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          gradeRecrutement: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_GRADE_ACTUEL:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          gradeIdGrade: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_INDICE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          indice: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_CLASSE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          classe: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_ECHELON:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          echelon: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_REGION:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          regionIdRegion: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_ARRONDISSEMENT:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          arrondissementIdArrondissement: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_DEPARTEMENT:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          departementIdDepartement: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_DATE_PRISE_EFFECTIVE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          dateDePriseEffective: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_DATE_ENTREE_AU_MINISTERE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          dateEntreeMinistere: action.payload,
        },
      };

    case DISPLAY_PERSONNEL_ID_STRUCTURE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          structureIdStructure: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_POSITION_ADMINISTRATIVE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          positionAdministrativeIdPositionAdministrative: action.payload,
        },
      };

    case DISPLAY_LIEU_DELIVRANCE:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          lieuDelivranceCNI: action.payload,
        },
      };

    case DISPLAY_NIVEAU_INSTRUCTION:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          niveauInstruction: action.payload,
        },
      };

    case DISPLAY_DIPLOME_MAX:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          diplomeMax: action.payload,
        },
      };

    case DISPLAY_OPTION_DIPLOME_MAX:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          optionDiplomeMax: action.payload,
        },
      };

    case DISPLAY_DOMAINE_DIPLOME_MAX:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          domaineDiplomeMax: action.payload,
        },
      };

    case DISPLAY_DATE_OBTENTION_DIPLOME_MAX:
      return {
        ...state,
        newPersonnel: {
          ...state.newPersonnel,
          dateObtentionDiplomeMax: action.payload,
        },
      };
    case DISPLAY_PERSONNEL_PICTURE_DATA:
      return {
        ...state,
        newPersonnelPhoto: {
          ...state.newPersonnelPhoto,
          personnelPhotoData: action.payload,
        },
      };
    case CREATE_PERSONNEL: {
      return {
        ...state,
        isLoadingCreate: true,
      };
    }
    case CREATE_PERSONNEL_SUCCESS: {
      return {
        ...state,
        personnels: [action.payload, ...state.personnels],
        isLoadingCreate: false,
      };
    }
    case CREATE_PERSONNEL_FAIL: {
      return {
        ...state,
        isLoadingCreate: false,
      };
    }
    case DISPLAY_STATUS_ADMINISTRATIF: {
      return {
        ...state,
        statusAdministratif: action.payload,
      };
    }
    case FETCH_ARCHIVES_PERSONNEL: {
      return {
        ...state,
        archives: action.payload,
      };
    }
    case UPDATE_PERSONNEL_INFORMATIONS_SUCCESS: {
      return {
        ...state,
      };
    }

    case DELETE_PERSONNEL: {
      return {
        ...state,
        personnels: {
          ...state.personnels.filter(
            (personnel) => personnel.matricule != action.payload.data
          ),
        },
      };
    }

    case DELETE_PERSONNEL_FILE: {
      return {
        ...state,
        archives: [
          ...state.archives.filter((item) => item.name !== action.payload),
        ],
      };
    }

    case DELETE_MOUVEMENT: {
      return {
        ...state,
        personnel: {
          ...state.personnel,
          mouvements: state.personnel.mouvements.filter(
            (item) => item.idMouvement !== action.payload
          ),
        },
      };
    }
    default:
      return state;
  }
};
