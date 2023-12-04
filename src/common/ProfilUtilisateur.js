import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import {
  faArrowLeft,
  faCamera,
  faCheck,
  faTimesCircle,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  createUser,
  fetchRoles,
  fetchUser,
  updateUserPhoto,
  updateUserProfil,
} from "../actions/parametreActions";
import { CREATE_NEW_USER_SUCCESS } from "../actions/parametreActions/types";
import { BUCKET_URL } from "../config";

const ProfilUtilisateur = ({ modal, toggle, user, ...props }) => {
  const idUser = props.match.params.idUser;

  // user ref profile
  const photoElt = useRef();

  // state fields
  const [noms, setNoms] = useState(null);
  const [prenoms, setPrenoms] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [userPhotoData, setuserPhotoData] = useState(null);
  const [picture, setPicture] = useState(null);
  const [userIdArchive, setuserIdArchive] = useState(null);
  const [errors, setErrors] = useState({
    noms: false,
    prenoms: false,
    email: false,
    role: false,
    password: false,
  });

  // dispatch for redux
  const dispatch = useDispatch();

  // destructuring
  const { fetchRoles, roles } = props;

  // handleImage Profile user
  const handlePicture = (event) => {
    setPicture(null);
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

  // Hooks
  useEffect(() => {
    if (roles.length === 0) {
      fetchRoles();
    }
    if (idUser !== "creer") {
      fetchUserMutation.mutate(idUser);
      clearInput();
    }
  }, [fetchRoles, idUser]);

  // fetch user profile data mutation
  const fetchUserMutation = useMutation((idUser) => fetchUser(idUser), {
    onSuccess: (response) => {
      setNoms(response.data.noms);
      setPrenoms(response.data.prenoms);
      setEmail(response.data.email);
      setPicture(response.data.photo);
      setuserIdArchive(response.data.userIdArchive);
      setUserRole(response.data.roleIdRole);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // create user mutation with react_query
  const createUserMutation = useMutation((data) => createUser(data), {
    onSuccess: (response) => {
      dispatch({
        type: CREATE_NEW_USER_SUCCESS,
        payload: response.data,
      });
      toast.success("Nouveau utilisateur ajouté avec success!!");
      clearInput();
      props.history.goBack();
    },
    onError: (error) => {
      const { data } = error.response;

      toast.error("Erreur: Vérifier les champs ");
    },
  });

  const updateUserProfilMutation = useMutation(
    (data) => updateUserProfil(data),
    {
      onSuccess: (response) => {
        toast.success("Information mis a jours");
        props.history.goBack();
      },
      onError: (error) => {
        toast.error("Erreur: Probleme sur le serveur");
      },
    }
  );

  const userUpdatePhotoMutation = useMutation((data) => updateUserPhoto(data), {
    onSuccess: (response) => {
      toast.success("photo de profil mis a jour");
    },
    onError: (error) => {
      toast.error("Erreur sur le serveur");
    },
  });

  // Submit form
  const onSave = () => {
    if (idUser !== "creer") {
      updateUserProfilMutation.mutate({
        idUser,
        noms,
        prenoms,
        email,
        motDePasse: password,
        roleIdRole: userRole,
      });
    } else {
      createUserMutation.mutate({
        photoUrl,
        userPhotoData,
        noms,
        prenoms,
        email,
        password,
        roleIdRole: userRole,
      });
    }
  };

  // update photo

  const onUpdatedPhoto = () => {
    userUpdatePhotoMutation.mutate({
      photoUrl,
      userPhotoData,
      idUser,
    });
  };

  return (
    <>
      <CCol col="2" sm="6" md="2" className="mb-3">
        <CButton
          onClick={() => props.history.goBack()}
          block
          size="sm"
          color="dark"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Retour
        </CButton>
      </CCol>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <CFormGroup row>
                <CRow>
                  <CCol>
                    {userUpdatePhotoMutation.isLoading && (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </CCol>
                </CRow>
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
                                  photoUrl
                                    ? photoUrl
                                    : picture
                                    ? `${BUCKET_URL}/users/${userIdArchive}/${picture}`
                                    : `${BUCKET_URL}/default/user.png`
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
                              <CTooltip content="Choisir une photo sur votre ordinateur">
                                <FontAwesomeIcon
                                  cursor="pointer"
                                  icon={faCamera}
                                  size="lg"
                                  color="blue"
                                  onClick={() => photoElt.current.click()}
                                />
                              </CTooltip>
                              {photoUrl && (
                                <CTooltip content="Valider la nouvelle photo de profil">
                                  <FontAwesomeIcon
                                    style={{ marginTop: 8 }}
                                    cursor="pointer"
                                    icon={faCheck}
                                    size="lg"
                                    color="green"
                                    onClick={() => onUpdatedPhoto()}
                                  />
                                </CTooltip>
                              )}

                              <CTooltip content="Supprimer la photo">
                                <FontAwesomeIcon
                                  cursor="pointer"
                                  color="red"
                                  size="lg"
                                  onClick={resetUserPhoto}
                                  icon={faTimesCircle}
                                />
                              </CTooltip>
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
                    invalid={errors.email}
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
                        value={userRole}
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
        <CCardFooter className="d-flex justify-content-between">
          <CButton color="danger" color="secondary" onClick={toggle}>
            <FontAwesomeIcon icon={faTimesCircle} />
            Annuler
          </CButton>

          <CButton onClick={clearInput} size="md" color="danger">
            <FontAwesomeIcon icon={faTrash} /> Vider les champs
          </CButton>
          {createUserMutation.isLoading ||
          updateUserProfilMutation.isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CButton onClick={onSave} size="md" color="success">
              <FontAwesomeIcon icon={faUserPlus} size="md" /> Enregister
            </CButton>
          )}
        </CCardFooter>
      </CCard>
    </>
  );
};

const mapStateToProps = ({ parametreState }) => ({
  user: parametreState.user,
  roles: parametreState.roles,
});

const mapToDispatchProps = {
  fetchRoles,
};

export default connect(mapStateToProps, mapToDispatchProps)(ProfilUtilisateur);
