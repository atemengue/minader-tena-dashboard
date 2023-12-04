import {
  CButton,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
import { fieldsStructureAffectation } from "../utils/dataTables";

const ListStructureModal = ({ setNewStructure, modal, toggle, structures }) => {
  const selectStructure = (data) => {
    setNewStructure(data);
    toggle();
  };

  return (
    <CModal size="xl" show={modal} onClose={toggle}>
      <CModalHeader closeButton>Liste des structures</CModalHeader>
      <CModalBody>
        <CDataTable
          items={structures ? structures : []}
          fields={fieldsStructureAffectation}
          itemsPerPage={10}
          pagination
          itemsPerPageSelect
          hover
          sorter
          tableFilter
          columnFilter
          clickableRows
          onRowClick={(data) => selectStructure(data)}
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

export default ListStructureModal;
