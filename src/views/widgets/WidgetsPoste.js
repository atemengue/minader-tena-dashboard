import React, { useEffect } from "react";
import { CCol, CRow, CWidgetProgressIcon, CCardGroup } from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import { fetchStatusPostion } from "../../actions/positionActions/index.js";

const WidgetsPoste = (props) => {
  const { position, fetchStatusPostion } = props;
  useEffect(() => {
    if (position === null) {
      fetchStatusPostion();
    }
  }, [fetchStatusPostion, position]);

  return (
    <CRow>
      <CCol>
        <CCardGroup className="mb-4">
          {position === null ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <CWidgetProgressIcon
                header={position.actif.toString()}
                text="Total"
                color="gradient-info"
              >
                <CIcon name="cil-people" height="36" />
              </CWidgetProgressIcon>
              {/* factorise le card */}
              <CWidgetProgressIcon
                header={position.suspendu.toString()}
                text="Services Centraux"
                color="gradient-info"
              >
                <CIcon name="cil-people" height="36" />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.detachement.toString()}
                text="Services deconcentres"
                color="gradient-success"
              >
                <CIcon name="cil-people" height="36" />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.integration.toString()}
                text="Occupes"
                color="gradient-warning"
              >
                <CIcon name="cil-people" height="36" />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.retraite.toString()}
                text="Vacant"
                color="gradient-warning"
              >
                <CIcon name="cil-people" height="36" />
              </CWidgetProgressIcon>
            </>
          )}
        </CCardGroup>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ positionState: { position } }) => ({ position });

export default connect(mapStateToProps, { fetchStatusPostion })(WidgetsPoste);
