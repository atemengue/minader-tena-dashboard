import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faTrashAlt,
  faUndo,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import ListSelectedPersonnelModal2 from "../../common/ListSelectedPersonnelModal2";
import Can from "../../RBAC/Can";
import { fieldsRapidExport, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";

const ImpressionRapide = (props) => {
  const { profile } = props;
  const [modalPersonnel, setModalPersonnel] = useState(false);
  const [modalListPersonnel, setModalListPersonnel] = useState(false);
  const [collapse, setCollapse] = useState(false);

  // array of data to move and current index state
  const [dataList, setDataList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [tableDataIndex, setTableDataIndex] = useState([]);

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  // toggle modal functions
  const toggleModalPersonnel = () => {
    setModalPersonnel(!modalPersonnel);
  };

  // set new Data state personnels, or postes
  const setNewData = (data) => {
    setTableDataIndex(data.tableIndex);
    setDataList(data.dataList);
  };

  const clearInput = () => {
    setCurrentIndex([]);
    setDataList([]);
    setDoctitle("");
    setSubDoctitle("");
  };

  // supprimer la ligne du mouvement
  const deletePersonnnel = (item) => {
    let list = [...dataList];

    let tabs = [...tableDataIndex];

    let position_item = tabs.indexOf(item.matricule);
    // OPTIMISER ICI
    let position =
      position_item === -1 ? tabs.indexOf(item.idPoste) : position_item;

    list.splice(position, 1);
    tabs.splice(position, 1);
    setTableDataIndex(tabs);
    setDataList(list);
  };

  return (
    <>
      <ListSelectedPersonnelModal2
        setNewPersonnel={setNewData}
        modal={modalPersonnel}
        toggle={toggleModalPersonnel}
      />

      <CRow>
        <CCol xs="12" lg="12">
          {false ? (
            <div className="spinner-border spinner-border-xl" role="stastus">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-between">
                  <h4>Impression Rapide du Personnel:{dataList.length}</h4>
                  <CButton onClick={toggleModalPersonnel} color="primary">
                    <FontAwesomeIcon className="mr-2" icon={faUserPlus} />
                    Selectionner les personnels
                  </CButton>

                  <Can
                    role={profile.roles[0]}
                    yes={() => (
                      <ExportButton
                        collapse={collapse}
                        toggleCollapse={toggleCollapse}
                      />
                    )}
                    no={() => ""}
                  />
                </div>

                <Can
                  role={profile.roles[0]}
                  yes={() => (
                    <CollapseFied collapse={collapse} personnels={dataList} />
                  )}
                  no={() => ""}
                />
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={dataList}
                  fields={fieldsRapidExport}
                  itemsPerPage={20}
                  pagination
                  hover
                  sorter
                  tableFilter
                  columnFilter
                  itemsPerPageSelect
                  striped
                  bordered
                  scopedSlots={{
                    Numero: (item, index) => <td>{index}</td>,
                    corps: (item) => (
                      <td>
                        <CBadge
                          color={getBadge(
                            item.grade.statutAdministratifIdStatut
                          )}
                        >
                          {item.grade.statutAdministratif.libelleStatut}
                        </CBadge>
                      </td>
                    ),

                    grade: (item) => (
                      <td>
                        <CBadge color="success">
                          {item.grade.libelleGrade}
                        </CBadge>
                      </td>
                    ),

                    age: (item) => {
                      return (
                        <td>
                          <CBadge color="primary">
                            {item.dateNaissance === null
                              ? ""
                              : calculateAge(item.dateNaissance)}
                          </CBadge>
                        </td>
                      );
                    },
                    position: (item, index) => {
                      return (
                        <td key={index}>
                          {
                            <CBadge color={getBadge(item.position.idPosition)}>
                              {item.position.libelle}
                            </CBadge>
                          }
                        </td>
                      );
                    },

                    categorie: (item) => <td>{item.categorieIdCategorie}</td>,
                    Voir: (item, index) => {
                      return (
                        <td className="py-2">
                          <CTooltip content="Rétirer le personnel de la liste?">
                            <CButton
                              onClick={() => deletePersonnnel(item)}
                              color="danger"
                              className="text-center ml-2"
                              size="sm"
                            >
                              <FontAwesomeIcon size="lg" icon={faTrashAlt} />
                            </CButton>
                          </CTooltip>
                        </td>
                      );
                    },
                  }}
                />
              </CCardBody>
              <CCardFooter className="d-flex justify-content-between">
                <CButton size="md" color="danger" onClick={() => clearInput()}>
                  <FontAwesomeIcon className="mr-2" icon={faUndo} />
                  Nettoyer les Champs
                </CButton>
                <CBadge size="md" color="warning">
                  <h6>Total: {dataList.length}</h6>
                </CBadge>
              </CCardFooter>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ personnelState, userState }) => ({
  isLoading: personnelState.isLoading,
  actifs: personnelState.personnelActifs,
  profile: userState.profile,
});

export default connect(mapStateToProps, {})(ImpressionRapide);
