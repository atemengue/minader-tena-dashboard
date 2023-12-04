import {
  CButton,
  CCol,
  CDataTable,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import { fetchActesReactQuery } from "../actions/natureActions";
import { BUCKET_URL } from "../config";
import { fieldsActe, fieldsActeConges } from "../utils/dataTables";

const ActeListModal = ({ setNewActe, modal, toggle }) => {
  const selectActe = (data) => {
    setNewActe(data);
    toggle();
  };

  const { isLoading, isError } = useQuery(
    "listsActes",
    () => fetchActesReactQuery(),
    {
      onSuccess: (response) => {},
      onError: (response) => {},
    }
  );

  return (
    <>
      <CModal size="xl" show={modal} onClose={toggle}>
        <CModalHeader closeButton>Selectionner les actes</CModalHeader>
        <CModalBody>
          <CRow>
            <CCol md="6">
              <CDataTable
                items={actes}
                fields={fieldsActeConges}
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
            </CCol>
            <CCol md="6">
              <CDataTable
                items={actes}
                fields={fieldsActeConges}
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
            </CCol>
          </CRow>
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

export default ActeListModal;
