import CIcon from "@coreui/icons-react";
import {
  CCardGroup,
  CCol,
  CLink,
  CPopover,
  CRow,
  CWidgetIcon,
} from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStatusSolde } from "../../actions/soldeActions";

const WidgetSolde = (props) => {
  useEffect(() => {
    if (props.solde === null) {
      props.fetchStatusSolde();
    }
  });
  return (
    <CRow>
      <CCol>
        <CCardGroup className="mb-4">
          {props.solde === null ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <CCol xs="12" sm="6" lg="4">
                <CWidgetIcon
                  text="PERSONNEL EN ACTIVITE"
                  header={props.solde.actifs}
                  color="info"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>
              <CCol xs="12" sm="6" lg="4">
                <CWidgetIcon
                  text="Personnel en Solde"
                  header={props.solde.paye}
                  color="success"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>

              <CCol xs="12" sm="6" lg="4">
                <CWidgetIcon
                  text="PERSONNEL RH NON PAYE"
                  header={props.solde.nonPaye}
                  color="warning"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>
              <CCol xs="12" sm="6" lg="4">
                <CWidgetIcon
                  text="PERSONNEL RH NON PAYE AVEC MATRICULE"
                  header={props.solde.nonPaye_avec_matricule}
                  color="danger"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>
              <CCol xs="12" sm="6" lg="4">
                <CWidgetIcon
                  text="PERSONNEL RH NON PAYE ANCIEN MATRICULE (000000-X)"
                  header={props.solde?.nonPaye_ancien_matricule}
                  color="primary"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>
              <CCol xs="12" sm="6" lg="4">
                <CWidgetIcon
                  text="PERSONNEL RH NON PAYE NOUVEAU MATRICULE (X-000000)"
                  header={props.solde?.nonPaye_nouveau_matricule}
                  color="info"
                >
                  <CIcon width={24} name="cil-bell" />
                </CWidgetIcon>
              </CCol>
              <CCol xs="12" sm="6" lg="4">
                <CPopover
                  eader="Matricule d'integration"
                  text="PERSONNEL RH NON Paye NOUVEAU MATRICULE (X-000000)"
                  // content="Liste des personnels en cours d'integration, Faite une mise a jour des matricules"
                  placement="bottom"
                >
                  <CLink className="link-card mb-5" to="/solde/integration">
                    <CWidgetIcon
                      className="widgetRevision"
                      text="Personnel En cours d'integation"
                      header={props.solde.integration}
                      color="secondary"
                    >
                      <CIcon width={24} name="cil-bell" />
                    </CWidgetIcon>
                  </CLink>
                </CPopover>
              </CCol>
              {/* <CCol xs="12" sm="6" lg="3">
                <CPopover
                  header="Matricule d'integration"
                  text="PERSONNEL RH NON Paye NOUVEAU MATRICULE (X-000000)"
                  // content="Liste des personnels en cours d'integration, Faite une mise a jour des matricules"
                  placement="bottom"
                >
                  <CLink className="link-card mb-5" to="/solde/integration">
                    <CWidgetIcon
                      className="widgetRevision"
                      text="Personnel En cours d'integation"
                      header={props.solde.integration}
                      color="primary"
                    >
                      <CIcon width={24} name="cil-bell" />
                    </CWidgetIcon>
                  </CLink>
                </CPopover>
              </CCol> */}
            </>
          )}
        </CCardGroup>
      </CCol>
    </CRow>
  );
};
const mapStateToProps = ({ soldeState: { solde } }) => ({ solde });

export default connect(mapStateToProps, { fetchStatusSolde })(WidgetSolde);
