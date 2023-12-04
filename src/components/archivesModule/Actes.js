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
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchActes, fetchNatureActes } from "../../actions/natureActions";
import { BUCKET_URL } from "../../config";
import { fieldsActe, getNatureActe } from "../../utils/dataTables";

export const Actes = (props) => {
  const { loader, fetchActes, actes, naturesActes, fetchNatureActes } = props;

  const [natureActe, setNatureActe] = useState(0);
  const [filterNatureActe, setFilterNatureActe] = useState(actes);

  useEffect(() => {
    if (actes.length === 0) {
      fetchActes();
    }

    if (naturesActes.length === 0) {
      fetchNatureActes();
    }

    setFilterNatureActe(actes);
  }, [naturesActes]);

  const onChangeNature = (nature) => {
    nature = parseInt(nature);
    setNatureActe(nature);
    if (nature === 0) {
      fetchNatureActes();
    } else {
      let naturesFilter = actes.filter(
        (item) => item.natureActeIdNatureActe === nature
      );
      setFilterNatureActe(naturesFilter);
    }
  };

  return (
    <CRow>
      <CCol md="12">
        <h1>Listes des Actes</h1>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <h4>
              {getNatureActe(natureActe)}: {filterNatureActe.length}
            </h4>
            <div>
              <CFormGroup row>
                <CCol className="d-flex justify-content-center align-items-center">
                  <h5 className="mr-3 mt-2" htmlFor="selectSm">
                    Filtre:
                  </h5>
                  <CSelect
                    value={natureActe}
                    onChange={(event) => onChangeNature(event.target.value)}
                    custom
                    size="xl"
                    name="selectSm"
                    id="SelectLm"
                  >
                    {naturesActes.length !== 0
                      ? [
                          {
                            idNatureActe: 0,
                            libelleNatureActe: "Toutes les Natures",
                          },
                          ...naturesActes,
                        ].map((nature, index) => {
                          return (
                            <option key={index} value={nature.idNatureActe}>
                              {nature.libelleNatureActe}
                            </option>
                          );
                        })
                      : []}
                  </CSelect>
                </CCol>
              </CFormGroup>
            </div>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={filterNatureActe}
              loading={loader}
              fields={fieldsActe}
              itemsPerPage={5}
              Nouveau
              itemsPerPageSelect
              pagination
              hover
              sorter
              header
              tableFilter
              columnFilter
              clickableRows
              striped
              bordered
              scopedSlots={{
                Numero: (item, index) => <td key={index}>{index}</td>,
                actions: (item, index) => {
                  return (
                    <td className="py-2">
                      <div className="d-flex justify-content-between">
                        <CTooltip
                          content={
                            item.nomActe
                              ? " Voir le document"
                              : "Document Non disponible"
                          }
                        >
                          <CButton
                            target="_blank"
                            href={`${BUCKET_URL}/documents/${item.nomActe}`}
                            disabled={item.nomActe ? false : true}
                            color={item.nomActe ? "success" : "danger"}
                            size="sm"
                          >
                            <FontAwesomeIcon
                              icon={item.nomActe ? faEye : faEyeSlash}
                            />
                          </CButton>
                        </CTooltip>

                        <CTooltip content="Modifier l'acte">
                          <CButton
                            to={{
                              pathname: `actes/${item.idActe}`,
                              state: { data: item },
                            }}
                            color="info"
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </CButton>
                        </CTooltip>
                      </div>
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
          <CCardFooter>
            <CCol xs="12" md="12" className="d-flex justify-content-between">
              <h4>Total des documents: {actes.length} </h4>
            </CCol>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ natureActeState }) => ({
  naturesActes: natureActeState.naturesActes,
  loader: natureActeState.loader,
  actes: natureActeState.actes,
});

export default connect(mapStateToProps, { fetchActes, fetchNatureActes })(
  Actes
);
