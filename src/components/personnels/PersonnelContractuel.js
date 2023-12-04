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
import { fetchPersonnelsContractuels } from "../../actions/personnelActions";
import { connect } from "react-redux";
import WidgetsFilterRegion from "../../views/widgets/WidgetsFilterRegion";

// les objets et functions utiles
const fields = [
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

const PersonnelContractuel = (props) => {
  useEffect(() => {
    props.fetchPersonnelsContractuels();
  }, [props.fetchPersonnelsContractuels]);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            color="success"
            header={props.statutNumber}
            text="CONTRACTUELS EN ACTIVITE"
            footer="Liste du personnel contractuels a partir de l'annee 2020"
          />
        </CCol>
      </CRow>
      <CRow>
        <WidgetsFilterRegion />
        <CCol xs="12" sm="6" lg="62">
          <CCard>
            <CCardHeader>Filter Categorie</CCardHeader>
            <CCardBody>
              <CFormGroup row>
                <CCol md="4">
                  <CLabel htmlFor="selectSm">Categorie</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect custom size="sm" name="selectSm" id="SelectLm">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
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
            <CCardHeader>PERSONNEL CONTRACTUELS EN ACTIVITÉ</CCardHeader>
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

export default connect(mapStateToProps, { fetchPersonnelsContractuels })(
  PersonnelContractuel
);
