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
import { fieldsModal, getBadge } from "../utils/dataTables";
import { fetchPersonnels } from "../actions/personnelActions";

const ListPersonnelModal = ({ setNewData, modal, toggle, data, ...props }) => {
  useEffect(() => {
    if (props.personnels.length === 0) {
      props.fetchPersonnels();
    }
  }, [props.fetchPersonnels]);

  const selectPersonnel = (data) => {
    setNewData(data);
    toggle();
  };
  return (
    <CModal size="xl" show={modal} onClose={toggle}>
      <CModalHeader closeButton>Liste du Personnel</CModalHeader>
      <CModalBody>
        <CDataTable
          items={props.personnels}
          fields={fieldsModal}
          itemsPerPage={10}
          pagination
          itemsPerPageSelect
          hover
          sorter
          tableFilter
          columnFilter
          clickableRows
          onRowClick={(data) => selectPersonnel(data)}
          striped
          bordered
          scopedSlots={{
            corps: (item) => (
              <td>
                <CBadge
                  color={getBadge(item.grade.statutAdministratifIdStatut)}
                >
                  {item.grade.statutAdministratif.libelleStatut}
                </CBadge>
              </td>
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
  );
};

const mapStateToProps = ({ personnelState }) => ({
  personnels: personnelState.personnels,
});

export default connect(mapStateToProps, { fetchPersonnels })(
  ListPersonnelModal
);
