import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import {
  faArrowLeft,
  faExchangeAlt,
  faHouseUser,
  faPersonBooth,
  faUserFriends,
  faUserTag,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { connect, useDispatch } from "react-redux";
import Can from "../../RBAC/Can";
import { fetchActes } from "../../actions/natureActions";
import {
  mouvement_affectation,
  updatePersonnelStructure,
} from "../../actions/personnelActions";
import { fetchStructure } from "../../actions/structureActions";
import { FETCH_STRUCTURE_SUCCESS } from "../../actions/types";
import Mouvement from "../../common/Mouvement";
import SecurityContent from "../../common/SecurityContent";
import { fieldsAffectation } from "../../utils/dataTables";
import Personnels from "./Personnels";
import Poste from "./Poste";
import PosteUpdate from "./PosteUpdate";
import SousStructure from "./SousStructures";

const StructureDetail = (props) => {
  const idStructure = props.match.params.idStructure;

  const { actes, fetchActes, mouvement_affectation } = props;

  useEffect(() => {
    if (actes.length === 0) {
      fetchActes();
    }
  }, [actes]);

  const dispatch = useDispatch();

  const { isLoading, isError, data, refetch, isFetching } = useQuery(
    "detailsStructure",
    () => fetchStructure(idStructure),
    {
      onSuccess: (response) => {
        dispatch({ type: FETCH_STRUCTURE_SUCCESS, payload: response.data });
      },
      onError: (error) => {
        // AFFICHE LES ERREURS ICI
      },
      refetchOnMount: "always",
      staleTime: Infinity,
    }
  );

  const role = localStorage.getItem("roles");

  return (
    <>
      <CRow>
        <CCol col="2" sm="6" md="2" className="mb-3">
          <CButton
            onClick={() => props.history.goBack()}
            block
            size="sm"
            color="dark"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </CButton>
        </CCol>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <h4>
                {props.structure
                  ? `${props.structure.first.abbreviation} : ${props.structure.first.designationAdministrative}`
                  : ""}
              </h4>

              <hr />
              <h6>Region: {props.structure?.first?.region?.libelleRegion}</h6>
              <h6>
                Département:{" "}
                {props.structure?.first?.departement?.libelleDepartement}
              </h6>
              <h6>
                Arrondissement:{" "}
                {props.structure?.first?.arrondissement?.libelleArrondissement}
              </h6>
            </CCardHeader>

            <CCardBody>
              {isFetching ? (
                <div className="spinner-border spinner-border-xl" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <CTabs activeTab="personnelBase">
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink data-tab="personnelBase">
                        <FontAwesomeIcon
                          size="2x"
                          className="mr-1"
                          icon={faUserTag}
                        />
                        Personnel
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="personnels">
                        <FontAwesomeIcon
                          size="2x"
                          className="mr-1"
                          icon={faUserFriends}
                        />
                        Tout le monde
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="postes">
                        <FontAwesomeIcon
                          size="2x"
                          className="mr-1"
                          icon={faUserTie}
                        />
                        Postes
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="subStructure">
                        <FontAwesomeIcon
                          size="2x"
                          className="mr-1"
                          icon={faHouseUser}
                        />
                        Structures
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="updatePoste">
                        <FontAwesomeIcon
                          className="mr-1"
                          size="2x"
                          icon={faExchangeAlt}
                        />
                        Mettre jour les postes
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink data-tab="updateStructure">
                        <FontAwesomeIcon
                          className="mr-1"
                          size="2x"
                          icon={faPersonBooth}
                        />
                        Affectation
                      </CNavLink>
                    </CNavItem>
                  </CNav>
                  <CTabContent>
                    <CTabPane data-tab="personnelBase">
                      <Personnels
                        name="base"
                        idStructure={props.structure.first.idStructure}
                        structureName={
                          props.structure.first.designationAdministrative
                        }
                        personnels={props.structure.first.personnels}
                      />
                    </CTabPane>

                    <CTabPane data-tab="personnels">
                      <Personnels
                        idStructure={props.structure.first.idStructure}
                        name="all"
                        structureName={
                          props.structure.first.designationAdministrative
                        }
                        personnels={props.structure.allPersonnels}
                      />
                    </CTabPane>
                    <CTabPane data-tab="postes">
                      <Can
                        role={role}
                        yes={() => (
                          <Poste
                            postes={props.structure.postes}
                            structure={props.structure.first}
                          />
                        )}
                        no={() => <SecurityContent />}
                      />
                    </CTabPane>
                    <CTabPane data-tab="subStructure">
                      <SousStructure structures={props.structure.second} />
                    </CTabPane>
                    <CTabPane data-tab="updatePoste">
                      <Can
                        role={role}
                        yes={() => (
                          <PosteUpdate
                            history={props.history}
                            postes={props.structure.postes}
                            structure={props.structure.first}
                          />
                        )}
                        no={() => <SecurityContent />}
                      />
                    </CTabPane>
                    <CTabPane data-tab="updateStructure">
                      <Mouvement
                        fiedType={fieldsAffectation}
                        update={mouvement_affectation}
                        isLoading={props.isLoadingMouvement}
                        structure={props.structure.first}
                        actes={actes}
                        affectation={true}
                        affectationByStructure={true}
                      />
                    </CTabPane>
                  </CTabContent>
                </CTabs>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({
  structureState,
  personnelState,
  natureActeState,
}) => ({
  structure: structureState.structure,
  isLoadingMouvement: personnelState.isLoadingMouvement,
  actes: natureActeState.actes,
});

export default connect(mapStateToProps, {
  fetchActes,
  updatePersonnelStructure,
  mouvement_affectation,
})(StructureDetail);
