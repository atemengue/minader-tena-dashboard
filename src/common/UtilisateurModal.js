import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
  CSelect,
} from "@coreui/react";
import {
  faCamera,
  faTimesCircle,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createUser, fetchRoles } from "../actions/parametreActions";
import { CREATE_NEW_USER_SUCCESS } from "../actions/parametreActions/types";

const UtilisateurModal = ({ modal, toggle, user, ...props }) => {
  // user ref profile
  const photoElt = useRef();

  // state fields
  const [noms, setNoms] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [userPhotoData, setuserPhotoData] = useState("");

  // dispatch for redux
  const dispatch = useDispatch();

  const { fetchRoles, roles } = props;

  // handleImage Profile user
  const handlePicture = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPhotoUrl(reader.result);
      setuserPhotoData(file);
    };

    reader.abort = () => {
      setuserPhotoData(null);
      setPhotoUrl("images/user.png");
    };

    reader.onloadend = () => {
      if (file === undefined) {
        setPhotoUrl("images/user.png");
        setuserPhotoData(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Hooks
  useEffect(() => {
    if (roles.length === 0) {
      fetchRoles();
    }
  }, [fetchRoles]);

  // create user mutation with react_query
  const createUserMutation = useMutation((data) => createUser(data), {
    onSuccess: (response) => {
      dispatch({
        type: CREATE_NEW_USER_SUCCESS,
        payload: response.data,
      });
      toast.success("Utilisateur ajoute avec success");
      toggle();
    },
    onError: (error) => {
      toast.error("Erreur: Veuillez les champs");
    },
  });

  // Submit form
  const onSave = () => {
    createUserMutation.mutate({
      photoUrl,
      userPhotoData,
      noms,
      prenoms,
      email,
      password,
      userRole,
    });
  };

  const resetUserPhoto = () => {
    setPhotoUrl("images/user.png");
    setuserPhotoData(null);
  };

  const clearInput = () => {
    setPhotoUrl("");
    setPrenoms("");
    setUserRole("");
    setNoms("");
    setEmail("");
    setPassword("");
    setuserPhotoData("");
  };

  return (
    <CModal size="lg" show={modal} onClose={toggle}>
      <CModalHeader closeButton>
        <h4>Ajouter un nouvel Utilisateur</h4>
      </CModalHeader>
      <CModalBody>
        <CCard>
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
                                  src={photoUrl ? photoUrl : "images/user.png"}
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
                                  onClick={resetUserPhoto}
                                  icon={faTimesCircle}
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
                  <CCol className="offset-md-2" md="8">
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
                      onChange={(value) => setNoms(value.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel className="font-weight-bold" htmlFor="prenoms">
                      Prenoms:
                    </CLabel>
                    <CInput
                      size="md"
                      type="text"
                      id="prenoms"
                      placeholder="Prenoms"
                      value={prenoms}
                      onChange={(value) => setPrenoms(value.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel className="font-weight-bold" htmlFor="email">
                      Email:
                    </CLabel>
                    <CInput
                      type="text"
                      id="email"
                      placeholder="email"
                      value={email}
                      onChange={(value) => setEmail(value.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel className="font-weight-bold" htmlFor="role">
                      Role:
                    </CLabel>
                    <CRow>
                      <CCol>
                        <CSelect
                          onChange={(role) => setUserRole(role.target.value)}
                        >
                          {roles.map((role, index) => {
                            return (
                              <option key={index} value={role.idRole}>
                                {role.libelleRole}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CCol>
                    </CRow>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel className="font-weight-bold" htmlFor="motDePasse">
                      Nouveau mot de Passe:
                    </CLabel>
                    <CInput
                      type="password"
                      id="motDePasse"
                      placeholder="mot de Passe"
                      value={password}
                      onChange={(value) => setPassword(value.target.value)}
                    />
                  </CCol>
                </CFormGroup>
                {/* <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="motDePasseConfirmer"
                    >
                      Confirmer le Nouveau Mot Passe:
                    </CLabel>
                    <CInput
                      type="password"
                      id="motDePasseConfirmer"
                      value={user?.confirmPasse || ""}
                      placeholder="Confirmer le mot de passe"
                    />
                  </CCol>
                </CFormGroup> */}

                <CFormGroup row>
                  <CCol sm="4">
                    <input
                      type="file"
                      size="md"
                      id="photo"
                      ref={photoElt}
                      onChange={handlePicture}
                      hidden
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-between">
        <CButton color="danger" color="secondary" onClick={toggle}>
          <FontAwesomeIcon icon={faTimesCircle} />
          Annuler
        </CButton>

        <CButton onClick={clearInput} size="md" color="danger">
          <FontAwesomeIcon icon={faTrash} /> Vider les champs
        </CButton>
        {createUserMutation.isLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <CButton onClick={onSave} size="md" color="success">
            <FontAwesomeIcon icon={faUserPlus} size="md" /> Enregister
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  );
};

const mapStateToProps = ({ parametreState }) => ({
  roles: parametreState.roles,
});

const mapToDispatchProps = {
  fetchRoles,
};

export default connect(mapStateToProps, mapToDispatchProps)(UtilisateurModal);
