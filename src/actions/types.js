export const API_FIRST_CALL_SUCCESS = "api_first_call_success";
export const API_FIRST_CALL_ERROR = "api_first_call_error";

//SIDEBARSHOW
export const SET_NAV_SHOW = "set_nav_show";
export const SET_NAV_HIDDEN = "set_nav_hidden";

//AUTH ACTIONS
export const EMAIL_LOGIN = "email_login";
export const EMAIL_LOGIN_SUCCESS = "email_login_success";
export const EMAIL_LOGIN_FAIL = "email_login_fail";

export const EMAIL_CHANGED = "email_changed";
export const PASSWORD_CHANGED = "password_changed";

export const CHECK_TOKEN = "check_token";
export const CHECK_TOKEN_SUCCESS = "check_token_success";
export const CHECK_TOKEN_FAIL = "check_token_fail";

export const LOG_OUT = "log_out";

// RETRAITES ACTIONS
export const FETCH_RETRAITES = "fech_retraites";
export const FETCH_RETRAITES_SUCCESS = "fetch_retraites_success";
export const FETCH_RETRAITES_FAIL = "fetch_retraites_fail";

// POSITION ACTIONS
export const FETCH_POSITIONS = "fetch_positions";
export const FETCH_POSITIONS_NUMBER = "fetch_positions_number";
export const FETCH_POSITIONS_SUCCESS = "fetch_positions_success";
export const FETCH_POSITIONS_FAIL = "fetch_positions_fail";
export const FETCH_POSITIONS_PERSONNELS = "fetch_positions_personnels";
export const FETCH_POSITIONS_PERSONNELS_SUCCESS =
  "fetch_positions_personnels_success";
export const FETCH_POSITIONS_PERSONNELS_FAIL =
  "fetch_positions_personnels_fail";

// SOLDE ACTIONS
export const FETCH_SOLDES = "fetch_soldes";
export const FETCH_SOLDES_NUMBER = "fetch_soldes_number";
export const FETCH_SOLDES_PERSONNELS_SUCCESS =
  "fetch_soldes_personnels_success";
export const FETCH_SOLDES_PERSONNELS = "fetch_soldes_personnels";
export const FETCH_SOLDES_PERSONNELS_FAIL = "fetch_soldes_personnels_fail";

export const UPDATE_MATRICULES = "update_matricules";
export const UPDATE_MATRICULES_SUCCESS = "update_matricules_success";
export const UPDATE_MATRICULES_FAIL = "update_matricules_fail";
export const FETCH_SOCLE = "fetch_socle";
export const FETCH_SOCLE_SUCCESS = "fetch_socle_success";
export const FETCH_SOCLE_FAIL = "fetch_socle_fail";

export const GET_CLASSIFICATION = "get_classification";
export const GET_CLASSIFICATION_SUCCESS = "get_classification_success";
export const GET_CLASSIFICATION_FAIL = "get_classification_fail";

// STRUCTURES ACTIONS

// SERVICE CENTRAUX
export const FETCH_STRUCTURES = " fetch_structures";
export const FETCH_STRUCTURES_SUCCESS = "fetch_structures_success";
export const FETCH_STRUCTURES_FAIL = "fetch_structures_fail";
export const FETCH_STRUCTURE = "fetch_structure";
export const FETCH_STRUCTURE_SUCCESS = "fetch_structure_success";
export const FETCH_STRUCTURE_FAIL = "fetch_structure_fail";

// SERVICE DECONCENTRES
export const FETCH_STRUCTURES_DECONCENTRES = " fetch_structures_deconcentres";
export const FETCH_STRUCTURES_DECONCENTRES_SUCCESS =
  "fetch_structures_success_deconcentres";
export const FETCH_STRUCTURES_DECONCENTRES_FAIL =
  "fetch_structures_deconcentres_fail";
export const FETCH_STRUCTURE_DECONCENTRE = "fetch_structure_deconcentre";
export const FETCH_STRUCTURE_DECONCENTRE_SUCCESS =
  "fetch_structure_deconcentre_success";
export const FETCH_STRUCTURE_DECONCENTRE_FAIL =
  "fetch_structure_deconcentre_fail";

// NATURE STRUCTURES ACTIONS

