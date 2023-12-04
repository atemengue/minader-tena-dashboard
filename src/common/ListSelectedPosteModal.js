import {
  CBadge,
  CButton,
  CCol,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import {
  faSave,
  faTrashAlt,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPostes } from "../actions/posteActions";
import {
  fieldsNominationModal,
  fieldsNominationModal2,
} from "../utils/dataTables";

const ListSelectedPosteModal = ({
  setNewPoste,
  modal,
  toggle,
  data,
  ...props
}) => {
  const [dataList, setDataList] = useState([]);
  const [tableIndex, setTableIndex] = useState([]);

  const handlePersonnelChange = (item) => {
    let list = [...dataList];
    let tabs = [...tableIndex];

    if (!tabs.includes(item.idPoste)) {
      let posteIndex = [...tabs, item.idPoste];
      let poste = {
        idPoste: item.idPoste,
        libellePoste: item.libellePoste,
        structure: item.libelleStructure,
        structureIdStructure: item.structure.idStructure,
        occupant: item.personnel ? item.personnel.nomsPrenoms : null,
        nouveau: "",
        matricule: "",
      };
      list = [...dataList, poste];
      setTableIndex(posteIndex);
      setDataList(list);
    } else {
      let position = tabs.indexOf(item.idPoste);
      list.splice(position, 1);
      tabs.splice(position, 1);
      setTableIndex(tabs);
      setDataList(list);
    }
  };

  const selectPoste = () => {
    setNewPoste({ dataList, tableIndex });
    toggle();
  };

  useEffect(() => {
    if (props.postes.length === 0) {
      props.fetchPostes();
    }
  }, [props.fetchPostes]);

  const closeModal = () => {
    toggle();
  };

  return (
    <CModal size="xl" show={modal} onClose={toggle}>
      <CModalHeader closeButton>Liste des Postes</CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md="6">
            <CDataTable
              items={props.postes}
              fields={fieldsNominationModal}
              itemsPerPage={10}
              pagination
              itemsPerPageSelect
              hover
              sorter
              tableFilter
              columnFilter
              clickableRows
              striped
              onRowClick={(item) => handlePersonnelChange(item)}
              bordered
              scopedSlots={{
                occupant: (item, index) => {
                  return item.occupant ? (
                    <td key={index}>{item.occupant}</td>
                  ) : (
                    <td key={index}>
                      {<CBadge color="danger">Poste vacant</CBadge>}
                    </td>
                  );
                },
              }}
            />
          </CCol>
          <CCol md="6">
            <CCol
              xs="12"
              md="12"
              className="d-flex justify-content-between"
            ></CCol>
            <CDataTable
              items={dataList}
              fields={fieldsNominationModal2}
              itemsPerPage={10}
              pagination
              itemsPerPageSelect
              hover
              sorter
              tableFilter
              columnFilter
              clickableRows
              striped
              bordered
              scopedSlots={{
                supprimer: (item, index) => {
                  return (
                    <td key={index}>
                      <CButton
                        onClick={() => handlePersonnelChange(item)}
                        size="sm"
                        shape="square"
                        color="danger"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                        supprimer
                      </CButton>
                    </td>
                  );
                },

                occupant: (item, index) => {
                  return item.occupant ? (
                    <td key={index}>{item.occupant}</td>
                  ) : (
                    <td key={index}>
                      {<CBadge color="danger">Poste vacant</CBadge>}
                    </td>
                  );
                },
              }}
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={closeModal}>
          <FontAwesomeIcon icon={faWindowClose} className="mr-2" />
          Fermer
        </CButton>
        <CButton onClick={selectPoste} color="info">
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Enregister
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const mapStateToProps = ({ posteState }) => ({
  postes: posteState.postes,
});

export default connect(mapStateToProps, { fetchPostes })(
  ListSelectedPosteModal
);
