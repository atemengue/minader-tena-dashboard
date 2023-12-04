import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPersonnels } from "../../actions/personnelActions";
import { fieldsArchive } from "../../utils/dataTables";

const ArchivePersonnel = (props) => {
  const [modal, setModal] = useState(false);
  const [personnelDetail, setPersonnelDetail] = useState("");
  const { personnels, fetchPersonnels, isLoading } = props;

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  useEffect(() => {
    if (personnels.length === 0) {
      fetchPersonnels();
    }
  }, [fetchPersonnels]);
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <h4>Archives des Ressources Humaines</h4>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={personnels}
                fields={fieldsArchive}
                itemsPerPage={10}
                pagination
                hover
                sorter
                tableFilter
                columnFilter
                clickableRows
                onRowClick={(data) => onHandleModal(data)}
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,

                  grade: (item) => (
                    <td>
                      <CBadge color="success">{item.grade.libelleGrade}</CBadge>
                    </td>
                  ),

                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          to={`archives/${item.matricule}/archives`}
                          color="danger"
                          size="sm"
                        >
                          <FontAwesomeIcon icon={faEye} />
                          Voir les archives
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

const mapStateToProps = ({ personnelState }) => ({
  isLoading: personnelState.isLoading,
  personnels: personnelState.personnels,
});

export default connect(mapStateToProps, { fetchPersonnels })(ArchivePersonnel);
