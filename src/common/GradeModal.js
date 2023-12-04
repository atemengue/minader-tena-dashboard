import {
  CButton,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
import { fieldsGrade } from "../utils/dataTables";

const GradeModal = ({ setNewGrade, modal, toggle, grades, type }) => {
  const selectGrade = (data) => {
    setNewGrade(data, type);
    toggle();
  };

  return (
    <>
      <CModal size="lg" show={modal} onClose={toggle}>
        <CModalHeader closeButton>Liste des Grades</CModalHeader>
        <CModalBody>
          <CDataTable
            fields={fieldsGrade}
            items={grades}
            itemsPerPage={10}
            pagination
            itemsPerPageSelect
            hover
            sorter
            tableFilter
            columnFilter
            clickableRows
            onRowClick={(data) => selectGrade(data)}
            striped
            bordered
            scopedSlots={{
              Numero: (item, index) => <td key={index}>{index}</td>,
              libelleGrade: (item, index) => (
                <td key={index}>{item.libelleGrade}</td>
              ),
              categorieIdCategorie: (item, index) => (
                <td key={index}>{item.categorieIdCategorie}</td>
              ),
            }}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggle}>
            Fermer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default GradeModal;
