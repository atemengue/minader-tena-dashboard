import {
  CCard,
  CCardBody,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchPosteByRang,
  fetchRangPostes,
  updatePostes,
} from "../../actions/posteActions";
import {
  fetchNaturePostes,
  fetchPosteByNature,
} from "../../actions/structureActions";
import SecurityContent from "../../common/SecurityContent";
import Can from "../../RBAC/Can";
import { MAJByNature } from "./MAJByNature";
import NaturePoste from "./NaturePoste";
import RangPoste from "./RangPoste";

const ListPoste = (props) => {
  const {
    fetchRangPostes,
    fetchPosteByRang,
    fetchNaturePostes,
    fetchPosteByNature,
    postesByNature,
    isLoadingNature,
    isLoadingPosteByNature,
    natureList,
    isLoadingUpdate,
    isLoadingRang,
    isLoadingPosteByRang,
    rangList,
    postesByRang,
  } = props;

  useEffect(() => {
    if (postesByRang.length === 0) {
      fetchPosteByRang(3);
    }
    if (postesByNature.length === 0) {
      fetchPosteByNature(4);
    }

    if (natureList.length === 0) {
      fetchNaturePostes();
    }

    if (rangList.length === 0) {
      fetchRangPostes();
    }
  }, [postesByRang]);

  const roles = localStorage.getItem("roles");

  return (
    <Can
      role={roles}
      yes={() => (
        <CRow>
          <CCol xs="12" lg="12">
            {/* <WidgetsPoste /> */}
            <CCard>
              <CCardBody>
                <CTabs activeTab="rangPoste">
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="rangPoste">Rang de Poste</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="naturePoste">
                        Nature de Poste
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="majByRang">
                        Mise a jour par Rang
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="majByNature">
                        Mise a jour par Nature
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane data-tab="rangPoste">
                      {rangList.length === 0 ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="stastus"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <RangPoste
                          postes={postesByRang}
                          rangList={rangList}
                          postesByRang
                          fetchPosteByRang={fetchPosteByRang}
                          isLoadingPosteByRang={isLoadingPosteByRang}
                        />
                      )}
                    </CTabPane>
                    <CTabPane data-tab="naturePoste">
                      <NaturePoste
                        postes={postesByNature}
                        natureList={natureList}
                        fetchPosteByNature={fetchPosteByNature}
                        isLoadingUpdate={isLoadingUpdate}
                        isLoadingPosteByNature={isLoadingPosteByNature}
                        isLoadingNature={isLoadingNature}
                      />
                    </CTabPane>
                    <CTabPane data-tab="majByNature">
                      <MAJByNature
                        fetchPosteByNature={fetchPosteByNature}
                        postes={postesByNature}
                        natureList={natureList}
                        updatePostes={updatePostes}
                        history={props.history}
                        isLoadingUpdate={isLoadingUpdate}
                        isLoadingPosteByNature={isLoadingPosteByNature}
                        isLoadingNature={isLoadingNature}
                      />
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
      no={() => <SecurityContent />}
    />
  );
};

const mapStateToProps = ({ posteState }) => ({
  isLoadingNature: posteState.isLoadingNature,
  isLoadingPosteByNature: posteState.isLoadingPosteByNature,
  natureList: posteState.natureList,
  postesByNature: posteState.postesNature,
  isLoadingUpdate: posteState.isLoadingUpdate,
  isLoadingRang: posteState.isLoadingRang,
  isLoadingPosteByRang: posteState.isLoadingPosteByRang,
  rangList: posteState.rangList,
  postesByRang: posteState.postesRang,
});
export default connect(mapStateToProps, {
  fetchNaturePostes,
  fetchPosteByNature,
  fetchRangPostes,
  fetchPosteByRang,
  updatePostes,
})(ListPoste);
