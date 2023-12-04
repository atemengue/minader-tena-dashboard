import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { connect } from "react-redux";
import {
  displayDateEntrerMinistere,
  displayDatePriseEffective,
  displayIdStructure,
  displayPositionAdministrative,
} from "../../../actions/personnelActions";

const Etape4 = (props) => {
  const { structure, newPersonnel } = props;
  const { structureData } = newPersonnel;

  return (
    <CRow>
      <CCol className="offset-md-2" md="8" xs="12">
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <h4>Etape 4: Position Administrative</h4>
            <CTooltip content="Afficher les informations">
              <FontAwesomeIcon
                color=""
                cursor="pointer"
                icon={faEye}
                size="lg"
                onClick={props.toggle}
              />
            </CTooltip>
          </CCardHeader>
          <CCardBody>
            <CFormGroup row>
              <CCol>
                <CLabel
                  className="font-weight-bold"
                  htmlFor="structureAffectation"
                >
                  Structure d'Affectation:
                </CLabel>
                <CRow>
                  <CCol sm="9">
                    <CInput
                      id="structureAffectation"
                      placeholder="Selectionner la structure"
                      value={structure.designationAdministrative}
                    />
                  </CCol>
                  <CCol sm="3">
                    <CButton onClick={props.toggle2} size="md" color="danger">
                      <FontAwesomeIcon icon={faBars} size="sm" />
                    </CButton>
                  </CCol>
                </CRow>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol>
                <CLabel
                  className="font-weight-bold"
                  htmlFor="positionAdministrative"
                >
                  Position Administrative:
                </CLabel>
                <CRow>
                  <CCol sm="9">
                    <CSelect
                      onChange={(position) =>
                        props.displayPositionAdministrative(
                          position.target.value
                        )
                      }
                    >
                      <option value="2">Cadre</option>
                      <option value="1">Responsable</option>
                      <option value="3">Employe de Bureau</option>
                      <option value="4">Chauffeur</option>
                      <option value="5">Secrétaire</option>
                      <option value="6">Agent d'entretien</option>
                      <option value="7">Gardien</option>
                    </CSelect>
                  </CCol>
                </CRow>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol>
                <CLabel
                  className="font-weight-bold"
                  htmlFor="dateEntreeMinistere"
                >
                  Date d'entree au ministère
                </CLabel>
                <CRow>
                  <CCol sm="9">
                    <CInput
                      onChange={(date) =>
                        props.displayDateEntrerMinistere(date.target.value)
                      }
                      type="date"
                      id="dateEntreeMinistere"
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol>
                <CLabel className="font-weight-bold" htmlFor="dateAffectation">
                  Date d'affectation
                </CLabel>
                <CRow>
                  <CCol sm="9">
                    <CInput
                      onChange={(date) =>
                        props.displayDatePriseEffective(date.target.value)
                      }
                      type="date"
                      id="dateAffectation"
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CFormGroup>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-between">
            <CButton onClick={props.previousStep} size="md" color="primary">
              <FontAwesomeIcon icon={faArrowLeft} size="md" /> Etape 3
            </CButton>
            <CButton size="md" color="danger">
              <FontAwesomeIcon icon={faTrash} size="md" /> Vider les champs
            </CButton>
            <CButton onClick={props.nextStep} size="md" color="success">
              Terminé <FontAwesomeIcon icon={faArrowRight} size="md" />
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  newPersonnel: personnelState.newPersonnel,
});

const mapDispatchToProps = {
  displayPositionAdministrative,
  displayIdStructure,
  displayDatePriseEffective,
  displayDateEntrerMinistere,
};

export default connect(mapStateToProps, mapDispatchToProps)(Etape4);
