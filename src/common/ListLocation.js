import {
  CButton,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
import {
  fieldsLocationArrondissement,
  fieldsLocationDepartement,
} from "../utils/dataTables";
const ListLocation = ({ setNewLocation, modal, toggle, locations, type }) => {
  const selectLocation = (data) => {
    setNewLocation(data, type);
    toggle();
  };

  const renderScope = (type) => {
    return {
      Numero: (item, index) => <td key={index}>{index}</td>,
      LibelleDepartement: (item, index) => (
        <td key={index}>
          {item[`libelle${type === 1 ? "Departement" : "Arrondissement"}`]}
        </td>
      ),
    };
  };

  return (
    <>
      <CModal size="lg" show={modal} onClose={toggle}>
        <CModalHeader closeButton>
          Liste des {type === 1 ? "Departement" : "Arrondissement"}{" "}
        </CModalHeader>
        <CModalBody>
          <CDataTable
            fields={
              type === 1
                ? fieldsLocationDepartement
                : fieldsLocationArrondissement
            }
            items={
              type === 1 ? locations.departements : locations.arrondissements
            }
            itemsPerPage={10}
            pagination
            itemsPerPageSelect
            hover
            sorter
            tableFilter
            columnFilter
            clickableRows
            onRowClick={(data) => selectLocation(data)}
            striped
            bordered
            scopedSlots={renderScope(type)}
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

export default ListLocation;
