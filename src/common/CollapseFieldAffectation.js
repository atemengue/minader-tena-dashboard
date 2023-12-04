import {
  CAlert,
  CBadge,
  CCol,
  CCollapse,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import ExportDecisionAffectationPDF from "./ExportDecisionAffectationPDF";

const CollapseFieldAffectation = ({ collapse, personnels, name = "" }) => {
  const [fieldPDF, setFieldPDF] = useState([]);
  const [docTitle, setDoctitle] = useState("");
  const [docSubTitle, setSubDoctitle] = useState("");

  const onCheckedField = (event) => {
    let checked = event.target.checked;
    let field = event.target.value;
    let position = null;
    let list = [...fieldPDF];

    if (checked) {
      setFieldPDF([...fieldPDF, field]);
    } else {
      position = fieldPDF.indexOf(field);
      list.splice(position, 1);
      setFieldPDF(list);
    }
  };

  return (
    <CCol md="12">
      <div className="mt-2">
        <CCollapse show={collapse}>
          <CAlert color="dark">
            <CRow>
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Matricule"
                    id={`${name}Matricule`}
                    name={`${name}Matricule`}
                  />
                  <CLabel
                    htmlFor={`${name}Matricule`}
                    variant="custom-checkbox"
                  >
                    Matricule
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Noms & Prenoms"
                    id={`${name}nomsPrenoms`}
                    name={`${name}nomsPrenoms`}
                  />
                  <CLabel
                    htmlFor={`${name}nomsPrenoms`}
                    variant="custom-checkbox"
                  >
                    Noms & Prenoms
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Grade"
                    id={`${name}grade`}
                    name={`${name}grade`}
                  />
                  <CLabel htmlFor={`${name}grade`} variant="custom-checkbox">
                    Grade
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Motif"
                    id={`${name}motif`}
                    name={`${name}motif`}
                  />
                  <CLabel htmlFor={`${name}motif`} variant="custom-checkbox">
                    Motif
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Ancien poste d'affectation"
                    id={`${name}ancien`}
                    name={`${name}ancien`}
                  />
                  <CLabel htmlFor={`${name}ancien`} variant="custom-checkbox">
                    Ancien poste d'affection
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Nouveau poste d'affectation"
                    id={`${name}nouveau`}
                    name={`${name}nouveau`}
                  />
                  <CLabel htmlFor={`${name}nouveau`} variant="custom-checkbox">
                    Nouveau poste d'affection
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CRow>
          </CAlert>

          <CRow>
            <CCol md="5">
              <CInput
                className="mb-2"
                width="200"
                value={docTitle}
                onChange={(value) => setDoctitle(value.target.value)}
                type="text"
                id="doctitle"
                placeholder="Entrez le titre du document"
              />
            </CCol>
            <CCol md="4">
              <CInput
                width="200"
                value={docSubTitle}
                onChange={(value) => setSubDoctitle(value.target.value)}
                type="text"
                id="subdoctitle"
                placeholder="Entrez le sous titre du document"
              />
            </CCol>
            <CCol md="3">
              <ExportDecisionAffectationPDF
                personnels={personnels}
                fields={fieldPDF}
              />
            </CCol>
          </CRow>
          <CCol>
            <div className="mt-2">
              <hr />
              <CRow>
                {fieldPDF.length >= 1 &&
                  fieldPDF.map((field, index) => {
                    return (
                      <CCol key={index} className="mt-2" md="2">
                        <CBadge
                          key={index}
                          style={{ fontSize: 14 }}
                          className="text-center p-2"
                          color="info"
                          shape="pill"
                        >
                          {field}
                        </CBadge>
                      </CCol>
                    );
                  })}
              </CRow>
            </div>
          </CCol>
        </CCollapse>
      </div>
    </CCol>
  );
};
export default CollapseFieldAffectation;
