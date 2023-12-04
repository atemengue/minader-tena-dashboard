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
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import {
  faCheck,
  faDoorClosed,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updatePersonnelRetraite } from "../../actions/personnelActions";
import { fetchRetraites } from "../../actions/retraiteActions";
import CollapseFied from "../../common/CollapseField";
import ConfirmDelete from "../../common/ConfirmDelete";
import ExportButton from "../../common/ExportButton";
import useFilterWorkLocation from "../../hooks/useFilterWorkLocation";
import useLocationAll from "../../hooks/useLocationAll";
import Can from "../../RBAC/Can";
import {
  fieldsRetraite,
  getBadge,
  getMonthName,
  months,
} from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";

// memoriser la functopm
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

const Retraites = (props) => {
  const [annee, setannee] = useState(new Date().getFullYear());
  const [mois, setMoins] = useState("0");

  const dispatch = useDispatch();

  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const [personnelSelected, setPersonnelSelected] = useState([]);
  const [personnelIndex, setPersonnelIndex] = useState([]);
  const [confirmModal, setConfirmModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState(false);

  const {} = useLocationAll();

  const {
    fetchRetraites,
    retraites,
    isloadingRetraites,
    updatePersonnelRetraite,
    location,
  } = props;

  useEffect(() => {
    if (retraites.length === 0) {
      fetchRetraites(annee, mois);
    } else {
      setFilterData(retraites);
    }
  }, [annee, mois, retraites]);

  const role = localStorage.getItem("roles");

  const onChangeYear = (year) => {
    setannee(year);
    fetchRetraites(year, mois);
  };

  const onChangeMonth = (value) => {
    setMoins(value);
    fetchRetraites(annee, value);
  };

  const validatedRetraite = () => {
    setLoader(true);
    updatePersonnelRetraite(personnelIndex, 2)
      .then(() => {
        setLoader(false);
        fetchRetraites(annee, mois);
        toast.success("Retraites validées");
      })
      .catch((error) => {
        toast.error("Erreur serveur");
        setLoader(false);
      });
  };

  const validatedAll = () => {
    setLoader(true);
    let matricules = [];
    retraites.forEach((personnel) => {
      matricules = [...matricules, personnel.matricule];
    });
    updatePersonnelRetraite(matricules, 2)
      .then(() => {
        setLoader(false);
        fetchRetraites(annee, mois);
        toast.success("Retraites validées");
      })
      .catch((error) => {
        toast.error("Erreur serveur");
        setLoader(false);
      });
  };

  const onSelectPersonnel = (personnel) => {
    const { matricule } = personnel;
    let personnels = [...personnelSelected];
    let tabs = [...personnelIndex];
    if (!tabs.includes(matricule)) {
      let personnelIndex = [...tabs, matricule];
      let newPersonnel = {
        matricule: matricule,
        checked: true,
        ...personnel,
      };
      personnels = [...personnelSelected, newPersonnel];
      setPersonnelSelected(personnels);
      setPersonnelIndex(personnelIndex);
    } else {
      let position = tabs.indexOf(matricule);
      personnels.splice(position, 1);
      tabs.splice(position, 1);
      setPersonnelSelected(personnels);
      setPersonnelIndex(tabs);
    }
  };

  const toggle = () => {
    setConfirmModal(!confirmModal);
  };

  const {
    handleWorkLocation,
    idLocation,
    departements,
    arrondissements,
    filterState,
    filterData,
    setFilterData,
    setIdLocation,
    setDepartements,
    setArrondissements,
  } = useFilterWorkLocation(
    retraites,
    location.departements,
    location.arrondissements
  );

  return (
    <>
      {loader && <div class="loader-absolute">Loading&#8230;</div>}

      <ConfirmDelete
        header="Validation des retraites"
        message={`valider les retraites du mois de ${getMonthName(
          mois
        )} ${annee}`}
        modal={confirmModal}
        toggle={toggle}
        onValidated={validatedAll}
      />
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <div>
                  <h4>RETRAITE: {annee}</h4>
                  <h5>Mois de: {getMonthName(mois)} </h5>
                  <CBadge color="success">
                    <h5>Total: {filterData.length} </h5>
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
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Can
                  role={role}
                  yes={() => (
                    <>
                      <CButton
                        disabled={personnelSelected.length > 0 ? false : true}
                        onClick={toggle}
                        className="m-2"
                        color="warning"
                        size="xl"
                      >
                        <FontAwesomeIcon className="mr-2" icon={faCheck} />
                        Valider les retraites du mois de {getMonthName(mois)} ?
                      </CButton>

                      <CButton
                        disabled={personnelSelected.length > 0 ? false : true}
                        className="m-2"
                        color="info"
                        size="xl"
                        onClick={validatedRetraite}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={faDoorClosed}
                          color="warning"
                        />
                        Mise en retraite du personnel selectionnés
                      </CButton>
                    </>
                  )}
                  no={() => ""}
                />
              </div>
              <div className="d-flex align-items-center justify-content-center">
                {!props.fieldsRetraite && (
                  <Can
                    role={role}
                    yes={() => (
                      <CollapseFied
                        toggleCollapse={toggleCollapse}
                        collapse={collapse}
                        personnels={
                          personnelSelected.length > 0
                            ? personnelSelected
                            : props.retraites
                        }
                      />
                    )}
                    no={() => ""}
                  />
                )}
              </div>
              <CCol md="6">
                <div className="p-3">
                  {/* <CFormGroup row>
                  <CCol md="4">
                    <CFormGroup variant="custom-checkbox" inline>
                      <CLabel
                        className="font-weight-bold"
                        variant="custom-checkbox"
                        htmlFor="deconcentres"
                      >
                        Services Deconcentrés
                      </CLabel>
                      <CInputCheckbox
                        onChange={onCheckedServiceDeconcentre}
                        custom
                        checked={filterState.deconcentres}
                        id="deconcentres"
                        name="deconcentres"
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" md="8"></CCol>
                </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="4">
                      <CLabel className="font-weight-bold" htmlFor="idRegion">
                        Region de Travail:
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CSelect
                        value={idLocation.idRegion}
                        name="idRegion"
                        id="idRegion"
                        onChange={(event) => handleWorkLocation(event)}
                      >
                        {props.location.regions.length !== 0
                          ? [
                              {
                                idRegion: -1,
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
                  </CFormGroup> */}

                  {/* <CFormGroup row>
                    <CCol md="4">
                      <CLabel
                        className="font-weight-bold"
                        htmlFor="idDepartement"
                      >
                        Departement de travail:
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CSelect
                        value={idLocation.idDepartement}
                        name="idDepartement"
                        id="idDepartement"
                        onChange={(event) => handleWorkLocation(event)}
                      >
                        {departements.length !== 0
                          ? [
                              {
                                idDepartement: -2,
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
                  </CFormGroup> */}
                  {/* <CFormGroup row>
                    <CCol md="4">
                      <CLabel
                        className="font-weight-bold"
                        htmlFor="idArrondissement"
                      >
                        Arrondissement de travail:
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="8">
                      <CSelect
                        value={idLocation.idArrondissement}
                        name="idArrondissement"
                        id="idArrondissement"
                        onChange={(event) => handleWorkLocation(event)}
                      >
                        {arrondissements.length !== 0
                          ? [
                              {
                                idArrondissement: -3, // bad code
                                libelleArrondissement:
                                  "Tout les arrondissements",
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
                  </CFormGroup> */}
                </div>
              </CCol>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={filterData}
                fields={fieldsRetraite}
                itemsPerPage={100}
                pagination
                hover
                itemsPerPageSelect
                loading={isloadingRetraites}
                sorter
                tableFilter
                columnFilter
                clickableRows
                striped
                bordered
                scopedSlots={{
                  check: (item, index) => (
                    <td className="text-center">
                      <CInputCheckbox
                        className="check-retraite"
                        id={item.matricule}
                        name="retraite"
                        value={item.matricule}
                        checked={
                          personnelIndex.includes(item.matricule) ? true : false
                        }
                        onChange={(_) => onSelectPersonnel(item)}
                      />
                    </td>
                  ),
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
                  position: (item) => (
                    <td>
                      {
                        <CBadge
                          className="text-white"
                          color={
                            parseInt(item.position.idPosition) === 2 ||
                            parseInt(item.position.idPosition) === 13 ||
                            parseInt(item.position.idPosition) === 14
                              ? "danger"
                              : "primary"
                          }
                        >
                          {item.position.libelle}
                        </CBadge>
                      }
                    </td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CTooltip content={" Voir le profil du personnel"}>
                          <CButton
                            to={`/personnels/${item.matricule}`}
                            color="info"
                            size="sm"
                          >
                            <FontAwesomeIcon icon={faEye} />
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

const mapStateToProps = ({ retraiteState, locationState }) => ({
  isloadingRetraites: retraiteState.isloadingRetraites,
  retraites: retraiteState.retraites,
  retraiteNumber: retraiteState.retraiteNumber,
  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
});

export default connect(mapStateToProps, {
  fetchRetraites,
  updatePersonnelRetraite,
})(Retraites);
