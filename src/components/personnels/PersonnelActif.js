import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFormGroup,
  CInputRadio,
  CLabel,
  CRow,
  CSelect,
  CSubheader,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import CanLevelOne from "../../RBAC/CanLevelOne";
import { fetchCategories } from "../../actions/configurationActions";
import { fetchPersonnelsActifs } from "../../actions/personnelActions";
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import FilterButton from "../../common/FilterButton";
import SelectWorkLocation from "../../common/SelectWorkLocation";
import useFilterWorkLocation from "../../hooks/useFilterWorkLocation";
import useLocationAll from "../../hooks/useLocationAll";
import { getCategorie } from "../../utils/dataTables";
import PersonnelTable from "../configuration/tableComponent/PersonnelTable";
import PersonnelModal from "./PersonnelModal";

const PersonnelActif = (props) => {
  const { profile, fetchCategories, categories, location } = props;
  const [modal, setModal] = useState(false);
  const [personnelDetail, setPersonnelDetail] = useState("");

  const [collapse, setCollapse] = useState(false);
  const [categorie, setCategorie] = useState("");

  const [collapseRegionFilter, setCollapseRegionFilter] = useState(false);
  const [filterPersonnels, setFilterPersonnels] = useState([]);
  const [secondFilterPersonnels, setSecondFilterPersonnels] = useState([]);
  const [switcher, setSwitcher] = useState(false);

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
  });

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
    filterPersonnels,
    location.departements,
    location.arrondissements,
    switcher
  );

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
          if (checked.fonctionnaireChecked) {
            men = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(men);
          }

          if (checked.contractuelChecked) {
            men = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(men);
          }
          setFilterData(men);
        } else {
          let data = filterData;
          if (checked.fonctionnaireChecked) {
            data = filterData.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(data);
          }

          if (checked.contractuelChecked) {
            data = filterData.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(data);
          }
          setFilterData(data);
          clearLocationStatus();
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
          if (checked.fonctionnaireChecked) {
            women = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(women);
          }

          if (checked.contractuelChecked) {
            women = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(women);
          }
          setFilterData(women);
        } else {
          let data = filterPersonnels;
          if (checked.fonctionnaireChecked) {
            data = filterData.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(data);
          }

          if (checked.contractuelChecked) {
            data = filterData.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(data);
          }
          setFilterData(data);
          clearLocationStatus();
        }

        break;
      case 3:
        setChecked({
          ...checked,
          contractuelChecked: false,
          fonctionnaireChecked: event.target.checked,
        });

        if (event.target.checked) {
          let fonctionnaires = filterData.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut === 1
          );
          if (checked.manChecked) {
            fonctionnaires = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(fonctionnaires);
          }

          if (checked.womanChecked) {
            fonctionnaires = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(fonctionnaires);
          }
          setFilterData(fonctionnaires);
        } else {
          let data = filterPersonnels;
          if (checked.manChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "1");
            setFilterData(data);
          }

          if (checked.womanChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "2");
            setFilterData(data);
          }
          setFilterData(data);
          clearLocationStatus();
        }

        break;
      case 4:
        setChecked({
          ...checked,
          fonctionnaireChecked: false,
          contractuelChecked: event.target.checked,
        });

        if (event.target.checked) {
          let contractuels = filterData.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
          );
          if (checked.manChecked) {
            contractuels = filterData.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(contractuels);
          }

          if (checked.womanChecked) {
            contractuels = filterData.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(contractuels);
          }
          setFilterData(contractuels);
        } else {
          let data = filterPersonnels;
          if (checked.manChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "1");
            setFilterData(data);
          }

          if (checked.womanChecked) {
            data = filterData.filter((personnel) => personnel.sexe === "2");
            setFilterData(data);
          }
          setFilterData(data);
          clearLocationStatus();
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

  const { isLoading, isError, data, refetch, isFetching } = useQuery(
    "personnelsActifs",
    () => fetchPersonnelsActifs(),
    {
      onSuccess: (response) => {
        setFilterPersonnels(response.data?.data);
        setFilterData(response.data?.data);
      },
    }
  );

  const { isError: error } = useLocationAll();

  const toggleCollapse = (e) => {
    e.preventDefault();
    setCollapse(!collapse);
  };

  const toggleCollapseFilter = (e) => {
    e.preventDefault();
    setCollapseRegionFilter(!collapseRegionFilter);
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(); // ajouter en memo
    }
  }, []);

  const onChangeCategorie = (categorie) => {
    setCategorie(categorie);
    if (categorie === "Toutes les catégories") {
      refetch();
    } else {
      // revoir API pour formater la reponse
      let personnels = data?.data?.data.filter(
        (item) => item?.grade?.categorieIdCategorie === categorie
      );
      setFilterData(personnels);
      setSecondFilterPersonnels(personnels);
      setFilterPersonnels(personnels);
    }
    clearLocationStatus();
    clearCheckedSexe();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  const clearLocationStatus = () => {
    setIdLocation({
      idRegion: -1,
      idDepartement: null,
      idArrondissement: null,
    });
    setDepartements([]);
    setArrondissements([]);
  };

  const clearCheckedSexe = () => {
    setChecked({
      manChecked: false,
      womanChecked: false,
      fonctionnaireChecked: false,
      contractuelChecked: false,
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner-border spinner-boder-xl" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <CRow>
          <PersonnelModal
            modal={modal}
            toggle={toggle}
            data={personnelDetail}
          />

          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader className="d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Personnel en Activité: {filterData?.length}</h4>
                    <h5>Categorie: {getCategorie(categorie)} </h5>
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
                    {isFetching && (
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </div>
                </div>
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
                              <option key={index} value={categorie.idCategorie}>
                                {categorie.idCategorie}
                              </option>
                            );
                          })
                        : null}
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <div className="d-flex justify-content-between">
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
                  <CanLevelOne
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

                {/* Filter by region */}
              </CCardHeader>
              <CCol lg="12" md="12" xs="12">
                <CSubheader>
                  {/* <CCollapse show={collapseRegionFilter}> */}
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
                  {/* </CCollapse> */}

                  <CheckSexeAndStatut
                    name="actif"
                    onCheckedSexe={onCheckedSexe}
                    checked={checked}
                    statusAdmin={false}
                  />
                </CSubheader>
              </CCol>
              <CCol>
                <div>
                  <CollapseFied collapse={collapse} personnels={filterData} />
                </div>
              </CCol>
              <CCardBody>
                <PersonnelTable
                  onHandleModal={onHandleModal}
                  data={filterData}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </>
  );
};

const mapStateToProps = ({ userState, categorieState, locationState }) => ({
  profile: userState.profile,
  categories: categorieState.categories,
  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
});

export default connect(mapStateToProps, {
  fetchCategories,
})(PersonnelActif);
