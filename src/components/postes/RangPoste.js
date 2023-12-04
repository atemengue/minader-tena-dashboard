import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollapseFieldPoste from "../../common/CollapseFieldPoste";
import ExportButton from "../../common/ExportButton";
import SelectWorkLocation from "../../common/SelectWorkLocation";
import useFilterLocationPoste from "../../hooks/useFilterLocationPoste";
import useLocationAll from "../../hooks/useLocationAll";
import {
  fieldsRangPoste,
  getBadge,
  getRangPoste,
} from "../../utils/dataTables";

const RangPoste = ({
  location,
  postes,
  rangList,
  fetchPosteByRang,
  ...props
}) => {
  const [rangPoste, setRangPoste] = useState(3);

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
    vacant: false,
  });

  const role = localStorage.getItem("roles");
  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  useEffect(() => {
    setFilterData(postes);
  }, [postes]);

  const onChangeRang = (rang) => {
    setRangPoste(rang);
    fetchPosteByRang(rang);
  };

  const { isError, isLoading } = useLocationAll();

  const {
    handleWorkLocation,
    idLocation,
    departements,
    arrondissements,
    filterData,
    setFilterData,
    checkedServiceDeconcentres,
    handleServiceDeconcentres,
  } = useFilterLocationPoste(
    postes,
    location.departements,
    location.arrondissements
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
      case 5:
        setChecked({
          vaccant: event.target.checked,
          womanChecked: false,
          manChecked: false,
        });

        if (event.target.checked) {
          const vacants = filterData.filter(
            ({ occupant }) => occupant === null
          );
          setFilterData(vacants);
        } else {
          let data = postes;
          setFilterData(data);
        }

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

  return (
    <CCard>
      {console.log(filterData, 'DATA PERSONNELS')}
      <CCardHeader>
        <div className="d-flex justify-content-between">
          <div>
            <h4>Rang de: {getRangPoste(rangPoste)}</h4>
            <h5>Total: {filterData.length}</h5>
          </div>
          <CFormGroup row>
            <CCol xs="12" md="12">
              <CSelect
                onChange={(event) => onChangeRang(event.target.value)}
                defaultValue={rangPoste}
                custom
                size="md"
                name="selectSm"
                id="SelectLm"
              >
                {rangList.length !== 0
                  ? rangList.map((rang, index) => {
                    return (
                      <option key={index} value={rang.idRangPoste}>
                        {rang.libelleRangPoste}
                      </option>
                    );
                  })
                  : null}
              </CSelect>
            </CCol>
          </CFormGroup>
          <ExportButton toggleCollapse={toggleCollapse} collapse={collapse} />
        </div>
        <div>
          <SelectWorkLocation
            idLocation={idLocation}
            handleWorkLocation={handleWorkLocation}
            regions={location.regions}
            departements={departements}
            arrondissements={arrondissements}
            checkedServiceDeconcentres={checkedServiceDeconcentres}
            handleServiceDeconcentres={handleServiceDeconcentres}
          />

          <CheckSexeAndStatut
            name="rangposte"
            onCheckedSexe={onCheckedSexe}
            checked={checked}
            ewq
            statusAdmin={false}
          />
        </div>
        <CollapseFieldPoste
          collapse={collapse}
          postes={filterData}
          name="rang"
        />
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={filterData}
          fields={fieldsRangPoste}
          itemsPerPage={20}
          itemsPerPageSelect
          pagination
          loading={props.isLoadingPosteByRang}
          hover
          header
          sorter
          tableFilter
          columnFilter
          clickableRows
          striped
          bordered
          scopedSlots={{
            Numero: (item, index) => <td>{++index}</td>,
            Structure: (item, index) => {
              const structure = item.structure;
              return structure ? (
                <td key={index}>{structure.designationAdministrative}</td>
              ) : (
                <td key={index}>Vide</td>
              );
            },
            Occupant: (item, index) => {
              const personnel = item.personnel;
              return personnel ? (
                <td key={index}>{item.personnel.nomsPrenoms}</td>
              ) : (
                <td key={index}></td>
              );
            },
            Matricule: (item, index) => {
              const personnel = item.personnel;
              return personnel ? (
                <td key={index}>{item.personnel.matricule}</td>
              ) : (
                <td key={index}></td>
              );
            },
            NaturePoste: (item, index) => {
              const naturePoste = item.naturePoste;
              return naturePoste ? (
                <td key={index}>{item.naturePoste.libelleNaturePoste}</td>
              ) : (
                <td key={index}>Vide</td>
              );
            },

            RangPoste: (item, index) => {
              const naturePoste = item.naturePoste;
              return naturePoste ? (
                <td key={index}>
                  {item.naturePoste.rangPoste.libelleRangPoste}
                </td>
              ) : (
                <td key={index}>Vide</td>
              );
            },

            Position: (item, index) => {
              const position = item.personnel;
              return position ? (
                <td>
                  {
                    <CBadge
                      color={getBadge(item.personnel.position.idPosition)}
                    >
                      {item.personnel.position.libelle}
                    </CBadge>
                  }
                </td>
              ) : (
                <td key={index}>
                  <CBadge color="danger">Poste Vaccant</CBadge>
                </td>
              );
            },

            dateRetraite: (item, index) => {
              const position = item.personnel;
              return position ? (
                <td>{item.personnel.dateRetraite}</td>
              ) : (
                <td key={index}> Vide</td>
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
  );
};

const mapStateToProps = ({ locationState }) => ({
  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
});

export default connect(mapStateToProps)(RangPoste);
