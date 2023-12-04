import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { connect } from "react-redux";
import CanLevelThree from "../../RBAC/CanLevelThree";
import { fetchStagesActifs } from "../../actions/stages";
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollapseFieldStage from "../../common/CollapseFieldStage";
import ExportButton from "../../common/ExportButton";
import { fieldStage, getMonthName, months } from "../../utils/dataTables";

const PersonnelStageActif = (props) => {
  //components states
  const [stages, setStages] = useState([]);
  const [filterPersonnels, setFilterPersonnels] = useState([]);

  // localStorage users data
  const role = localStorage.getItem("roles");

  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
        });
        if (event.target.checked) {
          let men = stages.filter(({ personnel }) => personnel.sexe === "1");
          if (checked.fonctionnaireChecked) {
            men = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(men);
          }

          if (checked.contractuelChecked) {
            men = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(men);
          }
          setFilterPersonnels(men);
        } else {
          let data = stages;
          if (checked.fonctionnaireChecked) {
            data = stages.filter(
              ({ personnel }) =>
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(data);
          }

          if (checked.contractuelChecked) {
            data = stages.filter(
              ({ personnel }) =>
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }
        break;

      case 2:
        setChecked({
          ...checked,
          manChecked: false,
          womanChecked: event.target.checked,
        });

        if (event.target.checked) {
          let women = stages.filter(({ personnel }) => personnel.sexe === "2");
          if (checked.fonctionnaireChecked) {
            women = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(women);
          }

          if (checked.contractuelChecked) {
            women = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(women);
          }
          setFilterPersonnels(women);
        } else {
          let data = stages;
          if (checked.fonctionnaireChecked) {
            data = stages.filter(
              ({ personnel }) =>
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(data);
          }

          if (checked.contractuelChecked) {
            data = stages.filter(
              ({ personnel }) =>
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }
        break;
      case 3:
        setChecked({
          ...checked,
          contractuelChecked: false,
          fonctionnaireChecked: event.target.checked,
        });

        if (event.target.checked) {
          let fonctionnaires = stages.filter(
            ({ personnel }) => personnel.grade.statutAdministratifIdStatut === 1
          );
          if (checked.manChecked) {
            fonctionnaires = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(fonctionnaires);
          }

          if (checked.womanChecked) {
            fonctionnaires = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(fonctionnaires);
          }
          setFilterPersonnels(fonctionnaires);
        } else {
          let data = stages;
          if (checked.manChecked) {
            data = stages.filter(({ personnel }) => personnel.sexe === "1");
            setFilterPersonnels(data);
          }

          if (checked.womanChecked) {
            data = stages.filter(({ personnel }) => personnel.sexe === "2");
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;
      case 4:
        setChecked({
          ...checked,
          fonctionnaireChecked: false,
          contractuelChecked: event.target.checked,
        });

        if (event.target.checked) {
          let contractuels = stages.filter(
            ({ personnel }) => personnel.grade.statutAdministratifIdStatut !== 1
          );
          if (checked.manChecked) {
            contractuels = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(contractuels);
          }

          if (checked.womanChecked) {
            contractuels = stages.filter(
              ({ personnel }) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(contractuels);
          }
          setFilterPersonnels(contractuels);
        } else {
          let data = stages;
          if (checked.manChecked) {
            data = stages.filter(({ personnel }) => personnel.sexe === "1");
            setFilterPersonnels(data);
          }

          if (checked.womanChecked) {
            data = stages.filter(({ personnel }) => personnel.sexe === "2");
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;

      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
          fonctionnaireChecked: false,
          contractuelChecked: false,
        });
        break;
    }
  };

  // faire un custom hook
  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
  });

  const { isLoading, isError } = useQuery(
    "stagesActifs",
    () => fetchStagesActifs(),
    {
      onSuccess: (response) => {
        setStages(response.data);
        setFilterPersonnels(response.data);
      },
      onError: (error) => {
        throw error;
      },
    }
  );

  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <div>
                  <h4>Tout le personnel en Stage </h4>
                  <CBadge color="success">
                    <h5>Total: {filterPersonnels?.length} </h5>
                  </CBadge>
                </div>
                <div>
                  <CanLevelThree
                    role={role}
                    yes={() => (
                      <ExportButton
                        collapse={collapse}
                        toggleCollapse={toggleCollapse}
                      />
                    )}
                    no={() => ""}
                  />
                </div>
              </div>
              <CheckSexeAndStatut
                onCheckedSexe={onCheckedSexe}
                checked={checked}
              />
              <div>
                <CollapseFieldStage
                  collapse={collapse}
                  personnels={filterPersonnels}
                />
              </div>

              {/* <div className="d-flex align-items-center justify-content-center">
                {!props.fieldsRetraite && (
                  <CanLevelThree
                    role={role}
                    yes={() => (
                      <CollapseFied
                        toggleCollapse={toggleCollapse}
                        collapse={collapse}
                        personnels={
                          .length > 0
                            ? personnelSelected
                            : proppersonnelSelecteds.retraites
                        }
                      />
                    )}
                    no={() => ""}
                  />
                )}
              </div> */}
            </CCardHeader>
            <CCardBody>
              {isLoading && (
                <div className="spinner-border spinner-boder-xl" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <CDataTable
                fields={fieldStage}
                items={filterPersonnels}
                itemsPerPage={10}
                itemsPerPageSelect
                pagination
                hover
                loading={isLoading}
                sorter
                header
                tableFilter
                columnFilter
                clickableRows
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  enCours: (item) =>
                    item?.positionStage ? (
                      <td>
                        <CBadge color="warning">En Stage</CBadge>
                      </td>
                    ) : (
                      <td>
                        <CBadge color="success">Terminé</CBadge>
                      </td>
                    ),
                  poste: (item) => (
                    <td>{item?.personnel?.postes[0]?.libellePoste}</td>
                  ),

                  // categorie: (item) => <td>{item.categorieActuelle}</td>,
                  structure: (item) => (
                    <td>
                      {item?.localStage
                        ? item?.structure?.designationAdministrative
                        : item?.lieu}
                    </td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          to={`/developpement/en_stage/${item.idStage}`}
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                        >
                          Voir
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ userState }) => ({
  profile: userState.profile,
});

export default connect(mapStateToProps, {})(PersonnelStageActif);
