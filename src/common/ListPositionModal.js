import {
  CButton,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
import { fieldsListPosition } from "../utils/dataTables";

const ListPositionModal = ({ setNewPosition, modal, toggle, positions }) => {
  const selectPosition = (data) => {
    setNewPosition(data);
    toggle();
  };

  return (
    <CModal size="xl" show={modal} onClose={toggle}>
      <CModalHeader closeButton>Liste des positions</CModalHeader>
      <CModalBody>
        <CDataTable
          items={positions ? positions : []}
          fields={fieldsListPosition}
          itemsPerPage={10}
          pagination
          itemsPerPageSelect
          hover
          sorter
          tableFilter
          columnFilter
          clickableRows
          onRowClick={(data) => selectPosition(data)}
          striped
          bordered
          scopedSlots={{
            Numero: (item, index) => <td>{index}</td>,
          }}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          Fermer
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ListPositionModal;
