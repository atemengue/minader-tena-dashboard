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
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { updateCategorie } from "../actions/configurationActions";

const CategorieModal = ({ modal, toggle, data, updateCategorie, ...props }) => {
  const { idCategorie, ageRetraite } = data;
  const [categorie, setCategorie] = useState({});

  useEffect(() => {
    setCategorie({
      idCategorie,
      ageRetraite,
    });
  }, [data]);

  const save = () => {
    updateCategorie(categorie).then(() => {
      toggle();
      toast.success("Modifications validées");
    });
  };

  return (
    <CModal size="lg" show={modal} onClose={toggle}>
      <CModalHeader closeButton>
        <h4>Modifier une categorie </h4>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel className="font-weight-bold" htmlFor="noms">
                      Identifiant Categorie:
                    </CLabel>
                    <CInput
                      value={categorie.idCategorie}
                      type="text"
                      size="md"
                      id="identifiant"
                      onChange={(data) =>
                        setCategorie({
                          ...categorie,
                          idCategorie: data.target.value,
                        })
                      }
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol className="offset-md-2" md="8">
                    <CLabel className="font-weight-bold" htmlFor="ageRetraite">
                      Age de retraite:
                    </CLabel>
                    <CInput
                      value={categorie.ageRetraite}
                      size="md"
                      type="number"
                      id="ageRetraite"
                      onChange={(data) =>
                        setCategorie({
                          ...categorie,
                          ageRetraite: data.target.value,
                        })
                      }
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
        <CButton size="md" color="danger">
          <FontAwesomeIcon icon={faTrash} /> Vider les champs
        </CButton>
        {props.isLoading ? (
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <CButton onClick={save} size="md" color="success">
            <FontAwesomeIcon icon={faUserPlus} size="xs" /> Enregistrer
          </CButton>
        )}
      </CModalFooter>
    </CModal>
  );
};

const mapStateToProps = ({ categorieState }) => ({
  isLoading: categorieState.isLoading,
});

const mapToDispatchProps = {
  updateCategorie,
};

export default connect(mapStateToProps, mapToDispatchProps)(CategorieModal);
