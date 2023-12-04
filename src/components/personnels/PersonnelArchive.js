import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CLink,
  CRow,
} from "@coreui/react";
import {
  faArchive,
  faArrowLeft,
  faEye,
  faFileUpload,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  deletePersonnelDocument,
  fetchArchivesPersonnel,
  fetchPersonnelForArchive,
  uploadFiles,
} from "../../actions/personnelActions";
import { FETCH_PERSONNEL_SUCCESS } from "../../actions/personnelActions/types";
import { SET_ERROR } from "../../actions/types";
import ArchiveModal from "../../common/ArchiveModal";
import ConfirmDelete from "../../common/ConfirmDelete";
import { BUCKET_URL } from "../../config";

const PersonnelArchive = (props) => {
  const dispatch = useDispatch();

  const matricule = props.match.params.matricule;

  const {
    fetchArchivesPersonnel,
    deletePersonnelDocument,
    personnel,
    history,
    archives,
  } = props;

  useEffect(() => {
    fetchPersonnelForArchive(matricule)
      .then((response) => {
        const personnelIdArchive = response.data.personnelIdArchive;
        dispatch({ type: FETCH_PERSONNEL_SUCCESS, payload: response.data });
        fetchArchivesPersonnel(personnelIdArchive);
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: SET_ERROR });
      });
  }, [matricule]);

  const [modal, setModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");

  const toggle = () => {
    setModal(!modal);
    fetchArchivesPersonnel(personnel.personnelIdArchive);
  };

  const toggle2 = (item) => {
    setdeleteModal(!deleteModal);
    setDeleteItem(item);
  };

  const onValidated = (data) => {
    setDeleteItem(data);
    onDeleteDocument(deleteItem);
  };

  const onDeleteDocument = (item) => {
    if (deleteItem) {
      deletePersonnelDocument({ item, matricule }).then((_) => {
        toast.success("fichiers supprimés");
      });
    }
  };

  return (
    <>
      <ConfirmDelete
        message="le document"
        onValidated={onValidated}
        modal={deleteModal}
        toggle={toggle2}
      />
      <CRow>
        <ArchiveModal modal={modal} toggle={toggle} data={personnel} />
        <CCol col="2" sm="6" md="2" className="mb-3">
          <CButton
            onClick={() => history.goBack()}
            block
            size="sm"
            color="dark"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </CButton>
        </CCol>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader className="d-flex align-items-center justify-content-between">
              <div>
                <div>
                  <h5 className="mr-3">
                    {personnel ? personnel.nomsPrenoms : ""}:
                  </h5>
                </div>
                <div>
                  <span style={{ fontSize: 18, fontWeight: "bolder" }}>
                    {archives.length}
                  </span>{" "}
                  DOCUMENTS DANS LES ARCHIVES
                </div>
              </div>
              <CButton onClick={toggle} color="info">
                <FontAwesomeIcon icon={faFileUpload} className="mr-2" />
                Ajouter des documents
              </CButton>
            </CCardHeader>
            <CCardBody>
              {archives.length > 0 ? (
                <CDataTable
                  items={archives}
                  fields={[
                    {
                      key: "numero",
                      label: "N°",
                      filter: false,
                      _style: { width: "5%" },
                    },
                    {
                      key: "name",
                      _style: { width: "55%" },
                    },
                    {
                      key: "actions",
                      label: "",
                      sorter: false,
                      filter: false,
                      _style: { width: "40%" },
                    },
                  ]}
                  scopedSlots={{
                    numero: (_, index) => <td>{++index}</td>,
                    actions: (item, index) => {
                      return (
                        <td className="py-2">
                          <div className="d-flex justify-content-between">
                            <CLink
                              key={index}
                              target="_blank"
                              href={`${BUCKET_URL}/personnels/${personnel?.personnelIdArchive}/${item?.name}`}
                            >
                              <CButton color="primary" size="sm">
                                <FontAwesomeIcon icon={faEye} />
                                Voir le document
                              </CButton>
                            </CLink>
                            <CButton
                              onClick={(_) => toggle2(item)}
                              className="ml-2"
                              color="danger"
                              size="sm"
                            >
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                className="mr-2"
                              />
                              Supprimer le document
                            </CButton>
                          </div>
                        </td>
                      );
                    },
                  }}
                />
              ) : (
                <div className="text-center">
                  <FontAwesomeIcon icon={faArchive} size="9x" />
                  <h3>BOITE D'ARCHIVES VIDE. VEUILLEZ AJOUTER DES DOCUMENTS</h3>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  personnel: personnelState.personnel,
  archives: personnelState.archives,
});

export default connect(mapStateToProps, {
  uploadFiles,
  fetchArchivesPersonnel,
  deletePersonnelDocument,
})(PersonnelArchive);
