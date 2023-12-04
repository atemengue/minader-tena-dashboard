import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchProjets } from "../../actions/decisions";
import { fieldsDecision } from "../../utils/dataTables";

export default function DecisionsList() {
  const [projetList, setProjetList] = useState([]);
  const { isLoading } = useQuery("fetchProjets", () => fetchProjets(), {
    onSuccess: (response) => {
      setProjetList(response.data);
    },
    onError: (error) => {
      console.log(error, "the error");
    },
  });

  return (
    <CRow>
      <CCol md="4" sm="12" className=" d-flex justify-content-between mb-3">
        <CButton to={"./decision/creer"} block size="xl" color="primary">
          Creer un projet
        </CButton>
      </CCol>

      <CCol xs="12" lg="12">
        <CCard>
          <CCardHeader>
            <h4>Listes des Projets</h4>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={projetList}
              fields={fieldsDecision}
              itemsPerPage={10}
              pagination
              hover
              sorter
              tableFilter
              loading={isLoading}
              columnFilter
              clickableRows
              itemsPerPageSelect
              striped
              bordered
              scopedSlots={{
                Numero: (item, index) => <td>{index}</td>,
                type: (item) => (
                  <td>
                    {
                      <CBadge color="warning">
                        {item.natureActe.libelleNatureActe}
                      </CBadge>
                    }
                  </td>
                ),
                statut: (item, index) =>
                  item.statut ? (
                    <CBadge color="success">En Cours de traitement</CBadge>
                  ) : (
                    <CBadge color="danger">Termine</CBadge>
                  ),
                auteur: (item) => <td>{item.user.noms}</td>,
                Voir: (item, index) => {
                  return (
                    <td className="py-2">
                      <CTooltip content="Voir le profil du personnel">
                        <CButton
                          to={`./decision/${item.idProjet}`}
                          color="info"
                          size="sm"
                        >
                          <FontAwesomeIcon className="mr-2" icon={faEye} />
                          Voir
                        </CButton>
                      </CTooltip>
                    </td>
                  );
                },
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
