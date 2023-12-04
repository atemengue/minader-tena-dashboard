import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import { faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchNatureStructures,
  fetchStructures,
} from "../../actions/structureActions";
import { fieldsStructure, getNatureStructure } from "../../utils/dataTables";

const StructuresList = (props) => {
  const {
    structures,
    fetchNatureStructures,
    fetchStructures,
    natureStructures,
  } = props;

  const [natureStructure, setNatureStructure] = useState(null);
  const [filterStructures, setFilterStructures] = useState(
    structures ? structures.data : []
  );

  useEffect(() => {
    setTimeout(() => {
      if (structures === null) {
        fetchStructures();
      } else {
        setFilterStructures(structures.data);
      }
      if (natureStructures.length === 0) {
        fetchNatureStructures();
      }
    }, 500);
  }, [structures, natureStructures, fetchNatureStructures]);

  const onChangeNature = (nature) => {
    nature = parseInt(nature);
    setNatureStructure(nature);
    if (nature === -1) {
      setFilterStructures(structures.data);
    } else {
      let naturesFilter = structures.data.filter(
        (item) => item.natureStructureIdNatureStructure === nature
      );
      setFilterStructures(naturesFilter);
    }
  };
  return (
    <>
      <CRow>
        <CCol xl="12" lg="12">
          {!structures ? (
            <div className="spinner-border spinner-border-xl" role="stastus">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-end mb-2">
                  <CButton to="structures/creer" color="info">
                    <FontAwesomeIcon className="mr-2" icon={faPlus} />
                    Ajouter une structure
                  </CButton>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h4>
                    {getNatureStructure(natureStructure)}:{" "}
                    {filterStructures.length}
                  </h4>
                  <CFormGroup>
                    <CCol className="d-flex justify-content-center align-items-center">
                      <h5 className="mr-3 mt-2" htmlFor="selectSm">
                        Recherche:
                      </h5>
                      <CSelect
                        onChange={(event) => onChangeNature(event.target.value)}
                        custom
                        size="xl"
                        name="selectSm"
                        id="SelectLm"
                      >
                        {natureStructures.length !== 0
                          ? [
                              {
                                idNatureStructure: -1,
                                libelleNatureStructure: "Toutes les Natures",
                              },
                              ...natureStructures,
                            ].map((type, index) => {
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
                  </CFormGroup>
                </div>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  fields={fieldsStructure}
                  itemsPerPage={10}
                  items={filterStructures}
                  pagination
                  itemsPerPageSelect
                  hover
                  sorter
                  tableFilter
                  columnFilter
                  clickableRows
                  bordered
                  scopedSlots={{
                    Numero: (item, index) => <td>{index}</td>,
                    Voir: (item, index) => {
                      return (
                        <td className="py-2">
                          <div className="d-flex justify-content-between">
                            <CTooltip content="Afficher les  informations de la structure">
                              <CButton
                                to={`/configurations/${item.idStructure}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </CButton>
                            </CTooltip>

                            <CTooltip content="Supprimer la structure ?">
                              <CButton color="danger" size="sm">
                                <FontAwesomeIcon icon={faTrash} />
                              </CButton>
                            </CTooltip>
                          </div>
                        </td>
                      );
                    },
                  }}
                />
              </CCardBody>
              <CCardFooter></CCardFooter>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ structureState }) => ({
  structures: structureState.structures,
  natureStructures: structureState.natureStructures,
});

export default connect(mapStateToProps, {
  fetchStructures,
  fetchNatureStructures,
})(StructuresList);
