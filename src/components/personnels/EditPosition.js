import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchPositions } from "../../actions/positionActions";
import PositionEditGrille from "../../common/PositionEditGrille";
import { fieldsEditPosition } from "../../utils/dataTables";

const EditPosition = (props) => {
  const { fetchPositions, positions } = props;
  useEffect(() => {
    if (positions.length === 0) {
      fetchPositions();
    }
  });

  return (
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <h3>Modification les positions du personnel</h3>
          </CCardHeader>
          <CCardBody>
            {positions.length === 0 ? (
              <div className="spinner-border spinner-border-xl" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <PositionEditGrille
                positions={positions}
                fiedType={fieldsEditPosition}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({ positionState }) => ({
  positions: positionState.positionList,
});

export default connect(mapStateToProps, {
  fetchPositions,
})(EditPosition);
