import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CImg,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { BUCKET_URL } from "../../config";
import { fieldSimple, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import PersonnelModal from "./PersonnelModal";

const PersonnelListCollapse = ({ personnels, structure }) => {
  const [modal, setModal] = useState(false);

  const [personnelDetail, setPersonnelDetail] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  return (
    <>
      <PersonnelModal modal={modal} toggle={toggle} data={personnelDetail} />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="text-center">
              <h3>{structure}</h3>
              <h4>Total personnel: {personnels.length}</h4>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={personnels}
                fields={fieldSimple}
                itemsPerPage={10}
                itemsPerPageSelect
                pagination
                hover
                sorter
                onRowClick={(data) => onHandleModal(data)}
                header
                tableFilter
                columnFilter
                clickableRows
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  picture: (item, index) => (
                    <div
                      className="c-avatar d-flex justify-content-center
            align-items-center
            "
                    >
                      <CImg
                        src={
                          item?.photo
                            ? `${BUCKET_URL}/personnels/${item.personnelIdArchive}/${item.photo}`
                            : `${BUCKET_URL}/default/user.png`
                        }
                        alt="photo de profil"
                        className="c-avatar-img"
                      />
                    </div>
                  ),
                  poste: (item, index) => {
                    return <td key={index}>{item?.postes[0]?.libellePoste}</td>;
                  },
                  age: (item) => (
                    <td>
                      <CBadge color="primary">
                        {item.dateNaissance === null
                          ? ""
                          : calculateAge(item.dateNaissance)}
                      </CBadge>
                    </td>
                  ),
                  poste: (item, index) => {
                    return <td key={index}>{item?.postes[0]?.libellePoste}</td>;
                  },
                  position: (item) => (
                    <td>
                      {<CBadge color="warning">{item.position.libelle}</CBadge>}
                    </td>
                  ),
                  corps: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.grade.statutAdministratifIdStatut)}
                      >
                        {item.grade.statutAdministratif.libelleStatut}
                      </CBadge>
                    </td>
                  ),
                  structure: (item) => (
                    <td>{item.structure.designationAdministrative}</td>
                  ),
                  categorie: (item) => (
                    <td>{item.grade?.categorieIdCategorie}</td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                        >
                          Voir
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default PersonnelListCollapse;
