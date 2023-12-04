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
  CInvalidFeedback,
  CLabel,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
  displayArrondissement,
  displayBirthDate,
  displayBirthPlace,
  displayChildreNum,
  displayCNIDate,
  displayCNINumber,
  displayDepartement,
  displayLieuDelivrance,
  displayMarriedState,
  displayRegimeState,
  displayRegion,
} from "../../../actions/personnelActions";

const Etape2 = (props) => {
  const { nextStep, nbEnfant, lieuDelivranceCNI } = props.newPersonnel;

  const PageTwoValidationSchema = Yup.object().shape({
    lieuNaissance: Yup.string().required(
      "Veuillez entrer le lieu de naissance"
    ),
    dateNaissance: Yup.string().required("Veuillez choisir la date naissance"),
    numeroCNI: Yup.string().required("Veuillez entrer le numéro de la carte"),
    dateCNI: Yup.string().required("Veuillez entrer la date de carte"),
  });

  const toggleModal = (type) => {
    props.setTypeModal(type);
    props.toggle3();
  };

  return (
    <>
      <CCard>
        <Formik
          validationSchema={PageTwoValidationSchema}
          initialValues={{
            lieuNaissance: "",
            dateNaissance: "",
            numeroCNI: "",
            dateCNI: "",
          }}
          onSubmit={(values) => {
            props.displayBirthDate(values.dateNaissance);
            props.displayBirthPlace(values.lieuNaissance);
            props.displayCNINumber(values.numeroCNI);
            props.displayCNIDate(values.dateCNI);
            props.nextStep();
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
            <CForm onSubmit={handleSubmit}>
              <CCardHeader className="d-flex justify-content-between">
                <h4>Etape 2: Origine et informations secondaires</h4>
                <CTooltip content="Afficher les informations">
                  <FontAwesomeIcon
                    onClick={props.toggle}
                    color=""
                    cursor="pointer"
                    icon={faEye}
                    size="lg"
                  />
                </CTooltip>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md="4">
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="selectRegion"
                        >
                          Region:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CSelect
                          defaultValue={0}
                          name="selectRegion"
                          id="selectRegion"
                          onChange={(region) =>
                            props.displayRegion(region.target.value)
                          }
                        >
                          {props.regions.map((region, index) => {
                            return (
                              <option key={index} value={region.idRegion}>
                                {region.libelleRegion}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="selectDepartement"
                        >
                          Departement:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8" className="d-flex">
                        <CInput
                          value={props.departement.libelleDepartement}
                          id="selectDepartement"
                          placeholder="Selectionner le departement"
                        />
                        <CButton
                          onClick={() => toggleModal(1)}
                          className="ml-3"
                          size="xs"
                          color="danger"
                        >
                          <FontAwesomeIcon icon={faBars} size="xs" />
                        </CButton>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="selectArrondissement"
                        >
                          Arrondissement:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8" className="d-flex">
                        <CInput
                          value={props.arrondissement.libelleArrondissement}
                          id="selectRegion"
                          placeholder="Selectionner l'Arrondissement"
                        />
                        <CButton
                          onClick={() => toggleModal(2)}
                          className="ml-3"
                          size="xs"
                          color="danger"
                        >
                          <FontAwesomeIcon icon={faBars} size="xs" />
                        </CButton>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol md="4">
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="lieuNaissance"
                        >
                          Lieu de Naissance:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          invalid={errors.lieuNaissance}
                          value={values.lieuNaissance}
                          id="lieuNaissance"
                          name="lieuNaissance"
                          placeholder="Lieu de Naissance"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>
                          {errors.lieuNaissance}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="dateNaissance"
                        >
                          Date de Naissance:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          invalid={errors.dateNaissance}
                          type="date"
                          value={values.dateNaissance}
                          id="dateNaissance"
                          name="dateNaissance"
                          placeholder="dd-mm-yyyy"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>
                          {errors.dateNaissance}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="numeroCNI"
                        >
                          Numero CNI/Passport:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          invalid={errors.numeroCNI}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="numeroCNI"
                          value={values.numeroCNI}
                          name="numeroCNI"
                          placeholder="numero de la carte"
                          type="text"
                        />
                        <CInvalidFeedback>{errors.numeroCNI}</CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel className="font-weight-bold" htmlFor="dateCNI">
                          Date CNI/Passport:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          invalid={errors.dateCNI}
                          type="date"
                          value={values.dateCNI}
                          id="dateCNI"
                          name="dateCNI"
                          placeholder="dd-mm-yyyy"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <CInvalidFeedback>{errors.dateCNI}</CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="lieuDelivrance"
                        >
                          Lieu de Delivrance:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="lieuDelivrance"
                          type="text"
                          name="lieuDelivrance"
                          value={lieuDelivranceCNI}
                          onChange={(place) =>
                            props.displayLieuDelivrance(place.target.value)
                          }
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol md="4">
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="statutMatrimonial"
                        >
                          Statut Matrimonial:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CSelect
                          name="statutMatrimonial"
                          onChange={(statut) =>
                            props.displayMarriedState(statut.target.value)
                          }
                        >
                          <option value="1">Celibataire</option>
                          <option value="2">Marie</option>
                          <option value="3">Divorce</option>
                          <option value="4">Veuve</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="regimeMatrimonial"
                        >
                          Regime Matrimonial:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CSelect
                          name="regimeMatrimonial"
                          onChange={(statut) =>
                            props.displayRegimeState(statut.target.value)
                          }
                        >
                          <option value="1">Monogame</option>
                          <option value="2">Polygame</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel className="font-weight-bold" htmlFor="nbEnfant">
                          Nombre d'enfants:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CInput
                          value={nbEnfant}
                          id="nbEnfant"
                          name="nbEnfant"
                          placeholder="00"
                          onChange={(nbEnfant) =>
                            props.displayChildreNum(nbEnfant.target.value)
                          }
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter className="d-flex justify-content-between">
                <CButton onClick={props.previousStep} size="md" color="primary">
                  <FontAwesomeIcon icon={faArrowLeft} size="md" /> Etape 1
                </CButton>
                <CButton size="md" color="danger">
                  <FontAwesomeIcon icon={faTrash} size="md" /> Vider les champs
                </CButton>
                <CButton type="submit" size="md" color="success">
                  Etape 3 <FontAwesomeIcon icon={faArrowRight} size="md" />
                </CButton>
              </CCardFooter>
            </CForm>
          )}
        </Formik>
      </CCard>
    </>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  newPersonnel: personnelState.newPersonnel,
});

const mapDispatchToProps = {
  displayCNIDate,
  displayBirthDate,
  displayMarriedState,
  displayChildreNum,
  displayRegimeState,
  displayBirthPlace,
  displayCNINumber,
  displayArrondissement,
  displayRegion,
  displayDepartement,
  displayLieuDelivrance,
};

export default connect(mapStateToProps, mapDispatchToProps)(Etape2);
