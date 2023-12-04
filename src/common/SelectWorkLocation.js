import {
  CBadge,
  CCol,
  CFormGroup,
  CFormText,
  CInputCheckbox,
  CLabel,
  CSelect,
} from "@coreui/react";
import React from "react";

const SelectWorkLocation = ({
  idLocation,
  handleWorkLocation,
  regions,
  departements,
  arrondissements,
  checkedServiceDeconcentres,
  handleServiceDeconcentres,
  origine,
}) => {
  return (
    <CCol md="12">
      <div className="p-3">
        <CFormGroup row className="d-flex align-items-center">
          <CCol md="3">
            <CLabel className="font-weight-bold" htmlFor="idRegion">
              {origine ? (
                <CBadge color="info">
                  <h6>Region d'Origine</h6>
                </CBadge>
              ) : (
                <CBadge color="warning">
                  <h6>Region de Travail</h6>
                </CBadge>
              )}
            </CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CSelect
              value={idLocation?.idRegion}
              name="idRegion"
              id="idRegion"
              onChange={handleWorkLocation}
            >
              {regions.length !== 0
                ? [
                    {
                      idRegion: -1,
                      libelleRegion: "Toutes les regions",
                    },
                    ...regions,
                  ].map((region, index) => {
                    return (
                      <option key={index} value={region.idRegion}>
                        {region.libelleRegion}
                      </option>
                    );
                  })
                : null}
            </CSelect>
          </CCol>
        </CFormGroup>

        <CFormGroup row className="d-flex align-items-center">
          <CCol md="3">
            <CLabel className="font-weight-bold" htmlFor="idDepartement">
              {origine ? (
                <CBadge color="info">
                  <h6>Departement d'Origine</h6>
                </CBadge>
              ) : (
                <CBadge color="warning">
                  <h6>Departement de Travail</h6>
                </CBadge>
              )}
            </CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CSelect
              value={idLocation?.idDepartement}
              name="idDepartement"
              id="idDepartement"
              onChange={handleWorkLocation}
            >
              {departements.length !== 0
                ? [
                    {
                      idDepartement: -2,
                      libelleDepartement: "Tout les departements",
                    },
                    ...departements,
                  ].map((value, index) => {
                    return (
                      <option key={index} value={value.idDepartement}>
                        {value.libelleDepartement}
                      </option>
                    );
                  })
                : null}
            </CSelect>
          </CCol>
        </CFormGroup>
        <CFormGroup row className="d-flex align-items-center">
          <CCol md="3">
            <CLabel className="font-weight-bold" htmlFor="idArrondissement">
              {" "}
              {origine ? (
                <CBadge color="info">
                  <h6>Arrondissement d'Origine</h6>
                </CBadge>
              ) : (
                <CBadge color="warning">
                  <h6>Arrondissement de Travail</h6>
                </CBadge>
              )}
            </CLabel>
          </CCol>
          <CCol xs="12" md="9">
            <CSelect
              value={idLocation.idArrondissement}
              name="idArrondissement"
              id="idArrondissement"
              onChange={handleWorkLocation}
            >
              {arrondissements.length !== 0
                ? [
                    {
                      idArrondissement: -3, // bad code
                      libelleArrondissement: "Tout les arrondissements",
                    },
                    ...arrondissements,
                  ].map((value, index) => {
                    return (
                      <option key={index} value={value.idArrondissement}>
                        {value.libelleArrondissement}
                      </option>
                    );
                  })
                : null}
            </CSelect>
          </CCol>
        </CFormGroup>
        <CFormGroup row>
          <CCol md="6">
            <CFormGroup variant="custom-checkbox">
              <CInputCheckbox
                onChange={handleServiceDeconcentres}
                id="deconcentres"
                name="deconcentres"
                custom
              />
              <CLabel
                className="font-weight-bold"
                variant="custom-checkbox"
                htmlFor="deconcentres"
              >
                Service Deconcentré
              </CLabel>
            </CFormGroup>
          </CCol>
          <CCol xs="12" md="8"></CCol>
        </CFormGroup>
      </div>
    </CCol>
  );
};

export default SelectWorkLocation;
