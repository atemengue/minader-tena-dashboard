import { combineReducers } from "redux";
import { LOG_OUT } from "../actions/types"; // FOR STATE CLEAN
import authReducer from "./authReducer";
import categorieReducer from "./categorieReducer";
import corpsReducer from "./corpsReducer";
import domaineOptionEtudeReducer from "./domaineOptionEtudeReducer";
import ErrorReducer from "./ErrorReducer";
import gradeReducer from "./gradeReducer";
import LoadFirstDataReducer from "./LoadFirstDataReducer";
import locationReducer from "./locationReducer";
import natureActeReducer from "./natureActesReducer";
import parametreReducer from "./parametreReducer";
import personnelPositionReducer from "./personnelPositionReducer";
import personnelReducer from "./personnelReducer";
import posteReducer from "./PosteReducer";
import retraiteReducer from "./retraiteReducer";
import sideBarReducer from "./sideBarReducer";
import signataireReducer from "./signataireReducer";
import soldeReducer from "./soldeReducer";
import statistiqueReducer from "./statistiqueReducer";
import structureReducer from "./structureReducer";
import userReducer from "./userReducer";
import chatReducer from "./chatReducer";

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  loadDataState: LoadFirstDataReducer,
  authState: authReducer,
  personnelState: personnelReducer,
  retraiteState: retraiteReducer,
  positionState: personnelPositionReducer,
  soldeState: soldeReducer,
  sideBarState: sideBarReducer,
  statistiqueState: statistiqueReducer,
  structureState: structureReducer,
  posteState: posteReducer,
  locationState: locationReducer,
  gardeState: gradeReducer,
  corpsState: corpsReducer,
  userState: userReducer,
  parametreState: parametreReducer,
  natureActeState: natureActeReducer,
  signataireState: signataireReducer,
  categorieState: categorieReducer,
  domaineOptionEtudeState: domaineOptionEtudeReducer,
  errorState: ErrorReducer,
  chatState: chatReducer,
  // socketState: socketReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
