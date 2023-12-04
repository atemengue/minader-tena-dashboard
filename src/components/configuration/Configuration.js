import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CTextarea,
} from "@coreui/react";
import { faPallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Configuration() {
  return (
    <div>
      <h2>Configuration</h2>
      <CCard>
        <CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <CFormGroup row>
                  <CCol sm="6">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="nom_du_projet"
                    >
                      Nom du projet:
                    </CLabel>
                    <CInput
                      type="text"
                      size="md"
                      id="nom_du_projet"
                      placeholder="Nom de projet"
                    />
                  </CCol>
                  <CCol sm="6">
                    <CLabel className="font-weight-bold" htmlFor="url_projet">
                      URL du projet:
                    </CLabel>
                    <CInput
                      type="text"
                      size="md"
                      id="url_projet"
                      placeholder="https://example.com"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="6">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="projet_abbreviation"
                    >
                      Abbreviation:
                    </CLabel>
                    <CInput
                      type="text"
                      size="md"
                      id="projet_abbreviation"
                      placeholder="DRH"
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>

            <h3>
              <FontAwesomeIcon className="mr-2" icon={faPallet} />
              Branding
            </h3>
            <CRow>
              <CCol>
                <CFormGroup row>
                  <CCol sm="6">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="nom_du_projet"
                    >
                      Logo:
                    </CLabel>
                    <CInput
                      type="text"
                      size="md"
                      id="nom_du_projet"
                      placeholder="Nom de projet"
                    />
                  </CCol>
                  <CCol sm="6">
                    <CLabel className="font-weight-bold" htmlFor="url_projet">
                      Background Acceuil:
                    </CLabel>
                    <CInput
                      type="text"
                      size="md"
                      id="url_projet"
                      placeholder="https://example.com"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="6">
                    <CLabel className="font-weight-bold" htmlFor="url_projet">
                      Note Public
                    </CLabel>
                    <CTextarea
                      type="text"
                      size="md"
                      id="url_projet"
                      placeholder="laisse un commentaire ici"
                    />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
          </CCardBody>
        </CCardHeader>
      </CCard>
    </div>
  );
}

export default Configuration;
