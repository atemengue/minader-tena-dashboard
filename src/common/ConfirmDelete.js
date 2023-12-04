import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ConfirmDelete = ({
  header,
  modal,
  toggle,
  onValidated,
  message,
  type,
}) => {
  const onSave = () => {
    onValidated(true);
    toggle();
  };
  return (
    <CModal
      className="modal-dialog modal-dialog-centered"
      show={modal}
      onClose={toggle}
      color={type === "delete" ? "danger" : "warning"}
    >
      <CModalHeader closeButton>{header}</CModalHeader>
      <CModalBody>
        <div className="text-center">
          <FontAwesomeIcon
            icon={type === "delete" ? faTrashAlt : faUserEdit}
            size="8x"
          />
          <h3>Voulez-vous {message} ?</h3>
        </div>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-between">
        <CButton
          color={type === "delete" ? "danger" : "warning"}
          onClick={onSave}
        >
          OUI
        </CButton>{" "}
        <CButton color="secondary" onClick={toggle}>
          NON
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ConfirmDelete;
