import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInputCheckbox,
  CRow,
  CSelect,
} from "@coreui/react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Can from "../../RBAC/Can";
import {
  deletePostes,
  fetchPostes,
  fetchRangPostes,
} from "../../actions/posteActions";
import {
  fetchNaturePostes,
  fetchPosteByNature,
} from "../../actions/structureActions";
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollapseFieldPoste from "../../common/CollapseFieldPoste";
import ConfirmDelete from "../../common/ConfirmDelete";
import ExportButton from "../../common/ExportButton";
import SecurityContent from "../../common/SecurityContent";
import SelectWorkLocation from "../../common/SelectWorkLocation";
import useFilterLocationPoste from "../../hooks/useFilterLocationPoste";
import useLocationAll from "../../hooks/useLocationAll";
import {
  fieldsAllPoste,
  getArrondissement,
  getBadge,
  getDepartement,
  getNaturePoste,
  getRangPoste,
  getRegion,
} from "../../utils/dataTables";

const AllPostes = (props) => {
  const {
    fetchPostes,
    postes,
    isLoading,
    natureList,
    fetchNaturePostes,
    fetchPosteByNature,
    rangList,
    deletePostes,
    location,
    fetchRangPostes,
  } = props;

  const [filterPostes, setFilterPostes] = useState([]);
  const [naturePoste, setNaturePoste] = useState(100); // nauvais code  ici
  const [rangPoste, setRangPoste] = useState(100);
  const [posteSelected, setPosteSelected] = useState([]);
  const [postesIndex, setPostesIndex] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    retraite: false,
    vaccant: false,
  });

  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
        });
        if (event.target.checked) {
          let men = filterData.filter((personnel) => personnel._sexe === "1");
          if (checked.fonctionnaireChecked) {
            men = filterData.filter(
              (personnel) =>
                personnel._sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(men);
          }

          if (checked.contractuelChecked) {
            men = filterData.filter(
              (personnel) =>
                personnel._sexe === "1" &&
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
        }
        break;

      case 2:
        setChecked({
          ...checked,
          manChecked: false,
          womanChecked: event.target.checked,
        });

        if (event.target.checked) {
          let women = filterData.filter((personnel) => personnel._sexe === "2");
          if (checked.fonctionnaireChecked) {
            women = filterData.filter(
              (personnel) =>
                personnel._sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(women);
          }

          if (checked.contractuelChecked) {
            women = filterData.filter(
              (personnel) =>
                personnel._sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(women);
          }
          setFilterData(women);
        } else {
          let data = postes;
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
                personnel._sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(fonctionnaires);
          }

          if (checked.womanChecked) {
            fonctionnaires = filterData.filter(
              (personnel) =>
                personnel._sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterData(fonctionnaires);
          }
          setFilterData(fonctionnaires);
        } else {
          let data = postes;
          if (checked.manChecked) {
            data = filterData.filter((personnel) => personnel._sexe === "1");
            setFilterData(data);
          }

          if (checked.womanChecked) {
            data = filterData.filter((personnel) => personnel._sexe === "2");
            setFilterData(data);
          }
          setFilterData(data);
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
                personnel._sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(contractuels);
          }

          if (checked.womanChecked) {
            contractuels = filterData.filter(
              (personnel) =>
                personnel._sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterData(contractuels);
          }
          setFilterData(contractuels);
        } else {
          let data = postes;
          if (checked.manChecked) {
            data = filterData.filter((personnel) => personnel._sexe === "1");
            setFilterData(data);
          }

          if (checked.womanChecked) {
            data = filterData.filter((personnel) => personnel._sexe === "2");
            setFilterData(data);
          }
          setFilterData(data);
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

  const role = localStorage.getItem("roles");
  const {} = useLocationAll(); // revoir son utilisation

  useEffect(() => {
    // revoir le code ici pour un hooks
    if (postes.length === 0) {
      fetchPostes();
    } else {
      setFilterData(postes);
    }

    if (natureList.length === 0) {
      fetchNaturePostes();
    }

    if (rangList.length === 0) {
      fetchRangPostes();
    }
  }, [natureList, rangList, postes]);

  const toggle = () => {
    setDeleteModal(!deleteModal);
  };

  const onSelectPoste = (idPoste) => {
    idPoste = parseInt(idPoste);
    let postes = [...posteSelected];
    let tabs = [...postesIndex];
    if (!tabs.includes(idPoste)) {
      let postesIndex = [...tabs, idPoste];
      let poste = {
        idPoste: idPoste,
        checked: true,
      };
      postes = [...posteSelected, poste];
      setPosteSelected(postes);
      setPostesIndex(postesIndex);
    } else {
      let position = tabs.indexOf(idPoste);
      postes.splice(position, 1);
      tabs.splice(position, 1);
      setPosteSelected(postes);
      setPostesIndex(tabs);
    }
  };

  const {
    handleWorkLocation,
    idLocation,
    departements,
    arrondissements,
    checkedServiceDeconcentres,
    handleServiceDeconcentres,
    filterData,
    setFilterData,
    setIdLocation,
    setDepartements,
    setArrondissements,
  } = useFilterLocationPoste(
    filterPostes,
    location.departements,
    location.arrondissements
  );
  const onValidated = () => {
    onDeletePoste();
  };

  const onDeletePoste = () => {
    deletePostes(postesIndex).then((_) => {
      // CODE SUPER BALEZE ICI
      let newData = filterData.filter(function (obj) {
        return !this.has(obj.idPoste);
      }, new Set(posteSelected.map((obj) => obj.idPoste)));

      setFilterPostes(newData);
      setPosteSelected([]);
      setPostesIndex([]);
      toast.success("postes supprimés");
    });
  };

  const onChangeNature = (nature) => {
    setRangPoste(null);
    setIdLocation({
      idRegion: -1,
      idDepartement: null,
      idArrondissement: null,
    });
    setDepartements([]);
    setArrondissements([]);
    setRangPoste(100);

    nature = parseInt(nature);
    setNaturePoste(nature);
    if (nature === 100) {
      fetchPostes();
    } else {
      let postesFilter = postes.filter(
        (item) => item.naturePosteIdNaturePoste === nature
      );

      setFilterData(postesFilter);
    }
  };

  const onChangeRangPoste = (rang) => {
    setNaturePoste(null);
    setIdLocation({
      idRegion: -1,
      idDepartement: null,
      idArrondissement: null,
    });
    setDepartements([]);
    setArrondissements([]);
    setNaturePoste(100);

    rang = parseInt(rang);
    setRangPoste(rang);
    if (rang === null) {
      fetchPostes();
    } else {
      // let postesFilter = postes.filter(
      //   (item) => item?.naturePoste?.rangPoste?.idRangPoste === rang
      // );
      setFilterData(postesFilter);
    }
  };

  return (
    <>
      <ConfirmDelete
        message="les postes selectionnés"
        modal={deleteModal}
        toggle={toggle}
        onValidated={onValidated}
      />
      <Can
        role={role}
        yes={() => (
          <CRow>
            <CCol xl="12" lg="12">
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol className="d-flex justify-content-between">
                      <h4>
                        {rangPoste
                          ? getRangPoste(rangPoste)
                          : getNaturePoste(naturePoste)}
                        : {filterData.length}
                      </h4>
                    </CCol>
                  </CRow>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>Région: {getRegion(idLocation.idRegion)} </h6>
                      <h6>
                        Département:
                        {getDepartement(departements, idLocation.idDepartement)}
                      </h6>
                      <h6>
                        Arrondissement:
                        {getArrondissement(
                          arrondissements,
                          idLocation.idArrondissement
                        )}
                      </h6>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <CFormGroup>
                        <CCol className="d-flex justify-content-center align-items-center">
                          <h5 className="mr-3 mt-2" htmlFor="selectRang">
                            Rang:
                          </h5>

                          <CSelect
                            onChange={(event) =>
                              onChangeRangPoste(event.target.value)
                            }
                            custom
                            value={rangPoste}
                            size="xl"
                            name="selectRang"
                            id="selectRang"
                          >
                            {rangList.length !== 0
                              ? [
                                  {
                                    idRangPoste: null,
                                    libelleRangPoste: "Tout les rang de postes",
                                  },
                                  ...rangList,
                                ].map((rang, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={rang.idRangPoste}
                                    >
                                      {rang.libelleRangPoste}
                                    </option>
                                  );
                                })
                              : []}
                          </CSelect>
                        </CCol>
                      </CFormGroup>

                      <CFormGroup>
                        <CCol className="d-flex justify-content-center align-items-center">
                          <h5 className="mr-3 mt-2" htmlFor="selectSm">
                            Nature:
                          </h5>

                          <CSelect
                            onChange={(event) =>
                              onChangeNature(event.target.value)
                            }
                            custom
                            value={naturePoste}
                            size="xl"
                            name="selectSm"
                            id="SelectLm"
                          >
                            {natureList.length !== 0
                              ? natureList.map((nature, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={nature.idNaturePoste}
                                    >
                                      {nature.libelleNaturePoste}
                                    </option>
                                  );
                                })
                              : []}
                          </CSelect>
                        </CCol>
                      </CFormGroup>
                    </div>
                  </div>

                  {/* Select Regions, Arrondissements, departemens Components */}
                  {/* <SelectWorkLocation
                    idLocation={idLocation}
                    handleWorkLocation={handleWorkLocation}
                    regions={location.regions}
                    departements={departements}
                    arrondissements={arrondissements}
                    checkedServiceDeconcentres={checkedServiceDeconcentres}
                    handleServiceDeconcentres={handleServiceDeconcentres}
                  /> */}

                  <CheckSexeAndStatut
                    name="allposte"
                    onCheckedSexe={onCheckedSexe}
                    checked={checked}
                    statusAdmin={false}
                  />
                  <div className="d-flex justify-content-between">
                    <CButton
                      // disabled={posteSelected.length > 0 ? false : true}
                      disabled={true}
                      className="m-2"
                      color="danger"
                      size="sm"
                      onClick={(_) => toggle()}
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faTrashAlt}
                        color="white"
                      />
                      Supprimer les postes
                    </CButton>
                    <ExportButton
                      collapse={collapse}
                      toggleCollapse={toggleCollapse}
                    />
                  </div>
                  <CollapseFieldPoste
                    collapse={collapse}
                    postes={filterData}
                    name="nature"
                  />
                  <hr />
                </CCardHeader>
                <CCardBody>
                  <CDataTable
                    itemsPerPage={10}
                    items={filterData}
                    loading={isLoading}
                    pagination
                    itemsPerPageSelect
                    hover
                    fields={fieldsAllPoste}
                    sorter
                    tableFilter
                    columnFilter
                    clickableRows
                    bordered
                    scopedSlots={{
                      check: (item, index) => (
                        <td className="text-center">
                          <CInputCheckbox
                            id={index}
                            name={item.codePoste}
                            value={item.idPoste}
                            checked={
                              postesIndex.includes(item.idPoste) ? true : false
                            }
                            onChange={(value) =>
                              onSelectPoste(value.target.value)
                            }
                          />
                        </td>
                      ),
                      Numero: (item, index) => <td>{++index}</td>,
                      Structure: (item, index) => {
                        const structure = item.structure;
                        return structure ? (
                          <td key={index}>
                            {structure.designationAdministrative}
                          </td>
                        ) : (
                          <td key={index}></td>
                        );
                      },
                      occupant: (item, index) => {
                        const personnel = item.occupant;
                        return personnel ? (
                          <td key={index}>{item.personnel.nomsPrenoms}</td>
                        ) : (
                          <td key={index}>
                            {<CBadge color="danger">Poste vacant</CBadge>}
                          </td>
                        );
                      },
                      matriculeOccupant: (item, index) => {
                        const matricule = item.matriculeOccupant;
                        return matricule ? (
                          <td key={index}>{item.matriculeOccupant}</td>
                        ) : (
                          <td key={index}></td>
                        );
                      },
                      NaturePoste: (item, index) => {
                        const naturePoste = item.naturePoste;
                        return naturePoste ? (
                          <td key={index}>
                            {item.naturePoste.libelleNaturePoste}
                          </td>
                        ) : (
                          <td key={index}></td>
                        );
                      },

                      Position: (item, index) => {
                        const position = item.personnel;
                        return position ? (
                          <td>
                            {
                              <CBadge
                                color={getBadge(
                                  item.personnel.position.idPosition
                                )}
                              >
                                {item.personnel.position.libelle}
                              </CBadge>
                            }
                          </td>
                        ) : (
                          <td key={index}>
                            {<CBadge color="danger">Poste vacant</CBadge>}
                          </td>
                        );
                      },

                      Voir: (item, index) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              to={`postes/details/${item.idPoste}`}
                            >
                              Voir
                            </CButton>
                          </td>
                        );
                      },
                    }}
                  />
                </CCardBody>
                <CCardFooter></CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        )}
        no={() => <SecurityContent />}
      />
    </>
  );
};

const mapStateToProps = ({ posteState, locationState }) => ({
  rangList: posteState.rangList,
  postes: posteState.postes,
  natureList: posteState.natureList,
  isLoading: posteState.isLoadindAllPoste,
  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
});

export default connect(mapStateToProps, {
  fetchRangPostes,
  fetchPostes,
  deletePostes,
  fetchNaturePostes,
  fetchPosteByNature,
})(AllPostes);
