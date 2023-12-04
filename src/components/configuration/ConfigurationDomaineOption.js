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
import { faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteDomaine,
  fetchDomaineEtude,
} from "../../actions/domaineOptionActions";
import ConfirmDelete from "../../common/ConfirmDelete";
import DomaineEtudeModal from "../../common/DomaineEtudeModal";
import { fieldsDomaineEtude } from "../../utils/dataTables";

const ConfigurationDomaineOption = (props) => {
  const { domaines, fetchDomaineEtude } = props;
  const [modal, setModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [idDomaine, setIdDomaine] = useState(null);

  const mutation = useMutation((id) => props.deleteDomaine(id), {
    onSuccess: (response) => {
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setTimeout(() => {
          mutation.reset();
        }, 2000);
      }
    },
  });

  const toggle = () => {
    setModal(!modal);
  };

  const toggleModalDetele = (idDomaine) => {
    setdeleteModal(!deleteModal);
    setIdDomaine(idDomaine);
  };

  useEffect(() => {
    setTimeout(() => {
      if (domaines.length === 0) {
        fetchDomaineEtude();
      }
    }, 500);
  }, []);

  const onValidated = (isValidated) => {
    if (isValidated) {
      mutation.mutate(idDomaine);
    }
  };

  return (
    <>
      <DomaineEtudeModal
        type="domaine"
        title="Ajoute un nouveau domaine d'etude"
        modal={modal}
        toggle={toggle}
      />
      <ConfirmDelete
        message="supprimer le domaine d'etude "
        onValidated={onValidated}
        modal={deleteModal}
        toggle={toggleModalDetele}
      />

      <CRow>
        <CCol xl="12" lg="12">
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-end mb-2">
                <CButton onClick={toggle} color="info">
                  <FontAwesomeIcon className="mr-2" icon={faPlus} />
                  Ajouter un domaine
                </CButton>
              </div>
              <hr />
              <div>
                <h4>Toutes les domaines d'études:</h4>
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                fields={fieldsDomaineEtude}
                itemsPerPage={50}
                pagination
                items={domaines}
                itemsPerPageSelect
                hover
                sorter
                tableFilter
                columnFilter
                clickableRows
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  total: (item) => <td>{item?.optionEtudes.length}</td>,
                  Voir: ({ idDomaineEtude }, index) => {
                    return (
                      <td className="py-2">
                        <div className="d-flex justify-content-between">
                          <CTooltip content="Afficher les  informations du domaine d'etude">
                            <CButton
                              to={`domaines_options/${idDomaineEtude}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </CButton>
                          </CTooltip>

                          <CTooltip content="Supprimer le domaine ?">
                            <CButton
                              onClick={() => toggleModalDetele(idDomaineEtude)}
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

const mapStateToProps = ({ domaineOptionEtudeState }) => ({
  domaines: domaineOptionEtudeState.domaineEtudes,
});

export default connect(mapStateToProps, {
  fetchDomaineEtude,
  deleteDomaine,
})(ConfigurationDomaineOption);
