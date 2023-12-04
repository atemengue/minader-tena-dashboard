import {
  CBadge,
  CCard,
  CCardBody,
  CCardImg,
  CCol,
  CContainer,
  CLink,
  CRow,
  CWidgetSimple,
} from "@coreui/react";
import React from "react";
import { connect } from "react-redux";
import {
  fetchPersonnelNumber,
  fetchPersonnels,
} from "../actions/personnelActions";
import { fetchPositions, fetchStatusPostion } from "../actions/positionActions";

const FirstDash = (props) => {
  return (
    <CContainer className="text-center">
      <CRow className="mt-5">
        <CCol className="offset-md-1" xs="12" sm="6" md="3">
          <CLink className="link-card mb-5" to="/personnels">
            <CWidgetSimple className="widgetRevision">
              <CCard>
                <CCardBody>
                  <CCardImg variant="full" src="images/icons/user_group.svg" />
                </CCardBody>
              </CCard>
              <h5>Personnels Militaires</h5>
            </CWidgetSimple>
          </CLink>
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <CLink className="link-card mb-5" to="/developpement">
            <CWidgetSimple className="widgetRevision">
              <CCard>
                <CCardBody>
                  <CCardImg variant="full" src="images/icons/knowledge_.svg" />
                </CCardBody>
              </CCard>
              <h5>Formations et Stages</h5>
            </CWidgetSimple>
          </CLink>
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <CLink className="link-card mb-5" to="/statistiques">
            <CWidgetSimple className="widgetRevision">
              <CCard>
                <CCardBody>
                  <CCardImg
                    variant="full"
                    src="images/icons/data_analyzing_.svg"
                  />
                </CCardBody>
              </CCard>
              <h5>Statistiques du Personnels</h5>
            </CWidgetSimple>
          </CLink>
        </CCol>
      </CRow>
      <CRow>
        <CCol className="offset-md-1" xs="12" sm="6" md="3">
          <CLink className="link-card mb-5" to="/stations">
            <CWidgetSimple className="widgetRevision">
              <CCard>
                <CCardBody>
                  <CCardImg variant="full" src="images/icons/ceo.svg" />
                </CCardBody>
              </CCard>
              <h5>Region Militaires et Stations</h5>
            </CWidgetSimple>
          </CLink>
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <CLink className="link-card mb-5" to="/archives">
            <CWidgetSimple className="widgetRevision">
              <CCard>
                <CCardBody>
                  <CCardImg
                    variant="full"
                    src="images/icons/personal_data_.png"
                  />
                </CCardBody>
              </CCard>
              <h5>Archives des Ressources Humaines</h5>
            </CWidgetSimple>
          </CLink>
        </CCol>
        <CCol xs="12" sm="6" md="3">
          <CLink className="link-card mb-5" to="/archives">
            <CWidgetSimple className="widgetRevision">
              <CCard>
                <CCardBody>
                  <CCardImg
                    variant="full"
                    src="images/icons/personal_data_.png"
                  />
                </CCardBody>
              </CCard>
              <h5>Parametres et Configuration</h5>
            </CWidgetSimple>
          </CLink>
        </CCol>
      </CRow>
    </CContainer>
  );
};

const mapStateToProps = ({ loadDataState }) => ({
  loading: loadDataState.loading,
});

export default connect(mapStateToProps, {
  fetchPersonnels,
  fetchPersonnelNumber,
  fetchPositions,
  fetchStatusPostion,
})(FirstDash);
