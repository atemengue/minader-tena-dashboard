import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import {
  faCamera,
  faSave,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  clearPhoto,
  displayUserConfirmPass,
  displayUserName,
  displayUserOldPassword,
  displayUserPassword,
  displayUserPhoto,
  displayUserSurName,
  resetUserPhoto,
  updateUserProfil,
} from "../../actions/userActions";
import { BUCKET_URL } from "../../config";

const Profile = (props) => {
  const photoElt = useRef();
  const [validPassword, setValidPassword] = useState(true);

  const {
    profile: {
      noms,
      prenoms,
      email,
      photo,
      confirmMotDePasse,
      motDePasse,
      userIdArchive,
    },
    displayUserConfirmPass,
    displayUserName,
    displayUserPassword,
    displayUserSurName,
    isLoading,
    updateUserProfil,
    displayUserPhoto,
    history,
    resetUserPhoto,
    clearPhoto,
  } = props;

  const { photoUrl } = props.photo;
  const saveUpdate = () => {
    if (motDePasse !== confirmMotDePasse || motDePasse == null || null) {
      setValidPassword(false);
      toast.error("Veuillez vérifier les champs!!");
    } else {
      setValidPassword(true);
      updateUserProfil(props.profile, props.photo)
        .then((_) => {
          toast.success(
            "les mises a jour seront prise en compte lors de la prochaine connexion"
          );
        })
        .catch((_) => {
          toast.error("Erreur: Veuillez les champs");
        });
    }
  };

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <h4>Informations du compte</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol>
            <CFormGroup row>
              <div className="col-xs-12 col-md-12 mb-3">
                <div className="d-flex justify-content-center h-100">
                  <div className="row">
                    <div className="col-xs-12 col-md-12 mb-3">
                      <div className="d-flex justify-content-center h-100">
                        <div className="image_outer_container">
                          <div className="green_icon"></div>
                          <div className="image_inner_container">
                            <img
                              src={
                                photo && !photoUrl
                                  ? `${BUCKET_URL}/users/${userIdArchive}/${photo}`
                                  : `${
                                      photoUrl
                                        ? photoUrl
                                        : `${BUCKET_URL}/default/user.png`
                                    }`
                              }
                              alt="Avatar"
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <FontAwesomeIcon
                              cursor="pointer"
                              icon={faCamera}
                              size="lg"
                              color="blue"
                              onClick={() => photoElt.current.click()}
                            />
                            <FontAwesomeIcon
                              cursor="pointer"
                              color="red"
                              size="lg"
                              icon={faTimesCircle}
                              onClick={resetUserPhoto}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CFormGroup>
            <CFormGroup row>
              <CCol className="offset-md-3" md="6">
                <CLabel className="font-weight-bold" htmlFor="noms">
                  Noms:
                </CLabel>
                <CInput
                  required
                  type="text"
                  size="md"
                  id="noms"
                  placeholder="Noms"
                  value={noms}
                  onChange={(noms) => displayUserName(noms.target.value)}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol className="offset-md-3" md="6">
                <CLabel className="font-weight-bold" htmlFor="prenoms">
                  Prenoms:
                </CLabel>
                <CInput
                  size="md"
                  type="text"
                  id="prenoms"
                  placeholder="Prenoms"
                  value={prenoms}
                  onChange={(prenoms) =>
                    displayUserSurName(prenoms.target.value)
                  }
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol className="offset-md-3" md="6">
                <CLabel className="font-weight-bold" htmlFor="email">
                  Email:
                </CLabel>
                <CInput type="text" id="email" value={email} disabled />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              {/* <CCol className="offset-md-3" md="6">
                <CLabel className="font-weight-bold" htmlFor="oldPassword">
                  Ancien Mot de Passe:
                </CLabel>
                <CInput
                  type="password"
                  id="oldPassword"
                  placeholder="Ancien Mot de Passe"
                  value={ancienMotDePasse ? ancienMotDePasse : ""}
                  onChange={(passe) =>
                    displayUserOldPassword(passe.target.value)
                  }
                />
              </CCol> */}
            </CFormGroup>
            <CFormGroup row>
              <CCol className="offset-md-3" md="6">
                <CLabel className="font-weight-bold" htmlFor="motDePasse">
                  Nouveau mot de Passe:
                </CLabel>
                <CInput
                  type="password"
                  id="motDePasse"
                  placeholder="mot de Passe"
                  className={`${!validPassword ? "is-invalid" : " "}`}
                  value={motDePasse ? motDePasse : ""}
                  onChange={(passe) => displayUserPassword(passe.target.value)}
                />
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol className="offset-md-3" md="6">
                <CLabel
                  className="font-weight-bold"
                  htmlFor="motDePasseConfirmer"
                >
                  Confirmer le Nouveau Mot Passe:
                </CLabel>
                <CInput
                  type="password"
                  className={`${!validPassword ? "is-invalid" : " "}`}
                  id="motDePasseConfirmer"
                  placeholder="Confirmer le mot de passe"
                  value={confirmMotDePasse ? confirmMotDePasse : ""}
                  onChange={(passe) =>
                    displayUserConfirmPass(passe.target.value)
                  }
                />
                <div class="invalid-feedback">
                  Les mots de passe ne sont pas les meme
                </div>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol sm="4">
                <input
                  type="file"
                  size="md"
                  id="photo"
                  placeholder="photo"
                  onChange={displayUserPhoto}
                  ref={photoElt}
                  hidden
                />
              </CCol>
            </CFormGroup>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter className="d-flex justify-content-between">
        <CButton onClick={clearPhoto} size="md" color="danger">
          <FontAwesomeIcon icon={faTrash} /> Vider les champs
        </CButton>
        {isLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <CButton onClick={saveUpdate} color="success">
            Enregister <FontAwesomeIcon icon={faSave} size="md" />
          </CButton>
        )}
      </CCardFooter>
    </CCard>
  );
};

const mapStateToProps = ({ userState }) => ({
  profile: userState.profile,
  photo: userState.userPhoto,
  isLoading: userState.isLoadingUpdate,
});

const mapToDispatchProps = {
  displayUserConfirmPass,
  displayUserName,
  displayUserPassword,
  displayUserSurName,
  displayUserOldPassword,
  updateUserProfil,
  displayUserPhoto,
  resetUserPhoto,
  clearPhoto,
};

export default connect(mapStateToProps, mapToDispatchProps)(Profile);
