import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faArrowLeft,
  faEye,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  deleteOptionEtude,
  fetchDomaineDetails,
} from "../../actions/domaineOptionActions";
import ConfirmDelete from "../../common/ConfirmDelete";
import DomaineEtudeModal from "../../common/DomaineEtudeModal";
import { fieldsOptionEtude } from "../../utils/dataTables";

const DomaineOptionDetails = (props) => {
  const idDomaine = props.match.params.idDomaine;
  const [deleteModal, setdeleteModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [idOption, setIdOption] = useState(null);

  const { isLoading, data, isError, isSuccess } = useQuery(
    ["domaine", idDomaine],
    () => fetchDomaineDetails(idDomaine),
    {
      onError: (error) => {},
      onSuccess: (data) => {},
    }
  );

  const deleteOptionMutation = useMutation((id) => deleteOptionEtude(id), {
    onSuccess: (response) => {
      toast.success(response.data.message);
      setTimeout(() => {
        deleteOptionEtude.reset();
        clearInput();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const toggleModalDetele = (idOption) => {
    setdeleteModal(!deleteModal);
    setIdOption(idOption);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const onValidated = (isValidated) => {
    if (isValidated) {
      deleteOptionMutation.mutate(idOption);
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-border spinner-border-xl" role="stastus">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <CRow>
        <CCol col="2" sm="6" md="2" className="mb-3">
          <CButton
            onClick={() => props.history.goBack()}
            block
            size="sm"
            color="dark"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </CButton>
        </CCol>
        <CCol xs="12">
          <div
            className="alert alert-danger alert-dismissible fade show p-5"
            role="alert"
          >
            <CButton
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </CButton>
            <strong>ERREUR SERVEUR:</strong> Veuillez ressayer
          </div>
        </CCol>
      </CRow>
    );
  }

  return (
    <>
      <DomaineEtudeModal
        type="option"
        title="Ajouter une nouvelle option"
        modal={modal}
        toggle={toggle}
        idDomaine={idDomaine}
      />

      <ConfirmDelete
        message="supprimer l'option d'etude "
        onValidated={onValidated}
        modal={deleteModal}
        toggle={toggleModalDetele}
      />

      <CRow>
        <CCol col="2" sm="6" md="2" className="mb-3">
          <CButton
            onClick={() => props.history.goBack()}
            block
            size="sm"
            color="dark"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </CButton>
        </CCol>
        <CCol xl="12" lg="12">
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-end mb-2">
                <CButton onClick={toggle} color="info">
                  <FontAwesomeIcon className="mr-2" icon={faPlus} />
                  Ajouter un Option au domaine
                </CButton>
              </div>
              <hr />
              <div>
                <h4>
                  {data.data.data.libelleDomaineEtude}:{" "}
                  {data.data.data.optionEtudes.length}
                </h4>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                itemsPerPage={10}
                pagination
                items={data.data.data.optionEtudes}
                itemsPerPageSelect
                hover
                fields={fieldsOptionEtude}
                sorter
                tableFilter
                columnFilter
                clickableRows
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  Voir: ({ idOptionEtude }, index) => {
                    return (
                      <td className="py-2">
                        <div className="d-flex justify-content-between">
                          <CTooltip content="Afficher les  informations du domaine d'etude">
                            <CButton color="info" size="sm">
                              <FontAwesomeIcon icon={faEye} />
                            </CButton>
                          </CTooltip>

                          <CTooltip content="Supprimer le domaine ?">
                            <CButton
                              onClick={() => toggleModalDetele(idOptionEtude)}
                              color="danger"
                              size="sm"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </CButton>
                          </CTooltip>
                        </div>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
            <CCardFooter></CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default DomaineOptionDetails;
