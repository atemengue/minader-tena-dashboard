import {
  CButton,
  CCard,
  CCardFooter,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import {
  faArrowLeft,
  faFolderOpen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { createProjet } from "../../actions/decisions";
import { fetchNatureActes } from "../../actions/natureActions";

const CreerDecision = (props) => {
  const [titre, setTitre] = useState("");
  const [typeProjet, setTypeProjet] = useState("");

  const { profile, naturesActes, fetchNatureActes } = props;

  useEffect(() => {
    if (naturesActes.length === 0) {
      fetchNatureActes();
    }
  }, [naturesActes]);

  const history = useHistory();

  const onSave = () => {
    createProjetMutation.mutate(
      {
        titreProjet: titre,
        natureActeIdNatureActe: typeProjet,
        userIdUser: profile.idUser,
        statut: true,
      },
      {
        onSuccess: (response) => {
          history.goBack();
          toast.success(`${titre} cree`);
        },
        onError: (response) => {
          toast.error("Erreur sur le serveur: Verifiez les champs");
        },
      }
    );
  };

  const createProjetMutation = useMutation((data) => createProjet(data));

  return (
    <CRow>
      <CCol col="2" sm="6" md="2" className="mb-3">
        <CButton onClick={() => history.goBack()} block size="sm" color="dark">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour
        </CButton>
      </CCol>

      <CCol xs="12" lg="12">
        <CCard className="p-3">
          <CFormGroup row className="d-flex align-items-center">
            <CCol md="3">
              <CLabel className="font-weight-bold" htmlFor="ti">
                <h6>Titre du Projet</h6>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                onChange={(value) => setTitre(value.target.value)}
                name="titre"
                id="titre"
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row className="d-flex align-items-center">
            <CCol md="3">
              <CLabel className="font-weight-bold" htmlFor="idDepartement">
                <h6>Type de Projet</h6>
              </CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CSelect onChange={(value) => setTypeProjet(value.target.value)}>
                {[
                  {
                    idNatureActe: 0,
                    libelleNatureActe: "Selectionner la nature",
                  },
                  ...naturesActes,
                ].map((nature, index) => {
                  return (
                    <option key={index} value={nature.idNatureActe}>
                      {nature.libelleNatureActe}
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CFormGroup>
          <CCardFooter>
            {createProjetMutation.isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <CButton onClick={onSave} size="md" color="success">
                <FontAwesomeIcon icon={faFolderOpen} size="md" /> Creer le
                Projet
              </CButton>
            )}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ userState, natureActeState }) => ({
  profile: userState.profile,
  naturesActes: natureActeState.naturesActes,
});

const mapDispatchToProps = {
  fetchNatureActes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreerDecision);
