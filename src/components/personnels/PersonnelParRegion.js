import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions/configurationActions";
import { fetchPersonnelsActifs } from "../../actions/personnelActions";
import { fetchPositions } from "../../actions/positionActions";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import SelectWorkLocation from "../../common/SelectWorkLocation";
import useFilterWorkLocation from "../../hooks/useFilterWorkLocation";
import useLocationAll from "../../hooks/useLocationAll";
import Can from "../../RBAC/Can";
import {
  fields25000,
  getArrondissement,
  getBadge,
  getDepartement,
  getRegion,
} from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
getArrondissement;

const PersonnelParRegion = (props) => {
  const { actifs, profile, fetchCategories, categories, location } = props;

  const [collapse, setCollapse] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [name, setName] = useState("men");

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
    responsable: false,
  });

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const { isLoading } = useLocationAll();

  const { isError, data, refetch, isFetching } = useQuery(
    "personnelsActifs",
    () => fetchPersonnelsActifs(),
    {
      onSuccess: (response) => {
        setFilterData(response.data?.data);
      },
    }
  );

  useEffect(() => {
    if (props.positionList.length === 0) {
      props.fetchPositions(); // ajouter en memo
    }

    if (categories.length === 0) {
      fetchCategories(); // ajouter en memo
    }
  }, []);

  // const onChangeCategorie = (categorie) => {
  //   setIdLocation({
  //     idRegion: -1,
  //     idDepartement: null,
  //     idArrondissement: null,
  //   });

  //   setCategorie(categorie);
  //   if (categorie === "Toutes les catégories") {
  //     setFilterData(actifs);
  //   } else {
  //     let personnels = actifs.filter(
  //       (item) => item?.grade?.categorieIdCategorie === categorie
  //     );
  //     setFilterData(personnels);
  //   }
  // };

  // const onChangePosition = (position) => {
  //   if (position === "Toutes les Positions") {
  //     fetchPersonnelsActifs();
  //   } else {
  //     let personnels = actifs.filter(
  //       (item) => item?.position?.idPosition == position
  //     );

  //     setFilterPersonnels({
  //       ...filterData,
  //       byPosition: personnels,
  //       items: personnels,
  //     });
  //   }
  // };
  // mauvais code

  const onCheckedSexe = (event) => {
    // switch (parseInt(event.target.value)) {
    //   case 1:
    //     setChecked({
    //       ...checked,
    //       manChecked: event.target.checked,
    //       womanChecked: false,
    //     });
    //     if (event.target.checked) {
    //       let men = actifs.filter((personnel) => personnel.sexe === "1");
    //       if (checked.fonctionnaireChecked) {
    //         men = actifs.filter(
    //           (personnel) =>
    //             personnel.sexe === "1" &&
    //             personnel.grade.statutAdministratifIdStatut === 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: men,
    //         });
    //       }
    //       if (checked.contractuelChecked) {
    //         men = actifs.filter(
    //           (personnel) =>
    //             personnel.sexe === "1" &&
    //             personnel.grade.statutAdministratifIdStatut !== 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: men,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: men,
    //       });
    //     } else {
    //       let data = actifs;
    //       if (checked.fonctionnaireChecked) {
    //         data = actifs.filter(
    //           (personnel) => personnel.grade.statutAdministratifIdStatut === 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       if (checked.contractuelChecked) {
    //         data = actifs.filter(
    //           (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: data,
    //       });
    //     }
    //     break;
    //   case 2:
    //     setChecked({
    //       ...checked,
    //       manChecked: false,
    //       womanChecked: event.target.checked,
    //     });
    //     if (event.target.checked) {
    //       let women = actifs.filter((personnel) => personnel.sexe === "2");
    //       if (checked.fonctionnaireChecked) {
    //         women = actifs.filter(
    //           (personnel) =>
    //             personnel.sexe === "2" &&
    //             personnel.grade.statutAdministratifIdStatut === 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: women,
    //         });
    //       }
    //       if (checked.contractuelChecked) {
    //         women = actifs.filter(
    //           (personnel) =>
    //             personnel.sexe === "2" &&
    //             personnel.grade.statutAdministratifIdStatut !== 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: women,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: women,
    //       });
    //     } else {
    //       let data = actifs;
    //       if (checked.fonctionnaireChecked) {
    //         data = actifs.filter(
    //           (personnel) => personnel.grade.statutAdministratifIdStatut === 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       if (checked.contractuelChecked) {
    //         data = actifs.filter(
    //           (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: data,
    //       });
    //     }
    //     break;
    //   case 3:
    //     setChecked({
    //       ...checked,
    //       contractuelChecked: false,
    //       fonctionnaireChecked: event.target.checked,
    //     });
    //     if (event.target.checked) {
    //       let fonctionnaires = filterData.items.filter(
    //         (personnel) => personnel.grade.statutAdministratifIdStatut === 1
    //       );
    //       if (checked.manChecked) {
    //         fonctionnaires = filterData.items.filter(
    //           (personnel) =>
    //             personnel.sexe === "1" &&
    //             personnel.grade.statutAdministratifIdStatut === 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: fonctionnaires,
    //         });
    //       }
    //       if (checked.womanChecked) {
    //         fonctionnaires = filterData.items.filter(
    //           (personnel) =>
    //             personnel.sexe === "2" &&
    //             personnel.grade.statutAdministratifIdStatut === 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: fonctionnaires,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: fonctionnaires,
    //       });
    //     } else {
    //       let data = filterData.items;
    //       if (checked.manChecked) {
    //         data = filterData.items.filter(
    //           (personnel) => personnel.sexe === "1"
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       if (checked.womanChecked) {
    //         data = filterData.items.filter(
    //           (personnel) => personnel.sexe === "2"
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: data,
    //       });
    //     }
    //     break;
    //   case 4:
    //     setChecked({
    //       ...checked,
    //       fonctionnaireChecked: false,
    //       contractuelChecked: event.target.checked,
    //     });
    //     if (event.target.checked) {
    //       let contractuels = filterData.items.filter(
    //         (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
    //       );
    //       if (checked.manChecked) {
    //         contractuels = filterData.items.filter(
    //           (personnel) =>
    //             personnel.sexe === "1" &&
    //             personnel.grade.statutAdministratifIdStatut !== 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: contractuels,
    //         });
    //       }
    //       if (checked.womanChecked) {
    //         contractuels = filterData.items.filter(
    //           (personnel) =>
    //             personnel.sexe === "2" &&
    //             personnel.grade.statutAdministratifIdStatut !== 1
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: contractuels,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: contractuels,
    //       });
    //     } else {
    //       let data = filterData.items;
    //       if (checked.manChecked) {
    //         data = filterData.items.filter(
    //           (personnel) => personnel.sexe === "1"
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       if (checked.womanChecked) {
    //         data = filterData.items.filter(
    //           (personnel) => personnel.sexe === "2"
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: data,
    //       });
    //     }
    //     break;
    //   case 5:
    //     console.log("five");
    //     setChecked({
    //       ...checked,
    //       responsable: event.target.checked,
    //     });
    //     if (event.target.checked) {
    //       let responsable = filterData.items.filter(
    //         (personnel) => personnel.postes.length > 0
    //       );
    //       if (checked.manChecked) {
    //         responsable = filterData.items.filter(
    //           (personnel) =>
    //             personnel.sexe === "1" && personnel.postes.length > 0
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: responsable,
    //         });
    //       }
    //       if (checked.womanChecked) {
    //         responsable = filterData.items.filter(
    //           (personnel) =>
    //             personnel.sexe === "2" && personnel.personnel.postes.length > 0
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: responsable,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: responsable,
    //       });
    //     } else {
    //       let data = filterData.items;
    //       if (checked.manChecked) {
    //         data = filterData.items.filter(
    //           (personnel) => personnel.sexe === "1"
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       if (checked.womanChecked) {
    //         data = filterData.items.filter(
    //           (personnel) => personnel.sexe === "2"
    //         );
    //         setFilterPersonnels({
    //           ...filterData,
    //           items: data,
    //         });
    //       }
    //       setFilterPersonnels({
    //         ...filterData,
    //         items: data,
    //       });
    //     }
    //     break;
    //   default:
    //     setChecked({
    //       manChecked: false,
    //       womanChecked: false,
    //       fonctionnaireChecked: false,
    //       contractuelChecked: false,
    //       responsable: false,
    //     });
    //     break;
    // }
  };

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
    actifs,
    location.departements,
    location.arrondissements
  );

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol className="d-flex justify-content-between">
                  <div>
                    <h4>Total: {filterData?.length}</h4>
                    {/* <h4>Categorie: {getCategorie(categorie)} </h4> */}
                    <h4>Région: {getRegion(idLocation.idRegion)} </h4>
                    <h5>
                      Département:{" "}
                      {getDepartement(departements, idLocation.idDepartement)}{" "}
                    </h5>
                    <h6>
                      Arrondissement:{" "}
                      {getArrondissement(
                        arrondissements,
                        idLocation.idArrondissement
                      )}{" "}
                    </h6>
                  </div>
                  <div>
                    <Can
                      role={profile.roles[0]}
                      yes={() => (
                        <ExportButton
                          collapse={collapse}
                          toggleCollapse={toggleCollapse}
                        />
                      )}
                      no={() => ""}
                    />
                  </div>
                </CCol>
              </CRow>
              <hr />
              <CRow>
                <SelectWorkLocation
                  idLocation={idLocation}
                  handleWorkLocation={handleWorkLocation}
                  regions={location.regions}
                  departements={departements}
                  arrondissements={arrondissements}
                  checkedServiceDeconcentres={checkedServiceDeconcentres}
                  handleServiceDeconcentres={handleServiceDeconcentres}
                />
                {/* <CCol md="4">
                    <CFormGroup row>
                      <CCol md="4">
                        <CLabel
                          className="font-weight-bold"
                          htmlFor="selectRegion"
                        >
                          Categorie:
                        </CLabel>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CSelect
                          onChange={(event) =>
                            onChangeCategorie(event.target.value)
                          }
                          defaultValue={categorie}
                          custom
                          size="md"
                          name="selectSm"
                          id="SelectLm"
                        >
                          {categories.length !== 0
                            ? [
                                {
                                  idCategorie: "Toutes les catégories",
                                  ageRetraite: 0,
                                },
                                ...categories,
                              ].map((categorie, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={categorie.idCategorie}
                                  >
                                    {categorie.idCategorie}
                                  </option>
                                );
                              })
                            : null}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                  </CCol> */}
                {/* <CCol md="4">
                    <CFormGroup row>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          onChange={onCheckedSexe}
                          custom
                          id={`${name}nam`}
                          checked={checked.manChecked}
                          name={`${name}nam`}
                          value="1"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor={`${name}nam`}
                        >
                          Homme
                        </CLabel>
                      </CFormGroup>
                    </CFormGroup>
                    <CFormGroup row>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          checked={checked.womanChecked}
                          onChange={onCheckedSexe}
                          custom
                          id={`${name}woman`}
                          name={`${name}woman`}
                          value="2"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor={`${name}woman`}
                        >
                          Femme
                        </CLabel>
                      </CFormGroup>
                    </CFormGroup>
                    <CFormGroup row>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          checked={checked.fonctionnaireChecked}
                          onChange={onCheckedSexe}
                          custom
                          id={`${name}fonctionnaires`}
                          name={`${name}fonctionnaires`}
                          value="3"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor={`${name}fonctionnaires`}
                        >
                          Fonctionnaires
                        </CLabel>
                      </CFormGroup>
                    </CFormGroup>
                    <CFormGroup row>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          checked={checked.contractuelChecked}
                          onChange={onCheckedSexe}
                          custom
                          id={`${name}contractuel`}
                          name={`${name}contractuel`}
                          value="4"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor={`${name}contractuel`}
                        >
                          Contractuels
                        </CLabel>
                      </CFormGroup>
                    </CFormGroup>
                    <CFormGroup row>
                      <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          checked={checked.responsable}
                          onChange={onCheckedSexe}
                          custom
                          id={`${name}responsable`}
                          name={`${name}responsable`}
                          value="5"
                        />
                        <CLabel
                          variant="custom-checkbox"
                          htmlFor={`${name}responsable`}
                        >
                          Responsable
                        </CLabel>
                      </CFormGroup>
                    </CFormGroup>
                  </CCol> */}
                <CCol>
                  <div>
                    <CollapseFied collapse={collapse} personnels={filterData} />
                  </div>
                </CCol>
              </CRow>
              {/* <div className="d-flex justify-content-between">
                  <div>
                  <h4>Region du: {filterData.items.length}</h4>
                    <h5>Categorie: {getCategorie(categorie)} </h5>
                  </div>

                  <CFormGroup row>
                    <CRow>
                      <CCol md="4">
                        <span className="font-weight" htmlFor="selectSm">
                          Region:
                        </span>
                      </CCol>
                      <CCol xs="12" md="8">
                        <CSelect
                          onChange={(event) =>
                            onChangeCategorie(event.target.value)
                          }
                          defaultValue={categorie}
                          custom
                          size="md"
                          name="selectSm"
                          id="SelectLm"
                        >
                          {categories.length !== 0
                            ? [
                                {
                                  idCategorie: "Toutes les catégories",
                                  ageRetraite: 0,
                                },
                                ...categories,
                              ].map((categorie, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={categorie.idCategorie}
                                  >
                                    {categorie.idCategorie}
                                  </option>
                                );
                              })
                            : null}
                        </CSelect>
                      </CCol>
                    </CRow>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="4">
                      <span className="font-weight" htmlFor="selectSm">
                        Categorie
                      </span>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CSelect
                        onChange={(event) =>
                          onChangeCategorie(event.target.value)
                        }
                        defaultValue={categorie}
                        custom
                        size="md"
                        name="selectSm"
                        id="SelectLm"
                      >
                        {categories.length !== 0
                          ? [
                              {
                                idCategorie: "Toutes les catégories",
                                ageRetraite: 0,
                              },
                              ...categories,
                            ].map((categorie, index) => {
                              return (
                                <option
                                  key={index}
                                  value={categorie.idCategorie}
                                >
                                  {categorie.idCategorie}
                                </option>
                              );
                            })
                          : null}
                      </CSelect>
                    </CCol>
                  </CFormGroup>


                  <Can
                    role={profile.roles[0]}
                    yes={() => (
                      <ExportButton
                        collapse={collapse}
                        toggleCollapse={toggleCollapse}
                      />
                    )}
                    no={() => ""}
                  />
                </div>
                <div className="d-flex">
                  <h5>Position: {getPosition(position)} </h5>
                </div>
                <div>
                  <CCol>
                    <div className="p-3">




                    </div>
                    <hr />
                  </CCol>
                </div>
                <div>
                  <CollapseFied
                    collapse={collapse}
                    personnels={filterData.items}
                  />
                </div> */}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={filterData}
                fields={fields25000}
                itemsPerPage={20}
                pagination
                hover
                loading={isLoading}
                sorter
                tableFilter
                columnFilter
                itemsPerPageSelect
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  corps: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.grade.statutAdministratifIdStatut)}
                      >
                        {item.grade.statutAdministratif.libelleStatut}
                      </CBadge>
                    </td>
                  ),

                  grade: (item) => (
                    <td>
                      <CBadge color="success">{item.grade.libelleGrade}</CBadge>
                    </td>
                  ),

                  age: (item) => {
                    return (
                      <td>
                        <CBadge color="primary">
                          {item.dateNaissance === null
                            ? ""
                            : calculateAge(item.dateNaissance)}
                        </CBadge>
                      </td>
                    );
                  },
                  structure: (item, index) => {
                    return (
                      <td key={index}>
                        {item?.structure?.designationAdministrative}
                      </td>
                    );
                  },
                  poste: (item, index) => {
                    return <td key={index}>{item?.postes[0]?.libellePoste}</td>;
                  },
                  position: (item, index) => {
                    return (
                      <td key={index}>
                        {
                          <CBadge color={getBadge(item.position.idPosition)}>
                            {item.position.libelle}
                          </CBadge>
                        }
                      </td>
                    );
                  },

                  categorie: (item) => (
                    <td>{item?.grade.categorieIdCategorie}</td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="Voir le profil du personnel">
                          <CButton
                            color="info"
                            to={`/personnels/${item.matricule}`}
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
      </CRow>
    </>
  );
};

const mapStateToProps = ({
  personnelState,
  userState,
  categorieState,
  positionState,
  locationState,
}) => ({
  actifs: personnelState.personnelActifs,
  profile: userState.profile,
  categories: categorieState.categories,
  positionList: positionState.positionList,
  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
});

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPositions,
})(PersonnelParRegion);
