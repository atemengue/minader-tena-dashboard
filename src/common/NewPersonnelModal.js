import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
import NewPersonnel from "./NewPersonnel";

const NewPersonnelModal = ({
  modal,
  toggle,
  personnel,
  photo,
  location,
  structures,
  grades,
}) => {
  const { noms, prenoms } = personnel;
  const { photoUrl } = photo;

  return (
    <CModal color="info" size="xl" show={modal} onClose={toggle}>
      <CModalHeader closeButton>{`${noms} ${prenoms}`}</CModalHeader>
      <CModalBody>
        <NewPersonnel
          personnel={personnel}
          location={location}
          structures={structures}
          grades={grades}
          photoUrl={photoUrl}
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

export default NewPersonnelModal;
