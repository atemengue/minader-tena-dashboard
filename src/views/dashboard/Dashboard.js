import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React, { lazy } from "react";
import Personnels from "../../components/personnels/Personnels";
const WidgetsPersonnel = lazy(() => import("../widgets/WidgetsPersonnel.js"));

const Dashboard = () => {
  return (
    <>
      <WidgetsPersonnel />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol lg="12">
              <Personnels />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Dashboard;
