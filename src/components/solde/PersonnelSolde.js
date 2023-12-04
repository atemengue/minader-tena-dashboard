import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSoldePersonnels } from "../../actions/soldeActions";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import Can from "../../RBAC/Can";
import { fieldsPosition, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import WidgetSolde from "../../views/widgets/WidgetSolde";

const PersonnelSolde = (props) => {
  const [statutSolde, setstatutSolde] = useState(1);
  const { personnels, fetchSoldePersonnels, isLoadingTwo, profile } = props;
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  useEffect(() => {
    if (personnels.length === 0) {
      fetchSoldePersonnels(statutSolde);
    }
  }, [fetchSoldePersonnels]);

  const onChangeStatut = (statutSolde) => {
    setstatutSolde(JSON.parse(statutSolde));
    props.fetchSoldePersonnels(statutSolde);
  };

  const getSoldeNumer = (number) => {
    switch (parseInt(number)) {
      case 1:
        return "PERSONNEL EN SOLDE CHAP 30";
      case 2:
        return "PERSONNEL RH NON PAYE";
      case 3:
        return "PERSONNEL RH NON PAYE AVEC MATRICULE";
      case 4:
        return "PERSONNEL RH NON PAYE ANCIEN MATRICULE (000000-X)";
      case 5:
        return "PERSONNEL RH NON PAYE NOUVEAU MATRICULE (X-000000)";
      case 6:
        return "PERSONNEL RH ENCOURS D'INTEGRATION(ECI)";
      default:
        return "PERSONNEL EN SOLDE CHAP 30";
    }
  };
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <WidgetSolde />
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <h4>
                  {getSoldeNumer(statutSolde)}: {props.soldeNumber}
                </h4>
                <CFormGroup row>
                  <CCol xs="12" md="8">
                    <CSelect
                      defaultValue={statutSolde}
                      custom
                      onChange={(event) => onChangeStatut(event.target.value)}
                      size="md"
                      name="selectSm"
                      id="SelectLm"
                    >
                      <option key="1" value={1}>
                        PERSONNEL EN SOLDE CHAP 30
                      </option>
                      <option key="2" value={2}>
                        PERSONNEL RH NON PAYE
                      </option>
                      <option key="3" value={3}>
                        PERSONNEL RH NON PAYE AVEC MATRICULE
                      </option>
                      <option key="4" value={4}>
                        PERSONNEL RH NON PAYE ANCIEN MATRICULE (000000-X)
                      </option>
                      <option key="5" value={5}>
                        PERSONNEL RH NON PAYE NOUVEAU MATRICULE (X-000000)
                      </option>
                      <option key="6" value={6}>
                        PERSONNEL RH ENCOURS D'INTEGRATION(ECI)
                      </option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <Can
                  role={profile.roles[0]}
                  yes={() => (
                    <ExportButton
                      collapse={collapse}
                      toggleCollapse={toggleCollapse}
                    />
                  )}
                  no={() => ""}
                />
              </div>
              <div>
                <CollapseFied collapse={collapse} personnels={personnels} />
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={personnels}
                fields={fieldsPosition}
                itemsPerPage={10}
                itemsPerPageSelect
                pagination
                hover
                sorter
                header
                loading={isLoadingTwo}
                tableFilter
                columnFilter
                clickableRows
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  position: (item) => (
                    <td>
                      {<CBadge color="warning">{item.position.libelle}</CBadge>}
                    </td>
                  ),
                  corps: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.grade.statutAdministratifIdStatut)}
                      >
                        {item.grade.statutAdministratif.libelleStatut}
                      </CBadge>
                    </td>
                  ),
                  age: (item) => {
                    return (
                      <td>
                        <CBadge color="primary">
                          {item.dateNaissance === null
                            ? ""
                            : calculateAge(item.dateNaissance)}
                        </CBadge>
                      </td>
                    );
                  },
                  categorie: (item) => <td>{item.categorieActuelle}</td>,
                  structure: (item) => (
                    <td>
                      {item.structure
                        ? item.structure.designationAdministrative
                        : "Vide"}
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
                          to={`/solde/details/${item.matricule}`}
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

const mapStateToProps = ({ soldeState, userState }) => ({
  isLoadingTwo: soldeState.isLoadingTwo,
  personnels: soldeState.personnels,
  soldeNumber: soldeState.soldeNumber,
  profile: userState.profile,
});

export default connect(mapStateToProps, {
  fetchSoldePersonnels,
})(PersonnelSolde);
