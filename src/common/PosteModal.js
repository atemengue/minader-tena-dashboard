import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import React from "react";
import { isEmpty } from "../utils/functions";
import DetailPoste from "./DetailPoste";

const PosteModal = ({ modal, toggle, poste }) => {
  return !isEmpty(poste) ? (
    <CModal color="info" size="xl" show={modal} onClose={toggle}>
      <CModalHeader closeButton>{poste.libellePoste}</CModalHeader>
      <CModalBody>
        <DetailPoste poste={poste} />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={toggle}>
          Fermer
        </CButton>
        <CButton color="info">Modifier le Poste</CButton>
      </CModalFooter>
    </CModal>
  ) : null;
};

export default PosteModal;
