import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchPersonnels } from "../../actions/personnelActions";
import { getStatusAdministratif } from "../../utils/dataTables";
import PersonnelTable from "../configuration/tableComponent/PersonnelTable";
import PersonnelModal from "./PersonnelModal";

const Personnels = (props) => {
  const [modal, setModal] = useState(false);
  const [personnelDetail, setPersonnelDetail] = useState("");
  const { personnels, fetchPersonnels, isLoading, dashboardActifPersonnel } =
    props;

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  useEffect(() => {
    if (personnels.length === 0) {
      fetchPersonnels();
    }
  }, [dashboardActifPersonnel]);
  return (
    <>
      <PersonnelModal modal={modal} toggle={toggle} data={personnelDetail} />
      <CRow>
        <CCol xs="12" lg="12">
          {isLoading ? (
            <div className="spinner-border spinner-boder-xl" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CCard>
              <CCardHeader>
                <h5>
                  {getStatusAdministratif(dashboardActifPersonnel)}:{" "}
                  {personnels.length}
                </h5>
              </CCardHeader>
              <CCardBody>
                <PersonnelTable
                  onHandleModal={onHandleModal}
                  data={personnels}
                />
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  isLoading: personnelState.isLoading,
  personnels: personnelState.personnels,
  dashboardActifPersonnel: personnelState.dashboardActifPersonnel,
});

export default connect(mapStateToProps, { fetchPersonnels })(Personnels);
