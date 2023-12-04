import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CNavLink,
  CRow,
  CWidgetProgress,
} from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPersonnelsActifs } from "../../actions/personnelActions";
import NavStatus from "../../containers/NavStatus";
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

const PersonnelAll = (props) => {
  useEffect(() => {
    props.fetchPersonnelsActifs();
  }, [props.fetchPersonnelsActifs]);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress
            color="success"
            text="EN ACTIVITÉ"
            header={props.statutNumber}
            footer="Liste du personnel en actvite a partir de l'annee 2020"
          />
        </CCol>
      </CRow>
      <NavStatus />
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>PERSONNEL MINADER EN ACTIVITÉ</CCardHeader>
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
                isLoading={false}
                striped
                bordered
                onRowClick={(data) => <CNavLink to={"DASDASD"} />}
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
                          to={`personnels/details/${item.matricule}`}
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

export default connect(mapStateToProps, { fetchPersonnelsActifs })(
  PersonnelAll
);
