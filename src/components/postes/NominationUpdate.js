import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchActes } from "../../actions/natureActions";
import { mouvement_postes } from "../../actions/personnelActions";
import { fetchStructures } from "../../actions/structureActions";
import Mouvement from "../../common/Mouvement";
import SecurityContent from "../../common/SecurityContent";
import Can from "../../RBAC/Can";
import { fieldsNomination } from "../../utils/dataTables";

const AffectationUpdate = (props) => {
  const {
    data,
    actes,
    fetchStructures,
    fetchActes,
    mouvement_postes,
    structures,
  } = props;
  useEffect(() => {
    setTimeout(() => {
      if (data === null && actes.length === 0) {
        fetchStructures();
        fetchActes();
      }
    }, 100);
  });

  const role = localStorage.getItem("roles");

  return (
    <CRow>
      <Can
        role={role}
        yes={() => (
          <CCol md="12">
            <CCard>
              <CCardHeader>
                <h3>Nomination du personnel</h3>
              </CCardHeader>
              <CCardBody>
                {structures === null ? (
                  <div
                    className="spinner-border spinner-border-xl"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <Mouvement
                    update={mouvement_postes}
                    structures={data}
                    actes={actes}
                    fiedType={fieldsNomination}
                    affectation={false}
                  />
                )}
              </CCardBody>
            </CCard>
          </CCol>
        )}
        no={() => <SecurityContent />}
      />
    </CRow>
  );
};

const mapStateToProps = ({ structureState, natureActeState }) => ({
  data: structureState.structures,
  actes: natureActeState.actes,
});

export default connect(mapStateToProps, {
  fetchStructures,
  mouvement_postes,
  fetchActes,
})(AffectationUpdate);
