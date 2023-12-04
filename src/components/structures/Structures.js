import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchStructureByType,
  fetchTypeStructures,
} from "../../actions/structureActions";
import { fieldsStructure } from "../../utils/dataTables";

const Structures = (props) => {
  const [typeStructure, setTypeStructure] = useState(6);

  const {
    fetchStructureByType,
    fetchTypeStructures,
    data,
    typeStructures,
    isLoadingByType,
  } = props;

  useEffect(() => {
    // const unsubscribe = props.history.addListener("focus", () => {
    if (data === null) {
      fetchStructureByType(typeStructure);
    }

    if (typeStructures.length === 0) {
      fetchTypeStructures();
    }
    // return unsubscribe;
    // });
  }, [data, typeStructures, fetchTypeStructures, fetchStructureByType]);

  const onChangeType = (type) => {
    // utiliser le hook du settimeout DAN ADRAMOV
    setTimeout(() => {
      setTypeStructure(type);
      fetchStructureByType(type);
    }, 200);
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          {data === null ? (
            <div className="spinner-border spinner-border-xl" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol>
                    <h4>
                      {data
                        ? `${data.libelleTypeStructure}: ${data.structures.length}`
                        : ""}
                    </h4>
                  </CCol>
                  <CCol>
                    <CFormGroup>
                      <CCol className="d-flex justify-content-center align-items-center">
                        <h5 className="mr-3 mt-2" htmlFor="selectSm">
                          Recherche:
                        </h5>
                        <CSelect
                          onChange={(event) => onChangeType(event.target.value)}
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
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  fields={fieldsStructure}
                  itemsPerPage={10}
                  items={data ? data.structures : []}
                  pagination
                  itemsPerPageSelect
                  hover
                  loading={isLoadingByType}
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
                          <CTooltip content="Voir les détails">
                            <CButton
                              color="info"
                              to={`/structures/${item.idStructure}`}
                              size="sm"
                            >
                              <FontAwesomeIcon className="mr-2" icon={faEye} />
                              Voir les details
                            </CButton>
                          </CTooltip>
                        </td>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ structureState }) => ({
  isLoading: structureState.isLoading,
  isLoadingByType: structureState.isLoadingByType,
  total: structureState.total,
  typeStructures: structureState.typeStructures,
  data: structureState.data, // renomer le state
});

export default connect(mapStateToProps, {
  fetchTypeStructures,
  fetchStructureByType,
})(Structures);
