import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { faArrowRight, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const TheLayoutMail = () => {
  return (
    <CRow>
      <CCol xs="12" md="6">
        <CCard>
          <CForm action="" method="post">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <h5>Tache non soldée</h5>
            </CCardHeader>
            <CCardBody></CCardBody>
          </CForm>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <div className="position-sticky">
          <CCard>
            <CCardHeader>
              <h5>Courrier Arrivée</h5>
            </CCardHeader>
            <CCardBody>
              <CDataTable sorter header tableFilter />
            </CCardBody>

            <CCardFooter className="d-flex justify-content-between">
              <CBadge size="md" color="warning">
                <h6>Total: </h6>
              </CBadge>
            </CCardFooter>
          </CCard>
        </div>
      </CCol>
    </CRow>
  );
};

export default TheLayoutMail;
