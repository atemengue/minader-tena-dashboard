import React, { useEffect } from "react";
import {
  CModal,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CButton,
  CCol,
  CDataTable,
  CRow,
  CBadge,
} from "@coreui/react";
import { connect } from "react-redux";
import { fieldsNaturePoste } from "../utils/dataTables";
import { fetchPersonnels } from "../actions/personnelActions";
import { fetchNaturePostes } from "../actions/structureActions";
const NaturePosteModal = ({
  setNewNature,
  natureModal,
  toggleNatureModal,
  data,
  ...props
}) => {
  useEffect(() => {
    if (props.natureList.length === 0) {
      props.fetchNaturePostes();
    }
  }, [props.fetchNaturePostes]);

  const selectNature = (data) => {
    setNewNature(data);
    toggleNatureModal();
  };
  return (
    <CModal size="lg" show={natureModal} onClose={toggleNatureModal}>
      <CModalHeader closeButton>Liste des Natures des Postes</CModalHeader>
      <CModalBody>
        <CDataTable
          items={props.natureList}
          fields={fieldsNaturePoste}
          itemsPerPage={10}
          pagination
          hover
          sorter
          tableFilter
          columnFilter
          clickableRows
          onRowClick={(data) => selectNature(data)}
          striped
          bordered
          scopedSlots={{
            Numero: (item, index) => <td>{index}</td>,
            libelleNaturePoste: (item, index) => (
              <td>{item.libelleNaturePoste}</td>
            ),
            RangDuPoste: (item, index) => (
              <td>{item.rangPoste.libelleRangPoste}</td>
            ),
          }}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggleNatureModal}>
          Fermer
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const mapStateToProps = ({ personnelState, structureState }) => ({
  personnels: personnelState.personnels,
  natureList: structureState.natureList,
});

export default connect(mapStateToProps, { fetchPersonnels, fetchNaturePostes })(
  NaturePosteModal
);
