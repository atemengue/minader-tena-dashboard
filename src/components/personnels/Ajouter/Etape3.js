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
import React, { useState } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import * as Yup from "yup";
import {
  clearInputSpeThree,
  displayActeDate,
  displayActeNumber,
  displayClasse,
  displayDateObtention,
  displayDiplomeMaX,
  displayDomaineDiplomeMax,
  displayEchelon,
  displayGradeActuel,
  displayGradeRecrutement,
  displayIndice,
  displayNatureRecrutement,
  displayNiveauInstruction,
  displayOptionDiplomeMax,
  getNiveauxEtudes,
} from "../../../actions/personnelActions";

const Etape3 = (props) => {
  const {
    dateRecrutement,
    numeroActeRecrutement,
    echelon,
    indice,
    classe,
    diplomeMax,
    dateObtentionDiplomeMax,
    domaineDiplomeMax,
    optionDiplomeMax,
  } = props.newPersonnel;

  const [optionsDomaines, setOptionsDomaines] = useState([]);
  const [niveauEtudes, setNiveauEtudes] = useState([]);

  const PageThreeValidationSchema = Yup.object().shape({
    // gradeRecrutement: Yup.string().required(
    //   "Veuillez selectionner le grade de recrutement"
    // ),
    // gradeActuel: Yup.string().required("Veuillez selectionner la grade Actuel"),
    schoolLevel: Yup.string().required("Veuillez entrer le numéro de la carte"),
  });

  const toggleModal = (type) => {
    props.setTypeGrade(type);
    props.toggle2();
  };

  const selectDomaineEtude = (idDomaine) => {
    if (parseInt(idDomaine) !== 0) {
      let domaineEtude = props.domaines.find(
        (domaine) => domaine.idDomaineEtude === parseInt(idDomaine)
      );
      setOptionsDomaines(domaineEtude.optionEtudes);
      props.displayDomaineDiplomeMax(parseInt(idDomaine));
    } else {
      setOptionsDomaines([]);
      props.displayDomaineDiplomeMax(null);
    }
  };

  const { data, isLoading } = useQuery("listNiveauEtudes", getNiveauxEtudes, {
    onSuccess: (response) => {
      setNiveauEtudes(response.data);
    },
  });

  return (
    <>
      <CCard>
        <Formik
          validationSchema={PageThreeValidationSchema}
          initialValues={{
            gradeRecrutement: props.gradeRecrutement.libelleGrade,
            gradeActuel: props.gradeActuel.libelleGrade,
            schoolLevel: "",
          }}
          onSubmit={(values) => {
            props.displayNiveauInstruction(values.schoolLevel);
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
            <CForm method="post" onSubmit={handleSubmit}>
              <CCardHeader className="d-flex justify-content-between">
                <h4>Etape 3: Situation Actuelle</h4>
                <CTooltip content="Afficher les informations">
                  <FontAwesomeIcon
                    onClick={props.toggle1}
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
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="selectNatureActe"
                        >
                          Nature du Recrutement:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CSelect
                          onChange={(nature) =>
                            props.displayNatureRecrutement(nature.target.value)
                          }
                          custom
                          name="selectNatureActe"
                          id="selectNatureActe"
                        >
                          <option value={0}>Selectionner la nature</option>
                          <option value={1}>Arreté</option>
                          <option value={2}>Decret</option>
                          <option value={3}>Décision</option>
                          <option value={4}>Note de service</option>
                          <option value={5}>Affectation</option>
                          <option value={6}>Contrat</option>
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="ActeNumber"
                        >
                          N: de l'acte de recrutement:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="ActeNumber"
                          name="ActeNumber"
                          placeholder="numero de l'acte"
                          onChange={(numero) =>
                            props.displayActeNumber(numero.target.value)
                          }
                          value={numeroActeRecrutement}
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="dateRecrutement"
                        >
                          Date de Recrutement:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="dateRecrutement"
                          name="dateRecrutement"
                          placeholder="Text"
                          type="date"
                          onChange={(date) =>
                            props.displayActeDate(date.target.value)
                          }
                          value={dateRecrutement}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>

                  <CCol md="5">
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="gradeRecrutement"
                        >
                          Grade de Recrutement:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8" className="d-flex">
                        <CInput
                          placeholder="Selectionner le grade de recrutement"
                          id="gradeRecrutement"
                          value={props.gradeRecrutement.libelleGrade}
                          invalid={errors.gradeRecrutement}
                          required
                        />
                        <CButton
                          onClick={() => toggleModal(1)}
                          className="ml-3"
                          size="xs"
                          color="danger"
                        >
                          <FontAwesomeIcon icon={faBars} size="xs" />
                        </CButton>
                        <CInvalidFeedback>
                          {errors.gradeRecrutement}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="gradeActuel"
                        >
                          Grade Actuel:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8" className="d-flex">
                        <CInput
                          placeholder="Selectionner le grade actuel"
                          name="gradeActuel"
                          required
                          id="gradeActuel"
                          value={props.gradeActuel.libelleGrade}
                          invalid={errors.gradeActuel}
                        />
                        <CButton
                          onClick={() => toggleModal(2)}
                          className="ml-3"
                          size="xs"
                          color="danger"
                        >
                          <FontAwesomeIcon icon={faBars} size="xs" />
                        </CButton>
                        <CInvalidFeedback>
                          {errors.gradeActuel}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="schoolLevel"
                        >
                          Niveau d'instruction
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CSelect
                          name="schoolLevel"
                          id="schoolLevel"
                          invalid={errors.schoolLevel}
                          onChange={handleChange}
                          value={values.schoolLevel}
                          onBlur={handleBlur}
                        >
                          {niveauEtudes.map((etude, index) => {
                            return (
                              <option key={index} value={etude?.id}>
                                {etude?.niveau}
                              </option>
                            );
                          })}
                          {/* <option value={0}>
                            Selectionner le Niveau d'etude
                          </option>
                          <option value={1}>
                            CEP / FSLC(First School Leaving Certificate){" "}
                          </option>
                          <option value={2}>BEPC /GCE Ordinary Level</option>
                          <option value={3}>PROBATOIRE</option>
                          <option value={4}>
                            BACCALAUREAT / GCE Advanced Level
                          </option>
                          <option value={9}>BACC+1</option>
                          <option value={10}>BACC+2</option>
                          <option value={5}>LICENCE / (BACHELOR DEGREE)</option>
                          <option value={6}>MASTER I</option>
                          <option value={7}>MASTER II (MASTER DEGREE)</option>
                          <option value={8}>DOCTORAT (PHD)</option> */}
                        </CSelect>
                        <CInvalidFeedback>
                          {errors.schoolLevel}
                        </CInvalidFeedback>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="diplomeMax"
                        >
                          Diplome le plus Elevé:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="diplomeMax"
                          name="diplomeMax"
                          placeholder="Text"
                          value={diplomeMax}
                          onChange={(diplome) =>
                            props.displayDiplomeMaX(diplome.target.value)
                          }
                        />
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="domaineDiplomeMax"
                        >
                          Domaine du diplome
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CSelect
                          default={null}
                          name="domaineDiplomeMax"
                          id="domaineDiplomeMax"
                          value={domaineDiplomeMax}
                          onChange={(domaine) =>
                            selectDomaineEtude(domaine.target.value)
                          }
                        >
                          {[
                            {
                              idDomaineEtude: 0,
                              libelleDomaineEtude:
                                "Selectionner le domaine d'etude",
                              optionEtudes: [],
                            },
                            ...props.domaines,
                          ].map((domaine, index) => {
                            return (
                              <option
                                key={index}
                                value={domaine?.idDomaineEtude}
                              >
                                {domaine?.libelleDomaineEtude}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="optionDiplomeMax"
                        >
                          Option du diplome
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CSelect
                          default={null}
                          name="optionDiplomeMax"
                          id="optionDiplomeMax"
                          value={optionDiplomeMax}
                          onChange={(option) =>
                            props.displayOptionDiplomeMax(option.target.value)
                          }
                        >
                          {optionsDomaines.map((option, index) => {
                            return (
                              <option key={index} value={option?.idOptionEtude}>
                                {option?.libelleOptionEtude}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="dateObtentionDiplomeMax"
                        >
                          Date Obtention du diplome:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="dateObtentionDiplomeMax"
                          name="dateObtentionDiplomeMax"
                          placeholder="Text"
                          type="date"
                          onChange={(date) =>
                            props.displayDateObtention(date.target.value)
                          }
                          value={dateObtentionDiplomeMax}
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                  <CCol md="3">
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel className="font-weight-bold" htmlFor="indice">
                          Indice:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="indice"
                          name="indice"
                          placeholder="Text"
                          value={indice}
                          onChange={(indice) =>
                            props.displayIndice(indice.target.value)
                          }
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel className="font-weight-bold" htmlFor="classe">
                          Classe:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="classe"
                          name="classe"
                          placeholder="Text"
                          value={classe}
                          onChange={(classe) =>
                            props.displayClasse(classe.target.value)
                          }
                        />
                      </CCol>
                    </CFormGroup>
                    <CFormGroup row>
                      <CCol md="5">
                        <CLabel className="font-weight-bold" htmlFor="echelon">
                          Echelon:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CInput
                          id="echelon"
                          name="echelon"
                          placeholder="Text"
                          value={echelon}
                          onChange={(echelon) =>
                            props.displayEchelon(echelon.target.value)
                          }
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter className="d-flex justify-content-between">
                <CButton onClick={props.previousStep} size="md" color="primary">
                  <FontAwesomeIcon icon={faArrowLeft} size="md" /> Etape 2
                </CButton>
                <CButton size="md" color="danger">
                  <FontAwesomeIcon icon={faTrash} size="md" /> Vider les champs
                </CButton>
                <CButton type="submit" size="md" color="success">
                  Etape 4 <FontAwesomeIcon icon={faArrowRight} size="md" />
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
  clearInputSpeThree,
  displayGradeActuel,
  displayGradeRecrutement,
  displayEchelon,
  displayClasse,
  displayIndice,
  displayActeDate,
  displayActeNumber,
  displayNatureRecrutement,
  displayDateObtention,
  displayNiveauInstruction,
  displayDiplomeMaX,
  displayOptionDiplomeMax,
  displayDomaineDiplomeMax,
};

export default connect(mapStateToProps, mapDispatchToProps)(Etape3);
