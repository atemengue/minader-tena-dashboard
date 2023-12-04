import CIcon from "@coreui/icons-react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CWidgetIcon,
} from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSocle } from "../../actions/soldeActions";
import SoclePDF from "./SoclePDF";

const fields = [
  "Numero",
  "Categorie",
  "Effectif_PAIE(Antillope)",
  "Effecti_RH",
];

const PersonnelSocle = (props) => {
  const { socle, fetchSocle, soldeNumber } = props;

  useEffect(() => {
    if (socle.length === 0) {
      fetchSocle();
    }
  }, [fetchSocle]);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="8">
          <CCard>
            <CCardHeader className="d-flex justify-content-between">
              <h4>Statistique Effectis par categorie</h4>
              <SoclePDF socle={socle} />
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={socle}
                fields={fields}
                itemsPerPage={5}
                scopedSlots={{
                  Numero: (item, index) => (
                    <td className="font-weight-bold">{++index}</td>
                  ),
                  Categorie: (item) => (
                    <td className="font-weight-bold">{item.categorie}</td>
                  ),
                  "Effectif_PAIE(Antillope)": (item) => (
                    <td className="font-weight-bold">{item.effectifPAIE}</td>
                  ),
                  Effecti_RH: (item) => (
                    <td className="font-weight-bold">{item.effectifRH}</td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" lg="4">
          <CCardGroup className="mb-4">
            <>
              <CCol xs="12">
                <CWidgetIcon
                  text="Personnel En Solde"
                  header={soldeNumber}
                  color="success"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>
              <CCol xs="12">
                <CWidgetIcon
                  text="PERSONNEL Ressources humaines"
                  header=""
                  color="warning"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>
            </>
          </CCardGroup>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ soldeState }) => ({
  socle: soldeState.socle,
  soldeNumber: soldeState.soldeNumber,
});

export default connect(mapStateToProps, { fetchSocle })(PersonnelSocle);
