import { CCardGroup, CCol, CRow, CWidgetProgressIcon } from "@coreui/react";
import {
  faBed,
  faChild,
  faPeopleArrows,
  faRunning,
  faUserClock,
  faUsers,
  faUsersSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStatusPostion } from "../../actions/positionActions/index.js";

const WidgetsPosition = (props) => {
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
                text="En ACTIVITE"
                color="gradient-success"
              >
                <FontAwesomeIcon className="mr-2" icon={faUsers} />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.suspendu.toString()}
                text="Suspendu"
                color="gradient-danger"
              >
                <FontAwesomeIcon className="mr-2" icon={faUsersSlash} />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.detachement.toString()}
                text="En detachement"
                color="gradient-info"
              >
                <FontAwesomeIcon className="mr-2" icon={faPeopleArrows} />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.integration.toString()}
                text="EN cours Integration"
                color="gradient-primary"
              >
                <FontAwesomeIcon className="mr-2" icon={faUserClock} />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.retraite.toString()}
                text="Retraité"
                color="gradient-warning"
              >
                <FontAwesomeIcon className="mr-2" icon={faBed} />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.disposition.toString()}
                text="Mis a disposition"
                color="gradient-info"
              >
                <FontAwesomeIcon className="mr-2" icon={faChild} />
              </CWidgetProgressIcon>
              <CWidgetProgressIcon
                header={position.disponibilite.toString()}
                text="Mis a disponibilite"
                color="gradient-info"
              >
                <FontAwesomeIcon className="mr-2" icon={faRunning} />
              </CWidgetProgressIcon>
            </>
          )}
        </CCardGroup>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ positionState: { position } }) => ({ position });

export default connect(mapStateToProps, { fetchStatusPostion })(
  WidgetsPosition
);
