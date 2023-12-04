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
  CLabel,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllLocations } from "../../actions/locationActions";
import {
  createStructure,
  fetchNatureStructures,
  fetchStructures,
  fetchTypeStructures,
} from "../../actions/structureActions";
import { CREATE_STRUCTURE_SUCCESS } from "../../actions/types";
import ListLocation from "../../common/ListLocation";
import ListStructureModal from "../../common/ListStructureModal";

const CreateStructure = (props) => {
  const {
    fetchAllLocations,
    fetchNatureStructures,
    structures,
    fetchStructures,
    locations,
    natureStructures,
    fetchTypeStructures,
    typeStructures,
  } = props;

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState(1);

  const [hierachie, setHierachie] = useState(0);
  const [structure, setStructure] = useState(null);
  const [structureValue, setStructureValue] = useState(null);
  const [modalLocation, setModalLocation] = useState(false);

  const dispatch = useDispatch();

  const toggle = (type) => {
    setModal(!modal);
    setHierachie(type);
  };

  const toggleLocation = (type) => {
    setModalLocation(!modalLocation);
    setTypeModal(type);
  };

  useEffect(() => {
    if (!structures) {
      fetchAllLocations();
      fetchStructures();
    }
    if (natureStructures.length === 0) {
      fetchNatureStructures();
    }

    if (typeStructures.length === 0) {
      fetchTypeStructures();
    }
  }, []);

  const onCreatedStructure = useMutation((data) => createStructure(data), {
    onSuccess: (response) => {
      dispatch({
        type: CREATE_STRUCTURE_SUCCESS,
        payload: response.data,
      });
      toast.success("Structure ajoutée");
      clearInput();
      props.history.goBack();
    },
    onError: (error) => {
      toast.error("Erreur sur le serveur");
    },
  });

  const clearInput = () => {
    setStructure({
      designationAdministrative: "",
      telephoneSecretariat: "",
      abbreviation: "",
      idStructureRattachement: "",
      hierachie1: "",
      hierachie2: "",
      hierachie3: "",
      hierachie4: "",
      arrondissementIdArrondissement: "",
      departementIdDepartement: "",
      regionIdRegion: "",
      natureStructureIdNatureStructure: "",
      typeStructureIdTypeStructure: "",
    });
    setStructureValue(null);
    setHierachie(0);
  };

  const save = (event) => {
    event.preventDefault();
    onCreatedStructure.mutate(structure);
  };

  const setNewLocation = (location, type) => {
    switch (type) {
      case 1:
        setStructure({
          ...structure,
          departementIdDepartement: location.idDepartement,
        });
        setStructureValue({
          ...structureValue,
          departement: location.libelleDepartement,
        });
        break;
      case 2:
        setStructure({
          ...structure,
          arrondissementIdArrondissement: location.idArrondissement,
        });
        setStructureValue({
          ...structureValue,
          arrondissement: location.libelleArrondissement,
        });
        break;
      default:
        return 0;
    }
  };

  const setNewStructure = (data) => {
    switch (hierachie) {
      case 0:
        setStructure({
          ...structure,
          idStructureRattachement: data.idStructure,
        });
        setStructureValue({
          ...structureValue,
          rattachement: data.designationAdministrative,
        });
        break;
      case 1:
        setStructure({
          ...structure,
          hierachie1: data.idStructure,
        });
        setStructureValue({
          ...structureValue,
          hierachie1: data.designationAdministrative,
        });
        break;
      case 2:
        setStructure({
          ...structure,
          hierachie2: data.idStructure,
        });
        setStructureValue({
          ...structureValue,
          hierachie2: data.designationAdministrative,
        });
        break;
      case 3:
        setStructure({
          ...structure,
          hierachie3: data.idStructure,
        });
        setStructureValue({
          ...structureValue,
          hierachie3: data.designationAdministrative,
        });
        break;
      case 4:
        setStructure({
          ...structure,
          hierachie4: data.idStructure,
        });
        setStructureValue({
          ...structureValue,
          hierachie4: data.designationAdministrative,
        });
      default:
        console.log(structure);
        break;
    }
  };

  return (
    <>
      <ListStructureModal
        modal={modal}
        toggle={toggle}
        structures={structures?.data}
        setNewStructure={setNewStructure}
      />

      <ListLocation
        setNewLocation={setNewLocation}
        locations={locations}
        type={typeModal}
        modal={modalLocation}
        toggle={toggleLocation}
      />

      <CForm onSubmit={save}>
        <CCard>
          <CCardHeader>
            <h2>Créer Une Structure Administrative</h2>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CFormGroup row className="mt-4 mb-4">
                  <CCol sm="5">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="designationAdministrative"
                    >
                      Nom de la Structure:
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      value={structure?.designationAdministrative}
                      id="designationAdministrative"
                      placeholder="Exemple: Sécrétariat Général"
                      onChange={(data) =>
                        setStructure({
                          ...structure,
                          designationAdministrative: data.target.value,
                        })
                      }
                    />
                  </CCol>
                  <CCol sm="7">
                    <CLabel className="font-weight-bold" htmlFor="telephone">
                      Téléphone du sécrétariat:
                    </CLabel>
                    <CInput
                      value={structure?.telephoneSecretariat}
                      id="telephone"
                      type="text"
                      placeholder="Exemple: 690 00 00 00 / 670 00 00 00"
                      onChange={(data) =>
                        setStructure({
                          ...structure,
                          telephoneSecretariat: data.target.value,
                        })
                      }
                    />
                  </CCol>
                </CFormGroup>
                <hr />
                <CFormGroup row className="mt-4 mb-4">
                  <CCol sm="5">
                    <CLabel className="font-weight-bold" htmlFor="abbreviation">
                      Abbréviation de la structure:
                    </CLabel>
                    <CInput
                      value={structure?.abreviation}
                      required
                      type="text"
                      id="abbreviation"
                      placeholder="Exemple: DRH"
                      onChange={(data) =>
                        setStructure({
                          ...structure,
                          abbreviation: data.target.value,
                        })
                      }
                    />
                  </CCol>
                  <CCol sm="7">
                    <CLabel
                      text=""
                      className="font-weight-bold"
                      placeholder="structure de rattachement"
                      htmlFor="structureDeRattachement"
                    >
                      Structure de Rattachement:
                    </CLabel>
                    <CRow>
                      <CCol sm="10">
                        <CInput
                          value={structureValue?.idStructureRattachement}
                          id="structureDeRattachement"
                          placeholder="Exemple: Direction des Ressources Humaines"
                        />
                      </CCol>
                      <CCol sm="2">
                        <CTooltip content="Selectionner la structure de rattachement">
                          <CButton
                            size="md"
                            onClick={() => toggle(0)}
                            color="danger"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                </CFormGroup>
                <hr />

                <CFormGroup row className="mt-4 mb-4">
                  <CCol sm="6" className="mt-2 mb-2">
                    <CLabel htmlFor="niveau1" className="font-weight-bold">
                      Superieur Hiérarchique de Niveau 1:
                    </CLabel>
                    <CRow>
                      <CCol sm="9">
                        <CInput
                          value={structureValue?.hierachie1}
                          id="niveau1"
                          placeholder=""
                        />
                      </CCol>
                      <CCol sm="3">
                        <CTooltip content="Superieur hiérarchique de niveau 1">
                          <CButton
                            size="md"
                            onClick={() => toggle(1)}
                            color="primary"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm="6" className="mt-2 mb-2">
                    <CLabel htmlFor="niveau2" className="font-weight-bold">
                      Superieur Hiérarchique de Niveau 2:
                    </CLabel>
                    <CRow>
                      <CCol sm="9">
                        <CInput
                          value={structureValue?.hierachie2}
                          id="niveau2"
                          placeholder=""
                        />
                      </CCol>
                      <CCol sm="3">
                        <CTooltip content="Superieur hiérarchique de niveau 2">
                          <CButton
                            size="md"
                            onClick={() => toggle(2)}
                            color="primary"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm="6" className="mt-2 mb-2">
                    <CLabel htmlFor="niveau3" className="font-weight-bold">
                      Superieur Hiérarchique de Niveau 3:
                    </CLabel>
                    <CRow>
                      <CCol sm="9">
                        <CInput
                          value={structureValue?.hierachie3}
                          id="niveau3"
                          placeholder=""
                        />
                      </CCol>
                      <CCol sm="3">
                        <CTooltip content="Superieur hiérarchique niveau 3">
                          <CButton
                            size="md"
                            onClick={() => toggle(3)}
                            color="primary"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm="6" className="mt-2 mb-2">
                    <CLabel htmlFor="niveau4" className="font-weight-bold">
                      Superieur Hiérarchique de Niveau 4:
                    </CLabel>
                    <CRow>
                      <CCol sm="9">
                        <CInput
                          disabled
                          value={structureValue?.hierachie4}
                          id="niveau4"
                          placeholder=""
                        />
                      </CCol>
                      <CCol sm="3">
                        <CTooltip content="Superieur hiérarchique niveau 4">
                          <CButton
                            size="md"
                            onClick={() => toggle(4)}
                            color="primary"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                </CFormGroup>
                <hr />
                <CFormGroup row className="mt-4 mb-4">
                  <CCol sm="4">
                    <CLabel
                      htmlFor="arrondissement"
                      className="font-weight-bold"
                    >
                      Arrondissement:
                    </CLabel>
                    <CRow>
                      <CCol sm="9">
                        <CInput
                          required
                          value={structureValue?.arrondissement}
                          id="arrondissement"
                          placeholder="ex: Abong Mbang"
                        />
                      </CCol>
                      <CCol sm="3">
                        <CTooltip content="Choisir l'arrondissement">
                          <CButton
                            onClick={() => toggleLocation(2)}
                            size="md"
                            color="info"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm="4">
                    <CLabel htmlFor="departement" className="font-weight-bold">
                      Département:
                    </CLabel>
                    <CRow>
                      <CCol sm="9">
                        <CInput
                          value={structureValue?.departement}
                          id="departement"
                          required
                          placeholder="ex: Haut-Nyong"
                        />
                      </CCol>
                      <CCol sm="3">
                        <CTooltip content="Choisir le departement">
                          <CButton
                            onClick={() => toggleLocation(1)}
                            size="md"
                            color="info"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol sm="4">
                    <CLabel htmlFor="region" className="font-weight-bold">
                      Région:
                    </CLabel>
                    <CRow>
                      <CCol sm="9">
                        <CSelect
                          required
                          defaultValue={0}
                          name="selectRegion"
                          id="selectRegion"
                          onChange={(region) =>
                            setStructure({
                              ...structure,
                              regionIdRegion: region.target.value,
                            })
                          }
                        >
                          {locations.regions.map((region, index) => {
                            return (
                              <option key={index} value={region.idRegion}>
                                {region.libelleRegion}
                              </option>
                            );
                          })}
                        </CSelect>
                      </CCol>
                      <CCol sm="3">
                        <CTooltip content="Choisir la region">
                          <CButton size="md" color="info">
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CTooltip>
                      </CCol>
                    </CRow>
                  </CCol>
                </CFormGroup>
                <hr />
                <CFormGroup row className="mt-4 mb-4" className="my-0">
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel className="font-weight-bold" htmlFor="nature">
                        Nature de la Structure:
                      </CLabel>
                      <CRow>
                        <CCol sm="9">
                          <CSelect
                            required
                            onChange={(event) =>
                              setStructure({
                                ...structure,
                                natureStructureIdNatureStructure:
                                  event.target.value,
                              })
                            }
                            custom
                            size="xl"
                            name="selectSm"
                            id="SelectLm"
                          >
                            {natureStructures.length !== 0
                              ? natureStructures.map((type, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={type.idNatureStructure}
                                    >
                                      {type.libelleNatureStructure}
                                    </option>
                                  );
                                })
                              : null}
                          </CSelect>
                        </CCol>
                        <CCol sm="3">
                          <CTooltip content="Choisir la nature de la structure">
                            <CButton size="md" color="dark">
                              <FontAwesomeIcon icon={faBars} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CCol>
                      </CRow>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel
                        className="font-weight-bold"
                        htmlFor="typeDeStructure"
                      >
                        Type de la structure:
                      </CLabel>
                      <CRow>
                        <CCol sm="9">
                          <CSelect
                            required
                            onChange={(event) =>
                              setStructure({
                                ...structure,
                                typeStructureIdTypeStructure:
                                  event.target.value,
                              })
                            }
                            custom
                            size="xl"
                            name="selectSm"
                            id="SelectLm"
                          >
                            {typeStructures.length !== 0
                              ? typeStructures.map((type, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={type.idTypeStructure}
                                    >
                                      {type.libelleTypeStructure}
                                    </option>
                                  );
                                })
                              : null}
                          </CSelect>
                        </CCol>
                        <CCol sm="3">
                          <CTooltip content="Choisir la nature de la structure">
                            <CButton size="md" color="dark">
                              <FontAwesomeIcon icon={faBars} size="sm" />
                            </CButton>
                          </CTooltip>
                        </CCol>
                      </CRow>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-between">
            <CButton onClick={clearInput} size="md" color="danger">
              Vider les champs
            </CButton>
            {onCreatedStructure.isLoading ? (
              <div role="status" className="spinner-border spinner-border-sm">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <CButton type="submit" size="md" color="success">
                Enregistrer
              </CButton>
            )}
          </CCardFooter>
        </CCard>
      </CForm>
    </>
  );
};

const mapStateToProps = ({ structureState, locationState }) => ({
  structures: structureState.structures,
  typeStructures: structureState.typeStructures,
  natureStructures: structureState.natureStructures,
  locations: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
});

export default connect(mapStateToProps, {
  fetchNatureStructures,
  fetchAllLocations,
  fetchStructures,
  fetchTypeStructures,
})(CreateStructure);
