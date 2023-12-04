import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputRadio,
  CInvalidFeedback,
  CLabel,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faArrowRight,
  faCamera,
  faEye,
  faTimesCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React, { useRef } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
  clearInputSpetOne,
  displayEmail,
  displayLadyName,
  displayMatricule,
  displayName,
  displayPersonnelPicture,
  displayPhone,
  displaySexe,
  displaySubName,
  resetPhoto,
} from "../../../actions/personnelActions";
import "./profile.scss"; // SASS PROFILE

const Etape1 = (props) => {
  const photoElt = useRef();

  const PageOneValidationSchema = Yup.object().shape({
    noms: Yup.string().required("Veuillez entrer les noms du personnel"),
    sexe: Yup.string().required("Veuillez choisir le sexe"),
    telephones: Yup.string().required(
      "Veuillez entrer les numeros de telephones"
    ),
  });

  const {
    newPersonnel,
    clearInputSpetOne,
    displayEmail,
    displayLadyName,
    displayMatricule,
    displayName,
    displayPersonnelPicture,
    displayPhone,
    displaySexe,
    displaySubName,
    photo,
    resetPhoto,
    nextStep,
    toggle,
  } = props;
  const { prenoms, matricule, email, telephones, nomJeuneFille } = newPersonnel;

  const { photoUrl } = photo;

  return (
    <CCard>
      <Formik
        validationSchema={PageOneValidationSchema}
        initialValues={{
          noms: "",
          sexe: "",
          telephones: "",
        }}
        onSubmit={(values) => {
          displayName(values.noms);
          displaySexe(values.sexe);
          displayPhone(values.telephones);
          nextStep();
        }}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          isSubmitting,
          handleSubmit,
        }) => (
          <>
            <CForm onSubmit={handleSubmit}>
              <CCardHeader className="d-flex justify-content-between">
                <h4>Etape 1: Informations principales</h4>
                <CTooltip content="Afficher les informations">
                  <FontAwesomeIcon
                    onClick={toggle}
                    color=""
                    cursor="pointer"
                    icon={faEye}
                    size="lg"
                  />
                </CTooltip>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CFormGroup row>
                      <div className="col-xs-12 col-md-12 mb-5">
                        <div className="d-flex justify-content-center h-100">
                          <div className="row">
                            <div className="col-xs-12 col-md-12 mb-5">
                              <div className="d-flex justify-content-center h-100">
                                <div className="image_outer_conWtainer">
                                  <div className="green_icon"></div>
                                  <div className="image_inner_container">
                                    <img
                                      src={
                                        photoUrl ? photoUrl : "images/user.png"
                                      }
                                      alt="Avatar"
                                    />
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                    className="icon-camera"
                                  >
                                    <FontAwesomeIcon
                                      cursor="pointer"
                                      onClick={() => photoElt.current.click()}
                                      icon={faCamera}
                                      size="lg"
                                      color="blue"
                                    />
                                    <FontAwesomeIcon
                                      cursor="pointer"
                                      color="red"
                                      onClick={resetPhoto}
                                      icon={faTimesCircle}
                                      size="lg"
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
                      <CCol sm="4">
                        <CLabel className="font-weight-bold" htmlFor="noms">
                          Noms:
                        </CLabel>
                        <CInput
                          invalid={errors.noms}
                          type="text"
                          size="md"
                          id="noms"
                          placeholder="Noms"
                          value={values.noms}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>{errors.noms}</CInvalidFeedback>
                      </CCol>
                      <CCol sm="4">
                        <CLabel className="font-weight-bold" htmlFor="prenoms">
                          Prenoms:
                        </CLabel>
                        <CInput
                          size="md"
                          value={prenoms}
                          onChange={(value) =>
                            displaySubName(value.target.value)
                          }
                          type="text"
                          id="prenoms"
                          placeholder="Prenoms"
                        />
                      </CCol>
                      <CCol sm="4">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="matricule"
                        >
                          Matricule:
                        </CLabel>
                        <CInput
                          value={matricule}
                          onChange={(matricule) =>
                            displayMatricule(matricule.target.value)
                          }
                          type="text"
                          id="matricule"
                          placeholder="Matricule"
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol sm="3">
                        <CLabel className="font-weight-bold" htmlFor="sexe">
                          Sexe:
                        </CLabel>
                        <br />
                        <CFormGroup variant="checkbox" inline>
                          <CInputRadio
                            className="form-check-input"
                            id="sexe"
                            name="sexe"
                            value={1}
                            invalid={errors.sexe}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <CLabel variant="checkbox" htmlFor="sexe">
                            Masculin
                          </CLabel>
                        </CFormGroup>
                        <CFormGroup variant="checkbox" inline>
                          <CInputRadio
                            className="form-check-input"
                            id="sexe"
                            name="sexe"
                            value={2}
                            invalid={errors.sexe}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <CLabel variant="checkbox" htmlFor="feminin">
                            Feminin
                          </CLabel>
                        </CFormGroup>
                        <CFormGroup>
                          <CInput hidden invalid={errors.sexe} />
                          <CInvalidFeedback>{errors.sexe}</CInvalidFeedback>
                        </CFormGroup>
                      </CCol>

                      <CCol sm="3">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="NomDeJeuneFille"
                        >
                          Nom de jeune Fille:
                        </CLabel>
                        <CInput
                          id="NomDeJeuneFille"
                          placeholder="Nom de JeuneFille"
                          value={nomJeuneFille}
                          onChange={(name) =>
                            displayLadyName(name.target.value)
                          }
                        />
                      </CCol>
                      <CCol sm="3">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="telephone"
                        >
                          Telephones:
                        </CLabel>
                        <CInput
                          value={telephones}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="telephone"
                          placeholder="telephones"
                          name="telephones"
                          invalid={errors?.telephones}
                          value={values?.telephones}
                        />
                        <CInvalidFeedback>{errors.telephones}</CInvalidFeedback>
                      </CCol>
                      <CCol sm="3">
                        <CLabel className="font-weight-bold" htmlFor="email">
                          addresse Email:
                        </CLabel>
                        <CInput
                          value={email}
                          onChange={(email) => displayEmail(email.target.value)}
                          type="email"
                          id="email"
                          placeholder="email"
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol sm="4">
                        <input
                          type="file"
                          size="md"
                          hidden
                          id="photo"
                          onChange={displayPersonnelPicture}
                          placeholder="photo"
                          ref={photoElt}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter className="d-flex justify-content-between">
                <CButton onClick={clearInputSpetOne} size="md" color="danger">
                  <FontAwesomeIcon icon={faTrash} /> Vider les champs
                </CButton>

                <CButton type="submit" color="success">
                  Etape 2 <FontAwesomeIcon icon={faArrowRight} size="md" />
                </CButton>
              </CCardFooter>
            </CForm>
          </>
        )}
      </Formik>
    </CCard>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  newPersonnel: personnelState.newPersonnel,
});

const mapDispatchToProps = {
  displayPersonnelPicture,
  resetPhoto,
  displayName,
  displaySubName,
  displayMatricule,
  displayPhone,
  displayLadyName,
  displaySexe,
  displayEmail,
  clearInputSpetOne,
};

export default connect(mapStateToProps, mapDispatchToProps)(Etape1);