export const FETCH_NATURES_POSTES = "fetch_natures_postes";
export const FETCH_NATURES_POSTES_SUCCESSS = "fetch_natures_postes_success";
export const FETCH_NATURES_POSTES_FAIL = "fetch_natures_postes_fail";
export const FETCH_POSTES_BY_NATURE_POSTE = "fetch_postes_by_nature_poste";
export const FETCH_POSTES_BY_NATURE_POSTE_SUCCESS =
  "fetch_postes_by_nature_poste_success";
export const FETCH_POSTES_BY_NATURE_POSTE_FAIL =
  "fetch_postes_by_nature_poste_fail";

export const CREATE_STRUCTURE = "create_structure";
export const CREATE_STRUCTURE_SUCCESS = "create_structure_success";
export const CREATE_STRUCTURE_FAIL = "create_structure_fail";

// POSTES ALL

export const FETCH_POSTES = "fetch_postes";
export const FETCH_POSTE = "fetch_poste";
export const FETCH_POSTE_SUCCESS = "fetch_poste_success";
export const FETCH_POSTE_FAIL = "fetch_poste_fail";
export const FETCH_POSTES_SUCCESS = "fetch_postes_success";
export const FETCH_POSTES_FAIL = "fetch_postes_fail";

// FETCH RANG POSTES
export const FETCH_RANGS_POSTES = "fetch_rang_postes";
export const FETCH_RANGS_POSTES_SUCCESS = "fetch_rang_postes_success";
export const FETCH_RANGS_POSTES_FAIL = "fetch_rang_postes_fail";

export const FETCH_POSTES_BY_RANG = "fetch_postes_by_rang";
export const FETCH_POSTES_BY_RANG_SUCCESS = "fetch_postes_by_rang_success";
export const FETCH_POSTES_BY_RANG_FAIL = "fetch_postes_by_rang_fail";

// POSTES UPDATES
export const UPDATE_POSTES = "update_postes";
export const UPDATE_POSTES_SUCCESS = "update_postes_success";
export const UPDATE_POSTES_FAIL = "update_postes_fail;";
export const UPDATE_POSTE_INFORMATIONS_SUCCESS =
  "update_poste_informations_success";

export const FETCH_ALL_STRUCTURES = "fetch_all_structures";
export const FETCH_ALL_STRUCTURES_SUCCESS = "fetch_all_structures_success";
export const FETCH_ALL_STRUCTURES_FAIL = "fetch_all_structures_fail";

// TYPES STRUCTURES
export const FETCH_TYPES_STRUCTURE = "fetch_types_structure";
export const FETCH_TYPES_STRUCTURE_SUCCESS = "fetch_types_structures_success";
export const FETCH_TYPES_STRUCTURE_FAIL = "fetch_types_structure_fail";

export const FETCH_NATURES_STRUCTURE = "fetch_natures_structure";
export const FETCH_NATURES_STRUCTURE_SUCCESS =
  "fetch_natures_structure_success";
export const FETCH_NATURES_STRUCTURE_FAIL = "fetch_natures_structure_fail";

// export const FETCH_STRUCTURES_BY_TYPE = 'fetch_structures_by_type';
// export const FETCH_STRUCTURES_BY_TYPE_SUCCESS = 'fetch_structures_by_type_success';
// export const FETCH_STRUCTURES_BY_TYPE_FAIL = 'fetch_structures_by_type_fail';

export const FETCH_STRUCTURES_BY_NATURE = "fetch_structures_by_nature";
export const FETCH_STRUCTURES_BY_NATURE_SUCCESS =
  "fetch_structures_by_nature_success";
export const FETCH_STRUCTURES_BY_NATURE_FAIL =
  "fetch_structures_by_nature_fail";

export const DELETE_POSTES = "delete_postes";
export const DELETE_POSTES_SUCCESS = "delete_postes_success";
export const DELETE_POSTES_FAIL = "delete_postes_fail";

export const FETCH_NATURES_ACTES = "fetch_natures_actes";
export const FETCH_ACTES = "fetch_actes";
export const FETCH_ACTES_SUCCESS = "fetch_actes_success";
export const FETCH_ACTES_FAIL = "fetch_actes_fail";

export const FETCH_ACTE = "fetch_acte";
export const FETCH_ACTE_SUCCESS = "fetch_acte_success";
export const FETCH_ACTE_FAIL = "fetch_acte_fail";

export const ERROR_CLOSE = "error_close";
export const SET_ERROR = "set_error";
export const ALL_IN_ONE_POSTE = "all_in_one_poste";
export const ALL_IN_ONE_POSTE_FAIL = "all_in_one_poste_fail";
