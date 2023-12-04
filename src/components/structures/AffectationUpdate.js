import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchActes } from "../../actions/natureActions";
import { mouvement_affectation } from "../../actions/personnelActions";
import { fetchStructures } from "../../actions/structureActions";
import Mouvement from "../../common/Mouvement";
import { fieldsAffectation2 } from "../../utils/dataTables";

const AffectationUpdate = (props) => {
  const {
    data,
    actes,
    fetchStructures,
    fetchActes,
    mouvement_affectation,
    structures,
    errorMouvement,
    history,
  } = props;
  useEffect(() => {
    setTimeout(() => {
      if (data === null && actes.length === 0) {
        fetchStructures();
        fetchActes();
      }
    }, 100);
  });

  return (
    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            <h3>Affectation du personnel</h3>
          </CCardHeader>
          <CCardBody>
            {structures === null ? (
              <div className="spinner-border spinner-border-xl" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <Mouvement
                error={errorMouvement}
                fiedType={fieldsAffectation2}
                update={mouvement_affectation}
                structures={data}
                actes={actes}
                affectation={true}
              />
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = ({
  structureState,
  natureActeState,
  personnelState,
}) => ({
  data: structureState.structures,
  actes: natureActeState.actes,
  errorMouvement: personnelState.errorMouvement,
});

export default connect(mapStateToProps, {
  fetchStructures,
  mouvement_affectation,
  fetchActes,
})(AffectationUpdate);
