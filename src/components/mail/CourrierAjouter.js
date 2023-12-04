import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CHeader,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createMail } from "../../actions/mailActions";
import ListStructureModal from "../../common/ListStructureModal";
import { fetchStructures } from "../../actions/structureActions";

const CourrierAjouter = ({ structures, fetchStructures }) => {
  const [courrierState, setCourrierState] = useState({});
  const [modalStructure, setModalStructure] = useState(false);
  const [structureData, setstructureData] = useState({
    idStructure: 5000, // BAD CODE
    designationAdministrative: "Structure de traitement du dossier",
  });

  const setNewStructure = (structure) => {
    setstructureData(structure);
    setCourrierState({
      ...courrierState,
      structureIdStructure: structure.idStructure,
    });
  };

  const clearInput = () => {
    setCourrierState(null);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "natureCourrier":
        setCourrierState({
          ...courrierState,
          natureCourrierIdNatueCourrier: value,
        });

        break;
      case "registre":
        setCourrierState({
          ...courrierState,
          registre: value,
        });

        break;
      case "dateArrivee":
        setCourrierState({
          ...courrierState,
          dateArrivee: value,
        });
        break;
      case "dateCourrier":
        setCourrierState({
          ...courrierState,
          dateCourrier: value,
        });
        break;
      case "objetCourrier":
        setCourrierState({
          ...courrierState,
          objetCourrier: value,
        });
        break;
      default:
        break;
    }
  };

  const mutation = useMutation((courrier) => createMail(courrier), {
    onSuccess: (response) => {
      toast.success("Mail Envoyee");
      setTimeout(() => {
        mutation.reset();
        clearInput();
      }, 2000);
    },
    onError: (error) => {
      console.log(error); // HANDLE ERRero
    },
  });

  const toggle = () => {
    setModalStructure(!modalStructure);
  };

  useEffect(() => {
    fetchStructures();
  }, []);

  return (
    <>
      <ListStructureModal
        structures={structures?.data}
        modal={modalStructure}
        toggle={toggle}
        setNewStructure={setNewStructure}
      />
      <CCard>
        <CCardBody>
          <CRow>
            {/* Courrier */}
            <CCol md="12">
              <CCard>
                <CCardHeader>
                  <h4>Courrier</h4>
                </CCardHeader>
                <CCardBody>
                  <div>
                    <div>
                      <CLabel className="font-weight-bold" htmlFor="noms">
                        Nature du Courrier
                      </CLabel>

                      <CSelect
                        onChange={(e) => handleInputChange(e)}
                        name="natureCourrier"
                      >
                        <option value="1">Personnel</option>
                        <option value="2">Administratif</option>
                      </CSelect>
                    </div>

                    <CLabel className="font-weight-bold" htmlFor="noms">
                      Numero Registre
                    </CLabel>
                    <CInput
                      type="text"
                      size="md"
                      id="registre"
                      name="registre"
                      onChange={(e) => handleInputChange(e)}
                      placeholder="Numero du registre"
                    />
                  </div>
                </CCardBody>
              </CCard>
            </CCol>

            {/* HORODATAGE */}
            {/* {console.log("courrier data", courrierState)} */}

            <CCol md="12">
              <CCard>
                <CCardHeader>
                  <h4>Horodatage</h4>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol md="6">
                      <CLabel className="font-weight-bold" htmlFor="traitement">
                        Arrive Le:
                      </CLabel>

                      <CInput
                        type="date"
                        id="date"
                        name="dateArrivee"
                        onChange={(e) => handleInputChange(e)}
                        placeholder="dd-mm-yyyy"
                      />
                    </CCol>
                    <CCol md="6">
                      <CLabel className="font-weight-bold" htmlFor="traitement">
                        Du:
                      </CLabel>
                      <CInput
                        onChange={(e) => handleInputChange(e)}
                        type="date"
                        id="date"
                        name="dateCourrier"
                        placeholder="dd-mm-yyyy"
                      />
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>

            {/* CORRESPONDANT  */}

            <CCol md="12">
              <CCard>
                <CCardHeader>
                  <h4>Correspondant</h4>
                </CCardHeader>
                <CCardBody>
                  <CInput
                    type="text"
                    name="matricule"
                    placeholder="matricule du personnel"
                  />
                </CCardBody>
              </CCard>
            </CCol>

            {/* DETAILS  */}

            <CCol md="12">
              <CCard>
                <CCardHeader>
                  <h4>Details</h4>
                </CCardHeader>
                <CCardBody>
                  <CTextarea
                    onChange={(e) => handleInputChange(e)}
                    name="objetCourrier"
                    placeholder="objet du courrier"
                  ></CTextarea>
                </CCardBody>
              </CCard>
            </CCol>

            {/* TRAITEMENT  */}

            <CCol md="12">
              <CCard>
                <CCardHeader>
                  <h4>Traitement</h4>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>
                    <CCol>
                      <CLabel className="font-weight-bold" htmlFor="traitement">
                        Structure d'Affectation:
                      </CLabel>
                      <CRow>
                        <CCol sm="9">
                          <CInput
                            id="traitement"
                            placeholder="Selectionner la structure de traitement"
                            value={structureData.designationAdministrative}
                          />
                        </CCol>
                        <CCol sm="3">
                          <CButton onClick={toggle} size="md" color="danger">
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>

            {/* DIFFUSION  */}

            <CCol md="12">
              <CCard>
                <CCardHeader>
                  <h4>Diffusion</h4>
                </CCardHeader>
                <CCardBody>
                  <CSelect
                    onChange={(e) => handleInputChange(e)}
                    multiple
                    name="diffusion"
                  >
                    <option value="1">Liste des Structures</option>
                    <option value="2">SDP</option>
                    <option value="3">SDDRH</option>
                    <option value="3">SDDRH</option>
                    <option value="3">SDDRH</option>
                  </CSelect>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter className="d-flex justify-content-between">
          <CButton onClick={clearInput} size="md" color="danger">
            Vider les champs
          </CButton>
          {mutation.isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CButton
              onClick={() => mutation.mutate(courrierState)}
              size="md"
              color="success"
            >
              Enregistrer et Envoyer le Courrier
            </CButton>
          )}
        </CCardFooter>
      </CCard>
    </>
  );
};
const mapStateToProps = ({ personnelState, structureState }) => ({
  structures: structureState.structures,
});

const mapDispatchToProps = {
  fetchStructures,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourrierAjouter);
