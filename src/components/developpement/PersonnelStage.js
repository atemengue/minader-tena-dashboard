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
import { fetchStages } from "../../actions/stages";
import CollapseFieldStage from "../../common/CollapseFieldStage";
import ExportButton from "../../common/ExportButton";
import { fieldStage, getMonthName, months } from "../../utils/dataTables";

const generateYear = () => {
  let years = [];
  for (let i = 2100; i > 1990; i--) {
    years.push(i);
  }
  return years.map((annee, index) => {
    return (
      <option key={index} value={annee}>
        {annee}
      </option>
    );
  });
};

const generateMonths = () => {
  return months.map((month, index) => {
    return (
      <option key={++index} value={month.value}>
        {month.name}
      </option>
    );
  });
};

const PersonnelStage = (props) => {
  //components states
  const [stages, setStages] = useState([]);
  const [checkedStage, setCheckedStage] = useState(false);
  const [filterPersonnels, setFilterPersonnels] = useState([]);

  const [annee, setannee] = useState(new Date().getFullYear());
  const [mois, setMoins] = useState("0");

  // localStorage users data
  const role = localStorage.getItem("roles");

  const selectPersonnelEnStage = (event) => {
    setCheckedStage(!checkedStage);
    if (event.target.checked) {
      let data = stages.filter((personnel) => personnel.positionStage === true);
      setFilterPersonnels(data);
    } else {
      setFilterPersonnels(stages);
    }
  };

  const { isLoading, isError } = useQuery(
    "stages",
    () => fetchStages({ anneeStage: annee, moinsStage: mois }),
    {
      onSuccess: (response) => {
        setStages(response.data);
      },
      onError: (error) => {
        throw error;
      },
    }
  );

  const fetchStageMutation = useMutation((data) => fetchStages(data), {
    onSuccess: (response) => {
      setStages(response.data);
      setFilterPersonnels(response.data);
    },
    onError: (error) => {
      throw error;
    },
  });

  const onChangeYear = (year) => {
    setannee(year);
    fetchStageMutation.mutate({
      anneeStage: year,
      moinsStage: mois,
    });
  };

  const onChangeMonth = (value) => {
    setMoins(value);
    // fetchStageMutation.mutate({
    //   anneeStage: annee,
    //   moinsStage: value,
    // });
  };

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
                  <h4>Stages/Formations: {annee}</h4>
                  <h5>Mois de: {getMonthName(mois)} </h5>
                  <CBadge color="success">
                    <h5>Total: {filterPersonnels?.length} </h5>
                  </CBadge>
                </div>
                <CFormGroup row>
                  <CCol md="4" className="d-flex justify-content-center">
                    <span className="font-weight" htmlFor="selectSm">
                      Annee:
                    </span>
                  </CCol>
                  <CCol xs="12" md="8" className="d-flex">
                    <CSelect
                      onChange={(event) => onChangeYear(event.target.value)}
                      defaultValue={annee}
                      custom
                      size="md"
                      name="selectSm"
                      id="SelectLm"
                    >
                      {generateYear()}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4" className="d-flex">
                    <span className="font-weight" htmlFor="selectSm">
                      Mois:
                    </span>
                  </CCol>
                  <CCol xs="12" md="8" className="d-flex ">
                    <CSelect
                      onChange={(event) => onChangeMonth(event.target.value)}
                      custom
                      defaultValue={mois}
                      size="md"
                      name="selectSm"
                      id="SelectLm"
                    >
                      {generateMonths()}
                    </CSelect>
                  </CCol>
                </CFormGroup>
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
              <hr />
              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                  onChange={selectPersonnelEnStage}
                  custom
                  id={"positionStage"}
                  checked={checkedStage}
                  name="positionStage"
                />
                <CLabel variant="custom-checkbox" htmlFor="positionStage">
                  En stage Uniquement ?
                </CLabel>
              </CFormGroup>

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
              {(isLoading || fetchStageMutation.isLoading) && (
                <div className="spinner-border spinner-boder-xl" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {stages?.length === 0 ? (
                !isLoading && (
                  <div className="text-center">
                    <FontAwesomeIcon icon={faUserGraduate} size="9x" />
                    <h3>AUCUN STAGE EN COURS POUR CETTE ANNEE {annee}</h3>
                  </div>
                )
              ) : (
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
                            key={index}
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            to={`/developpement/en_stage/${item?.idStage}`}
                          >
                            Voir
                          </CButton>
                        </td>
                      );
                    },
                  }}
                />
              )}
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

export default connect(mapStateToProps, {})(PersonnelStage);
