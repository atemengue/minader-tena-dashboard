import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPersonnel } from "../../actions/personnelActions";
import NotificationConge from "../printing/NotificationConge";

const CongePersonnel = (props) => {
  const matricule = props.match.params.matricule;
  const { person, history, fetchPersonnel } = props;
  const [conge, setConge] = useState({
    dateDebut: "",
    numeroActePartOne: "",
    numeroActePartTwo: "",
    dateDecision: "",
  });

  const clearInput = () => {
    setConge({
      dateDebut: null,
      numeroActePartOne: null,
      numeroActePartTwo: null,
      dateDecision: null,
    });
  };

  useEffect(() => {
    if (!person) {
      fetchPersonnel(matricule);
    }
  }, [matricule]);

  return person === null ? (
    <div className="spinner-border spinner-border-xl" role="stastus">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <CRow>
      <CCol col="2" sm="6" md="2" className="mb-3">
        <CButton onClick={() => history.goBack()} block size="sm" color="dark">
          <FontAwesomeIcon icon={faArrowLeft} />
          Retour
        </CButton>
      </CCol>
      <CCol xs="12" lg="12">
        <CCard>
          <CForm>
            <CCardHeader>
              <h4>DEMANDE DE CONGE</h4>
              <h5>
                {person.nomsPrenoms}: {person.matricule}
              </h5>
            </CCardHeader>
            <CCardBody>
              <CRow className="mb-3">
                <CCol md="3">
                  <CLabel className="font-weight-bold" htmlFor="dateDebut">
                    Date de début du congé:
                  </CLabel>
                  <CInput
                    required
                    type="date"
                    id="dateDebut"
                    name="dateDebut"
                    value={conge.dateDebut}
                    onChange={(date) =>
                      setConge({
                        ...conge,
                        dateDebut: date.target.value,
                      })
                    }
                  />
                </CCol>
                <CCol md="3">
                  <CLabel className="font-weight-bold" htmlFor="selectNumero">
                    Numero(N°):
                  </CLabel>
                  <CInput
                    name="selectNumero"
                    id="selectNumero"
                    value={conge.numeroActePartOne}
                    onChange={(numero) =>
                      setConge({
                        ...conge,
                        numeroActePartOne: numero.target.value,
                      })
                    }
                    required
                    placeholder="Numero de la decision"
                  />
                </CCol>
                <CCol md="3">
                  <CLabel className="font-weight-bold" htmlFor="selectPartTwo">
                    /
                  </CLabel>
                  <CInput
                    name="selectPartTwo"
                    id="selectPartTwo"
                    value={conge.numeroActePartTwo}
                    onChange={(numero) =>
                      setConge({
                        ...conge,
                        numeroActePartTwo: numero.target.value,
                      })
                    }
                    required
                  />
                </CCol>
                <CCol md="3">
                  <CLabel className="font-weight-bold" htmlFor="selectDu">
                    DU
                  </CLabel>
                  <CInput
                    id="selectDu"
                    value={conge.dateDecision}
                    onChange={(date) =>
                      setConge({
                        ...conge,
                        dateDecision: date.target.value,
                      })
                    }
                    required
                    type="date"
                  />
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter className="d-flex justify-content-between">
              <CButton size="md" color="danger">
                <FontAwesomeIcon icon={faTrash} size="md" /> Vider les champs
              </CButton>
              <NotificationConge conge={conge} personnel={person} />
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  person: personnelState.personnel,
});

export default connect(mapStateToProps, { fetchPersonnel })(CongePersonnel);
