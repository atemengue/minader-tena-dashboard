import {
  CButton,
  CDataTable,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BUCKET_URL } from "../config";
import { fieldsActe } from "../utils/dataTables";
const ActeModal = ({ setNewActe, modal, toggle, actes }) => {
  const selectActe = (data) => {
    setNewActe(data);
    toggle();
  };
  return (
    <>
      <CModal size="xl" show={modal} onClose={toggle}>
        <CModalHeader closeButton>Selectionner un acte</CModalHeader>
        <CModalBody>
          <CDataTable
            items={actes}
            fields={fieldsActe}
            itemsPerPage={5}
            Nouveau
            itemsPerPageSelect
            pagination
            hover
            sorter
            header
            tableFilter
            columnFilter
            clickableRows
            striped
            onRowClick={(data) => selectActe(data)}
            bordered
            scopedSlots={{
              Numero: (item, index) => <td key={index}>{index}</td>,
              actions: (item, index) => {
                return (
                  <td className="py-2">
                    <CLink
                      disabled={item.nomActe ? true : false}
                      key={index}
                      target="_blank"
                      href={`${BUCKET_URL}/documents/${item.nomActe}`}
                    >
                      <CButton
                        color={item.nomActe ? "success" : "danger"}
                        size="sm"
                      >
                        <FontAwesomeIcon icon={faEye} />
                        {item.nomActe
                          ? " Voir le document"
                          : " Document Non disponible"}
                      </CButton>
                    </CLink>
                  </td>
                );
              },
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

export default ActeModal;
