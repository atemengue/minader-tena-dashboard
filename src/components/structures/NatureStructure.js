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
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchNatureStructures,
  fetchStructureByNature,
} from "../../actions/structureActions";
import { fieldsStructure } from "../../utils/dataTables";

const NatureStructure = (props) => {
  const [natureStructure, setNatureStructure] = useState(11);

  useEffect(() => {
    setTimeout(() => {
      if (props.structures === null) {
        props.fetchStructureByNature(natureStructure);
      }

      if (props.natureStructures.length === 0) {
        props.fetchNatureStructures();
      }
    }, 500);
  }, [props.fetchNatureStructures, props.fetchStructureByNature]);

  const onChangeNature = (nature) => {
    // utiliser le hook du settimeout DAN ADRAMOV
    setTimeout(() => {
      setNatureStructure(nature);
      props.fetchStructureByNature(nature);
    }, 500);
  };

  return (
    <>
      <CRow>
        <CCol xl="12" lg="12">
          {props.natureStructures.length === 0 ? (
            <div className="spinner-border spinner-border-xl" role="stastus">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CCard>
              <CCardHeader className="d-flex justify-content-between">
                <h4>
                  {props.structures
                    ? `${props.structures.libelleNatureStructure}: ${props.structures.structures.length}`
                    : ""}
                </h4>
                <CFormGroup>
                  <CCol className="d-flex justify-content-center align-items-center">
                    <h5 className="mr-3 mt-2" htmlFor="selectSm">
                      Recherche:
                    </h5>
                    <CSelect
                      default={11}
                      onChange={(event) => onChangeNature(event.target.value)}
                      custom
                      size="xl"
                      name="selectSm"
                      id="SelectLm"
                    >
                      {props.natureStructures.length !== 0
                        ? props.natureStructures.map((type, index) => {
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
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  fields={fieldsStructure}
                  itemsPerPage={10}
                  items={props.structures ? props.structures.structures : []}
                  pagination
                  itemsPerPageSelect
                  hover
                  loading={props.isLoadingStructureByNature}
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
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            to={`/structures/${item.idStructure}`}
                          >
                            Voir
                          </CButton>
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
  isLoadingByNature: structureState.isLoadingByNature,
  isLoadingStructureByNature: structureState.isLoadingStructureByNature,
  natureStructures: structureState.natureStructures,
  structures: structureState.structuresByNature,
});

export default connect(mapStateToProps, {
  fetchNatureStructures,
  fetchStructureByNature,
})(NatureStructure);
