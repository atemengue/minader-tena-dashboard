import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CSelect,
  CFormGroup,
} from "@coreui/react";
const WidgetsFilterRegion = () => {
  return (
    <>
      <CCol xs="12" sm="6" lg="3">
        <CCard>
          <CCardHeader>Filter Region de Travail</CCardHeader>
          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectSm">Region</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom size="sm" name="selectSm" id="SelectLm">
                  <option value="0">Selectionner</option>
                  <option value="1">Centre</option>
                  <option value="2">Nord</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectSm">Depart</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom size="sm" name="selectSm" id="SelectLm">
                  <option value="0">Selectionner</option>
                  <option value="1">YAOUNDE</option>
                  <option value="2">BERTOUA</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectSm">Arrond</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom size="sm" name="selectSm" id="SelectLm">
                  <option value="0">Selectionner</option>
                  <option value="1">YAOUNDE</option>
                  <option value="2">BERTOUA</option>
                </CSelect>
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CCard>
          <CCardHeader>Filter Region d'Origine</CCardHeader>
          <CCardBody>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectSm">Region</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom size="sm" name="selectSm" id="SelectLm">
                  <option value="0">Selectionner</option>
                  <option value="1">Centre</option>
                  <option value="2">Nord</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectSm">Depart</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom size="sm" name="selectSm" id="SelectLm">
                  <option value="0">Selectionner</option>
                  <option value="1">Centre</option>
                  <option value="2">Nord</option>
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="selectSm">Arrond</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect custom size="sm" name="selectSm" id="SelectLm">
                  <option value="0">Selectionner</option>
                  <option value="1">Centre</option>
                  <option value="2">Nord</option>
                </CSelect>
              </CCol>
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default WidgetsFilterRegion;
