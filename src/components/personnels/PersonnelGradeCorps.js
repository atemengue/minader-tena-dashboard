import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CImg,
  CInputRadio,
  CLabel,
  CSelect,
  CSubheader,
  CSwitch,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Can from "../../RBAC/Can";
import { fetchCorps } from "../../actions/corpsActions";
import {
  displayStatusAdmin,
  fetchPersonnelByStatusAdmin,
} from "../../actions/personnelActions";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import SelectWorkLocation from "../../common/SelectWorkLocation";
import { BUCKET_URL } from "../../config";
import useFilterWorkLocation from "../../hooks/useFilterWorkLocation";
import useLocationAll from "../../hooks/useLocationAll";
import { fields, getBadge } from "../../utils/dataTables";
import { calculateAge, getStatusAdmin } from "../../utils/functions";
import PersonnelModal from "./PersonnelModal";

const PersonnelGradeCorps = (props) => {
  // destructuring state value
  const {
    fetchPersonnelByStatusAdmin,
    fetchCorps,
    corps,
    status,
    personnels,
    location,
  } = props;

  // signIn user roles
  const role = localStorage.getItem("roles");

  const { isLoading, isError } = useLocationAll();

  // id Corps et grades selectBox
  const [idCorps, setIdCorps] = useState(0);
  const [idGrade, setIdGrade] = useState(0);

  const [grades, setGrades] = useState([]);
  const [personnelDetail, setPersonnelDetail] = useState("");
  const [modal, setModal] = useState(false);

  const [collapse, setCollapse] = useState(false);

  const [switcher, setSwitcher] = useState(false);

  //  personnels filter

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    responsable: false,
    cadre: false,
  });

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  // hook filterWorkLocation
  const {
    handleWorkLocation,
    idLocation,
    departements,
    arrondissements,
    filterState,
    setFilterData,
    filterData,
    setIdLocation,
    setDepartements,
    setArrondissements,
    checkedServiceDeconcentres,
    handleServiceDeconcentres,
  } = useFilterWorkLocation(
    personnels,
    location.departements,
    location.arrondissements,
    switcher
  );

  useEffect(() => {
    if (personnels.length === 0 && corps.length === 0) {
      fetchCorps();
      fetchPersonnelByStatusAdmin({
        status: status,
        grade: idGrade,
        corps: idCorps,
      });
    } else {
      setFilterData(personnels);
    }
  }, [fetchCorps, corps, personnels, status]);

  const clearLocationStatus = () => {
    setIdGrade(0);
    setIdCorps(0);
    setIdLocation({
      idRegion: -1,
      idDepartement: null,
      idArrondissement: null,
    });
    setDepartements([]);
    setArrondissements([]);
  };

  const onChangeStatus = (value) => {
    clearLocationStatus();
    switch (parseInt(value)) {
      case 1:
        setGrades([]);
        break;
      case 2:
        getGrades(17);
        break;
      case 3:
        getGrades(18);
      default:
        break;
    }
    displayStatusAdmin(parseInt(value));
    fetchPersonnelByStatusAdmin({
      status: parseInt(value),
      grade: 0,
      corps: 0,
    });
  };

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const getGrades = (corpsId) => {
    let grades = corps.find(
      (corps) => corps.idCorps === parseInt(corpsId)
    ).grades;
    setGrades([
      {
        idGrade: 0,
        libelleGrade: "Tout les grades",
      },
      ...grades, //ES6 ADD
    ]);
  };

  const onChangeCorps = (corpsId) => {
    setIdCorps(parseInt(corpsId));
    getGrades(corpsId);
    fetchPersonnelByStatusAdmin({
      status: status,
      grade: idGrade,
      corps: parseInt(corpsId),
    });
  };

  const onChangeGrade = (gradeId) => {
    setIdGrade(parseInt(gradeId));
    fetchPersonnelByStatusAdmin({
      status: status,
      grade: parseInt(gradeId),
      corps: idCorps,
    });
  };

  const renderCorps = (value) => {
    if (parseInt(value) === 1) {
      return (
        <CFormGroup row>
          <CCol md="12" className="">
            <span className="font-weight" htmlFor="selectSm">
              Corps:
            </span>
          </CCol>
          <CCol xs="12" md="12" className="d-flex align-items-center">
            <CSelect
              onChange={(corps) => onChangeCorps(corps.target.value)}
              custom
              size="md"
              name="selectSm"
              id="SelectLm"
              value={idCorps}
            >
              {corps.map((corps, index) => {
                return (
                  <option key={index} value={corps.idCorps}>
                    {corps.libelleCorps}
                  </option>
                );
              })}
            </CSelect>
          </CCol>
        </CFormGroup>
      );
    }
  };

  const getNameSelect = (data, id) => {
    let libelle = " ";
    if (data && data.length > 0) {
      let keys = Object.keys(data[0]);
      let value = data.find((field) => field[keys[0]] === id);
      return value ? (libelle = value[keys[1]]) : "";
    }
    return libelle;
  };

  // const buildFilter = (state, personnels) => {
  //   let filters = [];
  //   if (state.workArrondissement) {
  //     // arrondissement true
  //     filters = [
  //       ...filters,
  //       {
  //         filter: "arrondissementIdArrondissement",
  //         location: "structure",
  //         value: idLocation.idArrondissement,
  //       },
  //     ];
  //   } else if (state.workDepartement) {
  //     // departement true
  //     filters = [
  //       ...filters,
  //       {
  //         filter: "departementIdDepartement",
  //         location: "structure",
  //         value: idLocation.idDepartement,
  //       },
  //     ];
  //   } else if (state.workRegion) {
  //     // region true
  //     filters = [
  //       ...filters,
  //       {
  //         filter: "arrondissementIdArrondissement",
  //         location: "structure",
  //         value: idLocation.idArrondissement,
  //       },
  //     ];
  //   } else {
  //     console.log("aucun filter");
  //   }

  //   console.log(state.manChecked, "filter state");

  //   if (state.manChecked) {
  //     console.log("filter man ok");
  //   }

  //   const filteredResults = personnels.filter((personnel) => {
  //     return filters.some((filterEl) => {
  //       let structure = personnel[filterEl.location];
  //       return structure[filterEl.filter] === filterEl.value;
  //     });
  //   });

  //   return filteredResults;
  // };

  // const onFilterPersonnel = (event) => {
  //   const value = parseInt(event.target.value);
  //   const checkedValue = event.target.checked;
  //   switch (value) {
  //     case 1:
  //       setFilterState({
  //         ...filterState,
  //         manChecked: checkedValue,
  //         womanChecked: false,
  //       });
  //       let data = buildFilter(filterState, personnels);
  //       console.log(data);

  //       break;

  //     default:
  //       break;
  //   }
  // };

  // revoir la function custom hooks
  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
        });
        if (event.target.checked) {
          let men = filterData.filter((personnel) => personnel.sexe === "1");
          if (checked.responsable) {
            men = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" && personnel.postes.length > 0
            );
            setFilterData(men);
          }

          if (checked.cadre) {
            men = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" && personnel.postes.length == 0
            );
            setFilterData(men);
          }
          setFilterData(men);
        } else {
          let data = filterData;
          if (checked.responsable) {
            data = filterData.filter(
              (personnel) => personnel.postes.length > 0
            );
            setFilterData(data);
          }

          if (checked.cadre) {
            data = filterData.filter(
              (personnel) => personnel.postes.length == 0
            );
            setFilterData(data);
          }
          setFilterData(data);
        }
        break;

      case 2:
        setChecked({
          ...checked,
          manChecked: false,
          womanChecked: event.target.checked,
        });

        if (event.target.checked) {
          let women = filterData.filter((personnel) => personnel.sexe === "2");
          if (checked.responsable) {
            women = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" && personnel.postes.length > 0
            );
            setFilterData(women);
          }

          if (checked.cadre) {
            women = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" && personnel.postes.length == 0
            );
            setFilterData(women);
          }
          setFilterData(women);
        } else {
          let data = filterData;
          if (checked.responsable) {
            data = filterData.filter(
              (personnel) => personnel.postes.length > 0
            );
            setFilterData(data);
          }

          if (checked.cadre) {
            data = filterData.filter(
              (personnel) => personnel.postes.length == 0
            );
            setFilterData(data);
          }
          setFilterData(data);
        }

        break;

      case 3:
        setChecked({
          ...checked,
          cadre: false,
          responsable: event.target.checked,
        });

        if (event.target.checked) {
          let responsables = filterData.filter(
            (personnel) => personnel.postes.length > 0
          );

          if (checked.manChecked) {
            responsables = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" && personnel.postes.length > 0
            );
            setFilterData(responsables);
          }

          if (checked.womanChecked) {
            responsables = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" && personnel.postes.length > 0
            );
            setFilterData(responsables);
          }
          setFilterData(responsables);
        } else {
          let data = filterData;
          if (checked.manChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "1");
            setFilterData(data);
          }

          if (checked.womanChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "2");
            setFilterData(data);
          }
          setFilterData(data);
        }

        break;

      case 4:
        setChecked({
          ...checked,
          responsable: false,
          cadre: event.target.checked,
        });

        if (event.target.checked) {
          let cadares = filterData.filter(
            (personnel) => personnel.postes.length == 0
          );
          if (checked.manChecked) {
            cadares = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" && personnel.postes.length == 0
            );
            setFilterData(cadares);
          }

          if (checked.womanChecked) {
            cadares = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" && personnel.postes.length == 0
            );
            setFilterData(cadares);
          }
          setFilterData(cadares);
        } else {
          let data = filterData;
          if (checked.manChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "1");
            setFilterData(data);
          }

          if (checked.womanChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "2");
            setFilterData(data);
          }
          setFilterData(data);
        }

        break;

      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
          responsable: false,
          cadre: false,
        });
        break;
    }
  };

  // const onCheckedServiceDeconcentre = (event) => {
  //   setFilterState({
  //     ...filterState,
  //     deconcentres: event.target.checked,
  //   });
  //   if (event.target.checked) {
  //     let data = filterData.filter(
  //       (personnel) => personnel?.structure?.regionIdRegion !== 1
  //     );
  //     setFilterData(data);
  //   } else {
  //     setFilterData(personnels);
  //   }
  // };

  return (
    <>
      <PersonnelModal modal={modal} toggle={toggle} data={personnelDetail} />
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <div>
            <h5>Status: {getStatusAdmin(status)} </h5>
            <h6>Corps: {getNameSelect(corps, idCorps)} </h6>
            <h6>Grade: {getNameSelect(grades, idGrade)} </h6>
            <h6>Genre: </h6>
            <h6>Position Administrative: </h6>
            <h6>
              Filter par:{" "}
              {!switcher ? (
                <CBadge color="warning">
                  <h6>Region de Travail</h6>
                </CBadge>
              ) : (
                <CBadge color="info">
                  <h6>Region d'Origine</h6>
                </CBadge>
              )}
            </h6>

            <CBadge color="success">
              <h5>Total: {filterData.length}</h5>
            </CBadge>
          </div>

          <div className="d-flex justify-content-center">
            <CFormGroup variant="custom-radio" inline>
              <CInputRadio
                custom
                id="inline-radio1"
                name="inline-radios"
                value={"1"}
                onChange={(e) => {
                  setSwitcher(false);
                  clearLocationStatus();
                }}
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                Region de Travail
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="custom-radio" inline>
              <CInputRadio
                custom
                id="inline-radio2"
                name="inline-radios"
                value={"2"}
                onChange={(e) => {
                  setSwitcher(true);
                  clearLocationStatus();
                }}
              />
              <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                Region d'Origine
              </CLabel>
            </CFormGroup>
          </div>

          <Can
            role={role}
            yes={() => (
              <ExportButton
                collapse={collapse}
                toggleCollapse={toggleCollapse}
              />
            )}
            no={() => ""}
          />
        </CCardHeader>
        <CCol xs="12" lg="12">
          <CSubheader className="d-flex justify-content-between p-3">
            <CCol xs="12" md="4">
              <CFormGroup row>
                <CCol md="12" className="">
                  <span className="font-weight" htmlFor="selectSm">
                    Statut administratif:
                  </span>
                </CCol>
                <CCol xs="12" md="12" className="d-flex align-items-center">
                  <CSelect
                    onChange={(event) => {
                      onChangeStatus(event.target.value);
                    }}
                    defaultValue={status}
                    custom
                    size="md"
                    name="selectSm"
                    id="SelectLm"
                  >
                    <option key="1" value="1">
                      Fonctionaire
                    </option>
                    <option key="2" value="2">
                      Contractuel
                    </option>
                    <option key="3" value="3">
                      Decisionnaire
                    </option>
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CCol>
            <CCol xs="12" md="4">
              {renderCorps(status)}
            </CCol>
            <CCol xs="12" md="4">
              <CFormGroup row>
                <CCol md="12" className="">
                  <span className="font-weight" htmlFor="selectSm">
                    Grades
                  </span>
                </CCol>
                <CCol xs="12" md="12" className="d-flex align-items-center">
                  <CSelect
                    onChange={(event) => onChangeGrade(event.target.value)}
                    custom
                    size="md"
                    name="selectSm"
                    id="SelectLm"
                    value={idGrade}
                    se
                  >
                    {grades.map((grade, index) => {
                      return (
                        <option key={index} value={grade.idGrade}>
                          {grade.libelleGrade}
                        </option>
                      );
                    })}
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CCol>

            <SelectWorkLocation
              idLocation={idLocation}
              handleWorkLocation={handleWorkLocation}
              regions={location.regions}
              departements={departements}
              arrondissements={arrondissements}
              checkedServiceDeconcentres={checkedServiceDeconcentres}
              handleServiceDeconcentres={handleServiceDeconcentres}
              origine={switcher}
            />

            {/* <CCol md="6">
              <div className="p-3">
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel className="font-weight-bold" htmlFor="idRegion">
                      Region d'origine:
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect name="idRegion" id="idRegion">
                      {props.location.regions.length !== 0
                        ? [
                            {
                              idRegion: "Toutes les regions",
                              libelleRegion: "Toutes les regions",
                            },
                            ...props.location.regions,
                          ].map((region, index) => {
                            return (
                              <option key={index} value={region.idRegion}>
                                {region.libelleRegion}
                              </option>
                            );
                          })
                        : null}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="selectDepartement"
                    >
                      Departement d'origine:
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      defaultValue={0}
                      name="selectDepartement"
                      id="selectDepartement"
                    >
                      {departements.length !== 0
                        ? [
                            {
                              idDepartement: "Tout les departements",
                              libelleDepartement: "Tout les departements",
                            },
                            ...departements,
                          ].map((value, index) => {
                            return (
                              <option key={index} value={value.idDepartement}>
                                {value.libelleDepartement}
                              </option>
                            );
                          })
                        : null}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="selectArrondissement"
                    >
                      Arrondissement d'origine:
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      defaultValue={0}
                      name="selectArrondissement"
                      id="selectArrondissement"
                    >
                      {arrondissements.length !== 0
                        ? [
                            {
                              idDepartement: "Tout les arrondissements",
                              libelleArrondissement: "Tout les arrondissements",
                            },
                            ...arrondissements,
                          ].map((value, index) => {
                            return (
                              <option
                                key={index}
                                value={value.idArrondissement}
                              >
                                {value.libelleArrondissement}
                              </option>
                            );
                          })
                        : null}
                    </CSelect>
                  </CCol>
                </CFormGroup>
              </div>
            </CCol> */}
            {/* <CCol>
              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                  custom
                  id="man"
                  checked={checked.manChecked}
                  name="nam"
                  value="1"
                  onChange={onCheckedSexe}
                />
                <CLabel variant="custom-checkbox" htmlFor="man">
                  Homme
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                  checked={checked.womanChecked}
                  onChange={onCheckedSexe}
                  custom
                  id="woman"
                  name="woman"
                  value="2"
                />
                <CLabel variant="custom-checkbox" htmlFor="woman">
                  Femme
                </CLabel>
              </CFormGroup>

              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                  checked={checked.responsable}
                  onChange={onCheckedSexe}
                  custom
                  id="responsable"
                  name="responsable"
                  value="3"
                />
                <CLabel variant="custom-checkbox" htmlFor="responsable">
                  Responsable
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox
                  checked={checked.cadre}
                  onChange={onCheckedSexe}
                  custom
                  id="cadre"
                  name="cadre"
                  value="4"
                />
                <CLabel variant="custom-checkbox" htmlFor="cadre">
                  Cadre / Agents
                </CLabel>
              </CFormGroup>
            </CCol> */}
          </CSubheader>
          <CCard>
            <Can
              role={role}
              yes={() => (
                <CollapseFied
                  toggleCollapse={toggleCollapse}
                  collapse={collapse}
                  personnels={filterData}
                />
              )}
              no={() => ""}
            />
            <CCardBody>
              <CDataTable
                fields={fields}
                itemsPerPage={10}
                items={filterData}
                pagination
                hover
                sorter
                tableFilter
                columnFilter
                clickableRows
                itemsPerPageSelect
                onRowClick={(data) => onHandleModal(data)}
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  categorie: (item) => <td>{item.categorieIdCategorie}</td>,
                  age: (item) => (
                    <td>
                      <CBadge color="primary">
                        {item.dateNaissance === null
                          ? ""
                          : calculateAge(item.dateNaissance)}
                      </CBadge>
                    </td>
                  ),
                  picture: (item, index) => (
                    <div
                      className="c-avatar d-flex justify-content-center
                    align-items-center
                    "
                    >
                      <CImg
                        src={
                          item?.photo
                            ? `${BUCKET_URL}/personnels/${item.personnelIdArchive}/${item.photo}`
                            : `${BUCKET_URL}/default/user.png`
                        }
                        alt="photo de profil"
                        className="c-avatar-img"
                      />
                    </div>
                  ),
                  poste: (item, index) => {
                    return <td key={index}>{item?.postes[0]?.libellePoste}</td>;
                  },
                  grade: (item) => (
                    <td>
                      <CBadge color="success">{item.grade.libelleGrade}</CBadge>
                    </td>
                  ),
                  corps: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.grade.statutAdministratifIdStatut)}
                      >
                        {item.grade.statutAdministratif.libelleStatut}
                      </CBadge>
                    </td>
                  ),
                  categorie: (item) => (
                    <td>{item.grade?.categorieIdCategorie}</td>
                  ),
                  position: (item) => (
                    <td>
                      {
                        <h5>
                          <CBadge
                            className="text-white"
                            color={getBadge(item.position.idPosition)}
                          >
                            {item.position.libelle}
                          </CBadge>
                        </h5>
                      }
                    </td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="Voir le profil du personnel">
                          <CButton
                            color="info"
                            to={`personnels/${item.matricule}`}
                            size="sm"
                          >
                            <FontAwesomeIcon className="mr-2" icon={faEye} />
                            Voir
                          </CButton>
                        </CTooltip>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CCard>
    </>
  );
};

const mapStateToProps = ({
  locationState,
  gardeState,
  corpsState,
  personnelState: {
    statusAdministratif,
    personnelStatusAdmin: { data, total },
  },
}) => ({
  grades: gardeState.grades,
  personnels: data,
  total: total,
  corps: corpsState.corps,
  status: statusAdministratif,
  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
});

const mapDispatchToProps = {
  fetchPersonnelByStatusAdmin,
  fetchCorps,
  displayStatusAdmin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonnelGradeCorps);
