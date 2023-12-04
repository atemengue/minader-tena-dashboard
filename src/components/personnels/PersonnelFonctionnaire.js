import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CBadge,
  CButton,
  CWidgetProgress,
  CFormGroup,
  CLabel,
  CSelect,
} from "@coreui/react";
import NavStatus from "../../containers/NavStatus";
import { fetchPersonnelsFonctionnaires } from "../../actions/personnelActions";
import { connect } from "react-redux";
import WidgetsFilterRegion from "../../views/widgets/WidgetsFilterRegion";

// les objets et functions utiles
const fields = [
  "Numero",
  "matricule",
  "noms",
  "prenoms",
  "dateNaissance",
  "lieuNaissance",
  "dateRetraite",
  "telephones",
  "corps",
  {
    key: "Voir",
    label: "",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];

const getBadge = (status) => {
  switch (status) {
    case 1:
      return "success";
    case 2:
      return "primary";
    case 3:
      return "warning";
    default:
      return "primary";
  }
};

const PersonnelFonctionnaire = (props) => {
  useEffect(() => {
    props.fetchPersonnelsFonctionnaires();
  }, [props.fetchPersonnelsFonctionnaires]);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            color="success"
            header={props.statutNumber}
            text="FONCTIONNAIRE EN ACTIVITE"
          />
        </CCol>
      </CRow>
      <CRow>
        <WidgetsFilterRegion />
        <CCol xs="12" sm="6" lg="2">
          <CCard>
            <CCardHeader>Filter Categorie</CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor="selectSm">Categorie</CLabel>
                </CCol>
                <CCol xs="12" md="12">
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
        <CCol xs="12" sm="6" lg="2">
          <CCard>
            <CCardHeader>Filter Corps</CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="selectSm">Corps</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom size="sm" name="selectSm" id="SelectLm">
                    <option value="0">Agronomie</option>
                    <option value="1">Informatique</option>
                    <option value="2">Nord</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" lg="2">
          <CCard>
            <CCardHeader>Filter Garde</CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="selectSm">Garde</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom size="sm" name="selectSm" id="SelectLm">
                    <option value="0">A2</option>
                    <option value="1">A1</option>
                    <option value="2">B2</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <NavStatus />
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>PERSONNEL FONCTIONNAIRES EN ACTIVITÉ</CCardHeader>
            <CCardBody>
              <CDataTable
                items={props.personnels}
                fields={fields}
                itemsPerPage={20}
                pagination
                hover
                sorter
                tableFilter
                itemsPerPageSelect
                itemsPerPage={5}
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  corps: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.grade.statutAdministratifIdStatut)}
                      >
                        {item.grade.statutAdministratif.libelleStatut}
                      </CBadge>
                    </td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          to={`details/${item.matricule}`}
                        >
                          Voir
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  isLoading: personnelState.isLoading,
  personnels: personnelState.personnels,
  statutNumber: personnelState.statutNumber,
});

export default connect(mapStateToProps, { fetchPersonnelsFonctionnaires })(
  PersonnelFonctionnaire
);
