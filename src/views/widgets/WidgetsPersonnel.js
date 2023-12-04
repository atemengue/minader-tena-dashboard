import { CCol, CRow, CTooltip, CWidgetProgressIcon } from "@coreui/react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import { connect, useDispatch } from "react-redux";
import {
  changeDashboardActifplayEmail,
  fetchPersonnelNumber,
  fetchPersonnels,
} from "../../actions/personnelActions";
import { FETCH_PERSONNELS_NUMBER } from "../../actions/personnelActions/types";

const WidgetsPersonnel = (props) => {
  const {
    total,
    actif,
    fonctionnaires,
    contractuels,
    decisionnaires,
    retraites,
    dashboardActifPersonnel,
    changeDashboardActifplayEmail,
    fetchPersonnels,
  } = props;

  const dispatch = useDispatch();

  const { isLoading, isError } = useQuery(
    "statutNumber",
    () => fetchPersonnelNumber(),
    {
      onSuccess: (response) => {
        dispatch({ type: FETCH_PERSONNELS_NUMBER, payload: response.data });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onChangeStatus = (value) => {
    changeDashboardActifplayEmail(value);
    fetchPersonnels(value);
  };

  return (
    <CRow>
      <CCol sm="6" md="2">
        <CTooltip placement="bottom-end" content="Afficher tout le personnel">
          <CWidgetProgressIcon
            onClick={() => onChangeStatus(5)}
            className="widgetRevision"
            header={`${total}`}
            text="Personnel total "
            color="gradient-info"
            inverse
          >
            {isLoading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}

            {dashboardActifPersonnel === 5 && (
              <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
            )}
          </CWidgetProgressIcon>
        </CTooltip>
      </CCol>
      <CCol sm="6" md="2">
        <CTooltip
          placement="bottom-end"
          content="Afficher le personnel en Activite"
        >
          <CWidgetProgressIcon
            onClick={() => onChangeStatus(0)}
            className="widgetRevision"
            header={`${actif}`}
            text="En activité"
            color="gradient-success"
            inverse
          >
            {isLoading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {dashboardActifPersonnel === 0 && (
              <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
            )}
          </CWidgetProgressIcon>
        </CTooltip>
      </CCol>
      <CCol sm="6" md="2">
        <CTooltip
          placement="bottom-end"
          content="Afficher le personnel fonctionnaires"
        >
          <CWidgetProgressIcon
            onClick={() => onChangeStatus(1)}
            className="widgetRevision"
            header={`${fonctionnaires}`}
            text="Fonctionnnaires"
            color="gradient-dark"
            inverse
          >
            {isLoading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {dashboardActifPersonnel === 1 && (
              <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
            )}
          </CWidgetProgressIcon>
        </CTooltip>
      </CCol>
      <CCol sm="6" md="2">
        <CTooltip
          placement="bottom-end"
          content="Afficher le personnel contractuels"
        >
          <CWidgetProgressIcon
            onClick={() => onChangeStatus(2)}
            className="widgetRevision"
            header={`${contractuels}`}
            text="Contractuels"
            color="gradient-warning"
            inverse
          >
            {isLoading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {dashboardActifPersonnel === 2 && (
              <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
            )}
          </CWidgetProgressIcon>
        </CTooltip>
      </CCol>
      <CCol sm="6" md="2">
        <CTooltip
          placement="bottom-end"
          content="Afficher le personnel decisionnaires"
        >
          <CWidgetProgressIcon
            onClick={() => onChangeStatus(3)}
            className="widgetRevision"
            header={`${decisionnaires}`}
            text="Decisionnaire"
            color="gradient-primary"
            inverse
          >
            {isLoading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {dashboardActifPersonnel === 3 && (
              <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
            )}
          </CWidgetProgressIcon>
        </CTooltip>
      </CCol>
      <CCol sm="6" md="2">
        <CTooltip
          placement="bottom-end"
          content="Afficher le personnel en retraites"
        >
          <CWidgetProgressIcon
            onClick={() => onChangeStatus(4)}
            className="widgetRevision"
            header={`${retraites}`}
            text="En retraite"
            color="gradient-danger"
            inverse
          >
            {isLoading && (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {dashboardActifPersonnel === 4 && (
              <FontAwesomeIcon className="mr-2" icon={faCheckCircle} />
            )}
          </CWidgetProgressIcon>
        </CTooltip>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({
  personnelState: { division, statutNumber, dashboardActifPersonnel },
}) => ({
  statutNumber,
  total: division.total,
  actif: division.actif,
  fonctionnaires: division.fonctionnaires,
  contractuels: division.contractuels,
  decisionnaires: division.decisionnaires,
  retraites: division.retraites,
  dashboardActifPersonnel: dashboardActifPersonnel,
});

export default connect(mapStateToProps, {
  changeDashboardActifplayEmail,
  fetchPersonnels,
})(WidgetsPersonnel);
