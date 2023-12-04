import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import {
  faTimesCircle,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  createDomaineEtude,
  createOptionEtude,
} from "../actions/domaineOptionActions";

const DomaineEtudeModal = ({
  modal,
  toggle,
  type,
  title,
  idDomaine,
  ...props
}) => {
  const [libelle, setLibelle] = useState(null);

  const createDomaineMutation = useMutation(
    (domaine) =>
      props.createDomaineEtude({
        libelleDomaineEtude: domaine,
      }),
    {
      onSuccess: (response) => {
        if (response.status === "error") {
          toast.error(response.message);
        } else {
          toast.success(response.message);
          setTimeout(() => {
            createDomaineMutation.reset();
            clearInput();
            toggle();
          }, 2000);
        }
      },
    }
  );

  const createOptionMutation = useMutation(
    (option) =>
      createOptionEtude({
        libelleOptionEtude: option.libelle,
        domaineEtudeIdDomaineEtude: option.id,
      }),
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        setTimeout(() => {
          createOptionMutation.reset();
          clearInput();
          toggle();
        }, 2000);
      },
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    }
  );

  const clearInput = () => {
    setLibelle(null);
  };

  return (
    <CModal size="lg" show={modal} onClose={toggle}>
      <CModalHeader closeButton>
        <h4>{title}</h4>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="libelle du domaine"
                    >
                      Entrer le libelle
                    </CLabel>
                    <CInput
                      value={libelle}
                      onChange={(libelle) => setLibelle(libelle.target.value)}
                      type="text"
                      id="libelle du domaine"
                      required
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-between">
        <CButton color="danger" color="secondary" onClick={toggle}>
          <FontAwesomeIcon icon={faTimesCircle} />
          Annuler
        </CButton>
        <CButton onClick={clearInput} size="md" color="danger">
          <FontAwesomeIcon icon={faTrash} /> Vider les champs
        </CButton>
        {false ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <CButton
            onClick={
              type === "domaine"
                ? () => createDomaineMutation.mutate(libelle)
                : () =>
                    createOptionMutation.mutate({
                      libelle: libelle,
                      id: parseInt(idDomaine),
                    })
            }
            size="md"
            color="success"
          >
            <FontAwesomeIcon icon={faUserPlus} size="sm" />
            creer
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  );
};

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, {
  createDomaineEtude,
})(DomaineEtudeModal);
