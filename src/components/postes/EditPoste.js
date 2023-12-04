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
  CSelect,
} from "@coreui/react";
import {
  faArrowLeft,
  faBars,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { fetchPoste, updatePosteInformation } from "../../actions/posteActions";
import {
  fetchNaturePostes,
  fetchStructures,
} from "../../actions/structureActions";
import ListStructureModal from "../../common/ListStructureModal";

const EditPoste = (props) => {
  const idPoste = props.match.params.idPoste;
  const [data, setData] = useState(poste);
  const [modalStructure, setModalStructure] = useState(false);
  const [structureData, setstructureData] = useState({
    idStructure: null,
    designationAdministrative: null,
  });

  const setNewStructure = (structure) => {
    setstructureData(structure);
    setData({
      ...data,
      structureIdStructure: structure.idStructure,
      structure: {
        ...structure,
        designationAdministrative: structure.designationAdministrative,
      },
    });
  };

  const toggle = () => {
    setModalStructure(!modalStructure);
  };

  const {
    fetchStructures,
    fetchNaturePostes,
    updatePosteInformation,
    natureList,
    location,
    history,
    structures,
    poste,
  } = props;

  useEffect(() => {
    if (poste === null) {
      fetchPoste(idPoste);
    }
    if (structures === null) {
      fetchStructures();
    }
    if (natureList.length === 0) {
      fetchNaturePostes();
    }
    setData(poste);
  }, [idPoste, poste, setData, natureList, structures, fetchPoste]);

  const OnSave = () => {
    updatePosteInformation(idPoste, data).then(() => {
      history.goBack();
      toast.success("Mises des postes de responsables valides");
    });
  };

  const renderStructureModal = () => {
    if (structures) {
      return (
        <ListStructureModal
          structures={structures.data}
          modal={modalStructure}
          toggle={toggle}
          setNewStructure={setNewStructure}
        />
      );
    }
  };

  return (
    <>
      {renderStructureModal()}
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
      {data && (
        <CCard>
          <CCardHeader>
            <div>
              <span className="mr-3">{data.libellePoste}</span>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow className="p-5">
              <CCol sm="6">
                <div className="">
                  <div className="">
                    <CLabel className="font-weight-bold" htmlFor="poste">
                      <strong>Poste:</strong>
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      size="md"
                      id="poste"
                      placeholder="poste"
                      value={data.libellePoste}
                      onChange={(value) => {
                        setData({ ...data, libellePoste: value.target.value });
                      }}
                    />
                  </div>
                  <hr />

                  <div>
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="posabreviationte"
                    >
                      <strong>Abbreviation:</strong>
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      size="md"
                      id="abreviation"
                      placeholder="abreviation"
                      value={data.Abreviation}
                      onChange={(value) => {
                        setData({ ...data, Abreviation: value.target.value });
                      }}
                    />
                  </div>
                </div>
              </CCol>
              <CCol sm="6">
                <div className="">
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="selectNaturePoste"
                  >
                    Nature du Poste:
                  </CLabel>
                  <CSelect
                    custom
                    value={data.naturePosteIdNaturePoste}
                    name="selectNaturePoste"
                    id="selectNaturePoste"
                    onChange={(value) => {
                      setData({
                        ...data,
                        naturePosteIdNaturePoste: value.target.value,
                      });
                    }}
                  >
                    {natureList.map((naturePoste, index) => {
                      return (
                        <option key={index} value={naturePoste.idNaturePoste}>
                          {naturePoste.libelleNaturePoste}
                        </option>
                      );
                    })}
                  </CSelect>
                </div>
                <hr />

                <div>
                  <CFormGroup row>
                    <CCol>
                      <CLabel className="font-weight-bold" htmlFor="structure">
                        Structure:
                      </CLabel>
                      <CRow>
                        <CCol sm="10">
                          <CInput
                            id="structure"
                            placeholder="Selectionner la structure"
                            value={data.structure.designationAdministrative}
                          />
                        </CCol>
                        <CCol sm="2">
                          <CButton onClick={toggle} size="md" color="danger">
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CFormGroup>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-around">
            <CButton onClick={() => history.goBack()} size="md" color="primary">
              <FontAwesomeIcon icon={faArrowLeft} size="sm" /> Annuler
            </CButton>
            {/* {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : ( */}
            <CButton onClick={OnSave} size="md" color="success">
              <FontAwesomeIcon icon={faUserPlus} size="sm" /> Sauvegarder les
              modifications
            </CButton>
            {/* )} */}
          </CCardFooter>
        </CCard>
      )}
    </>
  );
};
const mapStateToProps = ({ posteState, structureState }) => ({
  poste: posteState.poste,
  structures: structureState.structures,
  natureList: posteState.natureList,
});

export default connect(mapStateToProps, {
  fetchStructures,
  fetchNaturePostes,
  fetchPoste,
  updatePosteInformation,
})(EditPoste);
