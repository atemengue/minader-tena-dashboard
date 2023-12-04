import {
  CAlert,
  CBadge,
  CCol,
  CCollapse,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CRow
} from "@coreui/react";
import React, { useState } from "react";

const CollapseFied = ({ collapse, name = "" }) => {

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
                    value="Date de Naissance"
                    id={`${name}dateNaissance`}
                    name={`${name}dateNaissance`}
                  />
                  <CLabel
                    htmlFor={`${name}dateNaissance`}
                    variant="custom-checkbox"
                  >
                    Date de Naissance
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Lieu de Naissance"
                    id={`${name}lieuNaissance`}
                    name={`${name}lieuNaissance`}
                  />
                  <CLabel
                    htmlFor={`${name}lieuNaissance`}
                    variant="custom-checkbox"
                  >
                    Lieu de Naissance
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Date de Recrutement"
                    id={`${name}dateRecrutement`}
                    name={`${name}dateRecrutement`}
                  />
                  <CLabel
                    htmlFor={`${name}dateRecrutement`}
                    variant="custom-checkbox"
                  >
                    Date de Recrutement
                  </CLabel>
                </CFormGroup>
              </CCol>
              {/* <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Age"
                    id="age"
                    name="age"
                  />
                  <CLabel htmlFor="age" variant="custom-checkbox">
                    Age
                  </CLabel>
                </CFormGroup>
              </CCol> */}
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Date de Retraite"
                    id={`${name}dateRetraite`}
                    name={`${name}dateRetraite`}
                  />
                  <CLabel
                    htmlFor={`${name}dateRetraite`}
                    variant="custom-checkbox"
                  >
                    Date de Retraite
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Position"
                    id={`${name}position`}
                    name={`${name}position`}
                  />
                  <CLabel htmlFor={`${name}position`} variant="custom-checkbox">
                    Position
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
                    value="Categorie"
                    id={`${name}categorie`}
                    name={`${name}categorie`}
                  />
                  <CLabel
                    htmlFor={`${name}categorie`}
                    variant="custom-checkbox"
                  >
                    Categorie
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Structure"
                    id={`${name}structure`}
                    name={`${name}structure`}
                  />
                  <CLabel
                    htmlFor={`${name}structure`}
                    variant="custom-checkbox"
                  >
                    Structure
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Poste"
                    id={`${name}poste`}
                    name={`${name}poste`}
                  />
                  <CLabel htmlFor={`${name}poste`} variant="custom-checkbox">
                    Poste
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Telephones"
                    id={`${name}telephones`}
                    name={`${name}telephones`}
                  />
                  <CLabel
                    htmlFor={`${name}telephones`}
                    variant="custom-checkbox"
                  >
                    Telephones
                  </CLabel>
                </CFormGroup>
              </CCol>
              {/*
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Region"
                    id={`${name}region`}
                    name={`${name}region`}
                  />
                  <CLabel htmlFor="region" variant="custom-checkbox">
                    Region
                  </CLabel>
                </CFormGroup>
              </CCol>

              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Departement"
                    id={`${name}departement`}
                    name={`${name}departement`}
                  />
                  <CLabel htmlFor="departement" variant="custom-checkbox">
                    Departement
                  </CLabel>
                </CFormGroup>
              </CCol>
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Arrondissement"
                    id={`${name}arrondissement`}
                    name={`${name}arrondissement`}
                  />
                  <CLabel htmlFor="arrondissement" variant="custom-checkbox">
                    Arrondissement
                  </CLabel>
                </CFormGroup> */}
              {/* </CCol> */}

              {/* <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Statut Administratif"
                    id="statutAdministratif"
                    name="statutAdministratif"
                  />
                  <CLabel
                    htmlFor="statutAdministratif"
                    variant="custom-checkbox"
                  >
                    Statut Administratif
                  </CLabel>
                </CFormGroup> */}
              {/* </CCol>
              <CCol md="2" className="mt-2 mb-2">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    onChange={onCheckedField}
                    custom
                    value="Statut Solde"
                    name="statutSolde"
                    id="statutSolde"
                  />
                  <CLabel htmlFor="statutSolde" variant="custom-checkbox">
                    Statut Solde
                  </CLabel>
                </CFormGroup>
              </CCol> */}
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
              <ExportPDFEXCEL
                personnels={personnels}
                fields={fieldPDF}
                title={docTitle}
                subtitle={docSubTitle}
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
export default CollapseFied;
