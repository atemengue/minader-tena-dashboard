import {
  CButton,
  CCol,
  CCollapse,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import React from "react";

function NewPersonnelInput({
  onAddNewPersonnel,
  onChangeInput,
  collapse,
  fields,
}) {
  return (
    <CCollapse show={collapse} navbar={true}>
      <CForm onSubmit={onAddNewPersonnel}>
        <CRow>
          <CCol md="12">
            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="matricule">
                  Matricule
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  value={fields.matricule}
                  onChange={onChangeInput}
                  id="matricule"
                  name="matricule"
                  placeholder="Matricule"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="nomsPrenoms">
                  Noms et Prénoms
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  value={fields.nomsPrenoms}
                  onChange={onChangeInput}
                  id="nomsPrenoms"
                  name="nomsPrenoms"
                  placeholder="Noms et Prénoms"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="dateRecrutement">
                  Date de Recrutement
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  value={fields.dateRecrutement}
                  onChange={onChangeInput}
                  type="date"
                  id="dateRecrutement"
                  name="dateRecrutement"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="grade">
                  Grade
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  value={fields.grade}
                  onChange={onChangeInput}
                  id="grade"
                  name="grade"
                  placeholder="Exemple :ITA "
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="categorie">
                  catégorie
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  value={fields.categorie}
                  onChange={onChangeInput}
                  id="categorie"
                  name="categorie"
                  placeholder="Exemple :A2 "
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="echelon">
                  Echelon
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  value={fields.echelon}
                  onChange={onChangeInput}
                  id="echelon"
                  name="echelon"
                  placeholder="Exemple :5 "
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="fonction">
                  Fonction
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  onChange={onChangeInput}
                  type="text"
                  value={fields.fonction}
                  id="fonction"
                  name="fonction"
                  placeholder="Exemple DRH/Directeur"
                />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="5">
                <CLabel className="font-weight-bold" htmlFor="lieudejouissance">
                  Lieu de Jouissance
                </CLabel>
              </CCol>
              <CCol xs="12" md="7">
                <CInput
                  required
                  value={fields.lieudejouissance}
                  onChange={onChangeInput}
                  type="text"
                  id="lieudejouissance"
                  name="lieudejouissance"
                />
              </CCol>
            </CFormGroup>
          </CCol>
          <CCol>
            <CButton type="submit" size="md" color="primary">
              Insérer le personnel
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </CCollapse>
  );
}

export default NewPersonnelInput;
