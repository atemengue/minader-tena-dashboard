import {
  CBadge,
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
  CLabel,
  CRow,
} from "@coreui/react";
import { faBars, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createStage } from "../../actions/stages";
import { fetchStructures } from "../../actions/structureActions";
import ListSelectedPersonnelModal from "../../common/ListSelectedPersonnelModal";
import ListStructureModal from "../../common/ListStructureModal";

const AjouterStage = ({ structures, fetchStructures }) => {
  const [personnel, setPersonnel] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalStructure, setModalStructure] = useState(false);
  const [localStage, setLocalStage] = useState(true);
  const [positionStage, setPositionStage] = useState(false);

  useEffect(() => {
    if (!structures) {
      fetchStructures();
    }
  }, []);

  const mutation = useMutation((stageData) => createStage(stageData), {
    onSuccess: (response) => {
      toast.success("Stage Ajoutée");
      setTimeout(() => {
        mutation.reset();
        clearInput();
      }, 2000);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const personnelData = { ...personnel };
    if (name === "lieu") {
      personnelData["structureIdStructure"] = null;
    }
    if (name !== "Solde") {
      personnelData[name] = value;
    } else {
      if (checked === false) {
        personnelData["Mois"] = null;
        personnelData["Annee"] = null;
      }
      personnelData[name] = checked;
    }
    setPersonnel(personnelData);
  };

  const handleStructure = (e, index) => {
    setLocalStage(JSON.parse(e.target.value));
    handleInputChange(e, index);
  };

  const handlePositionStage = (e, index) => {
    setPositionStage(JSON.parse(e.target.value));
    handleInputChange(e, index);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const setNewPersonnel = ({ dataList }) => {
    let firstPersonnel = dataList[0];

    let personnel = {
      nomsPrenoms: firstPersonnel.nomsPrenoms,
      objet: null,
      lieu: null,
      dateDebut: null,
      dateFin: null,
      diplome: null,
      personnelMatricule: firstPersonnel.matricule,
      localStage: localStage,
      structureIdStructure: null,
      positionStage: false,
    };

    setPersonnel(personnel);
  };

  // faire un HOOKS
  const [structureData, setstructureData] = useState({
    idStructure: 5000,
    designationAdministrative: "Structure de Stage",
  });

  const clearInput = () => {
    setPersonnel(null);
  };

  const setNewStructure = (structure) => {
    setstructureData(structure);
    setPersonnel({
      ...personnel,
      structureIdStructure: structure.idStructure,
      lieu: null,
    });
  };

  return (
    <>
      <ListSelectedPersonnelModal
        modal={modal}
        toggle={toggle}
        setNewPersonnel={setNewPersonnel}
      />
      <ListStructureModal
        structures={structures?.data}
        modal={modalStructure}
        toggle={(_) => setModalStructure(!modalStructure)}
        setNewStructure={setNewStructure}
      />

      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CForm action="" method="post">
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <h5>Mettre un personnel en Stage ou Formation</h5>
                <CButton onClick={toggle} color="info">
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faUserPlus}
                    color="white"
                  />
                  Selectionner
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CFormGroup>
                  {personnel && (
                    <>
                      <CBadge>{personnel?.nomsPrenoms}</CBadge>
                      <CRow className="my-4">
                        <CCol className="mb-3" xs="12">
                          <CLabel
                            className="font-weight-bold"
                            htmlFor="personnel"
                          >
                            Nom du personnel
                          </CLabel>
                          <CInput
                            autoComplete={false}
                            disabled
                            name="personnel"
                            placeholder="Informations du personnel"
                            value={
                              personnel?.nomsPrenoms +
                              personnel?.personnelMatricule
                            }
                          />
                        </CCol>

                        <CCol className="mb-3" xs="6">
                          <CLabel
                            className="font-weight-bold"
                            htmlFor="positionStage"
                          >
                            En Cours de Stage ?
                          </CLabel>
                          <br />
                          <CFormGroup variant="checkbox" inline>
                            <CInputRadio
                              className="form-check-input"
                              id="NON"
                              name="positionStage"
                              checked={!positionStage}
                              value={false}
                              onChange={(e) => handlePositionStage(e)}
                            />
                            <CLabel variant="checkbox" htmlFor="NON">
                              NON
                            </CLabel>
                          </CFormGroup>
                          <CFormGroup variant="checkbox" inline>
                            <CInputRadio
                              className="form-check-input"
                              id="OUI"
                              name="positionStage"
                              value={true}
                              checked={positionStage}
                              onChange={(e) => handlePositionStage(e)}
                            />
                            <CLabel variant="checkbox" htmlFor="OUI">
                              OUI
                            </CLabel>
                          </CFormGroup>
                        </CCol>
                        <CCol xs="6">
                          <CLabel className="font-weight-bold" htmlFor="sexe">
                            Type de Stage
                          </CLabel>
                          <br />
                          <CFormGroup variant="checkbox" inline>
                            <CInputRadio
                              className="form-check-input"
                              id="interne"
                              name="localStage"
                              checked={localStage}
                              value={true}
                              onChange={(e) => handleStructure(e)}
                            />
                            <CLabel variant="checkbox" htmlFor="interne">
                              Interne
                            </CLabel>
                          </CFormGroup>
                          <CFormGroup variant="checkbox" inline>
                            <CInputRadio
                              className="form-check-input"
                              id="externe"
                              name="localStage"
                              value={false}
                              checked={!localStage}
                              onChange={(e) => handleStructure(e)}
                            />
                            <CLabel variant="checkbox" htmlFor="externe">
                              Externe
                            </CLabel>
                          </CFormGroup>
                        </CCol>

                        {localStage ? (
                          <CCol xs="6">
                            <CFormGroup row>
                              <CCol>
                                <CLabel
                                  className="font-weight-bold"
                                  htmlFor="structureStage"
                                >
                                  Structure de Stage:
                                </CLabel>
                                <CRow>
                                  <CCol sm="9">
                                    <CInput
                                      id="structureStage"
                                      placeholder="Selectionner la structure"
                                      value={
                                        structureData.designationAdministrative
                                      }
                                    />
                                  </CCol>
                                  <CCol sm="3">
                                    <CButton
                                      onClick={(_) =>
                                        setModalStructure(!modalStructure)
                                      }
                                      size="md"
                                      color="danger"
                                    >
                                      <FontAwesomeIcon
                                        icon={faBars}
                                        size="sm"
                                      />
                                    </CButton>
                                  </CCol>
                                </CRow>
                              </CCol>
                            </CFormGroup>
                          </CCol>
                        ) : (
                          <CCol xs="6" className="mb-3 align-items-center">
                            <CLabel
                              autoComplete={false}
                              value={personnel?.lieu}
                              className="font-weight-bold"
                              htmlFor="lieu"
                            >
                              Lieu du Stage
                            </CLabel>
                            <CInput
                              required
                              name="lieu"
                              placeholder="Lieu du Stage"
                              onChange={(e) => handleInputChange(e)}
                            />
                          </CCol>
                        )}
                        <CCol xs="6" className="mb-3">
                          <CLabel
                            autoComplete={false}
                            value={personnel?.objet}
                            className="font-weight-bold"
                            htmlFor="objet"
                          >
                            Objet du Stage
                          </CLabel>
                          <CInput
                            onChange={(e) => handleInputChange(e)}
                            name="objet"
                            placeholder="Objet du stage"
                          />
                        </CCol>

                        <CCol xs="6">
                          <CRow>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel
                                  className="font-weight-bold"
                                  htmlFor="dateDebut"
                                >
                                  Date de debut de mise en stage
                                </CLabel>
                                <CInput
                                  value={personnel?.dateDebut}
                                  required
                                  type="date"
                                  name="dateDebut"
                                  id="dateDebut"
                                  onChange={(e) => handleInputChange(e)}
                                />
                              </CFormGroup>
                            </CCol>
                            <CCol xs="6">
                              <CFormGroup>
                                <CLabel
                                  className="font-weight-bold"
                                  htmlFor="dateFin"
                                >
                                  Date de fin de mise en stage
                                </CLabel>
                                <CInput
                                  value={personnel?.dateFin}
                                  required
                                  type="date"
                                  name="dateFin"
                                  id="dateFin"
                                  onChange={(e) => handleInputChange(e)}
                                />
                              </CFormGroup>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CCol xs="6" className="mb-3 align-items-center">
                          <CLabel
                            className="font-weight-bold"
                            htmlFor="diplome"
                          >
                            Diplome attendu a la fin de stage
                          </CLabel>
                          <CInput
                            value={personnel?.diplome}
                            required
                            name="diplome"
                            placeholder="Diplome attendu"
                            onChange={(e) => handleInputChange(e)}
                          />
                        </CCol>
                      </CRow>
                    </>
                  )}
                </CFormGroup>
              </CCardBody>
              <CCardFooter className="d-flex justify-content-between">
                <CButton onClick={clearInput} size="md" color="danger">
                  Vider les champs
                </CButton>
                {mutation.isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <CButton
                    onClick={() => mutation.mutate(personnel)}
                    size="md"
                    color="success"
                  >
                    Mettre le personnel en stage
                  </CButton>
                )}
              </CCardFooter>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ structureState }) => ({
  structures: structureState.structures,
});

export default connect(mapStateToProps, { fetchStructures })(AjouterStage);
