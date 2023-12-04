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
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollapseFieldPoste from "../../common/CollapseFieldPoste";
import ExportButton from "../../common/ExportButton";
import SelectWorkLocation from "../../common/SelectWorkLocation";
import { BUCKET_URL } from "../../config";
import useFilterLocationPoste from "../../hooks/useFilterLocationPoste";
import { fieldsPoste, getBadge, getNaturePoste } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";

const NaturePoste = ({
  location,
  postes,
  natureList,
  fetchPosteByNature,
  isLoadingPosteByNature,
  ...props
}) => {
  const [naturePoste, setNaturePoste] = useState(4);

  const [collapse, setCollapse] = useState(false);
  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
    vacant: false,
  });

  useEffect(() => {
    setFilterData(postes);
  }, [postes]);

  const role = localStorage.getItem("roles");

  // factorise le code pour les MAJ TOTAL
  const onChangeNature = (nature) => {
    // utiliser le hook du settimout
    setTimeout(() => {
      setNaturePoste(nature);
      fetchPosteByNature(nature);
    }, 500);

    clearCheckedSexe();
  };

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

  const clearCheckedSexe = () => {
    setChecked({
      manChecked: false,
      womanChecked: false,
      fonctionnaireChecked: false,
      contractuelChecked: false,
      vacant: false,
    });
  };

  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
          vacant: false,
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

        break;
      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
          fonctionnaireChecked: false,
          contractuelChecked: false,
          vacant: false,
        });
        break;
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex justify-content-between">
          <div>
            <h4>
              {getNaturePoste(naturePoste)}: {filterData.length}
            </h4>
          </div>
          <CFormGroup row>
            <CCol xs="12" md="8">
              <CSelect
                onChange={(event) => onChangeNature(event.target.value)}
                defaultValue={naturePoste}
                custom
                size="md"
                name="selectSm"
                id="SelectLm"
              >
                {natureList.length !== 0
                  ? natureList.map((nature, index) => {
                      return (
                        <option key={index} value={nature.idNaturePoste}>
                          {nature.libelleNaturePoste}
                        </option>
                      );
                    })
                  : null}
              </CSelect>
            </CCol>
          </CFormGroup>
          <ExportButton collapse={collapse} toggleCollapse={toggleCollapse} />
        </div>
        <hr />
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
            name="natureposte"
            onCheckedSexe={onCheckedSexe}
            checked={checked}
            statusAdmin={false}
          />
        </div>
        <CollapseFieldPoste
          collapse={collapse}
          postes={filterData}
          name="nature"
        />
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={filterData}
          fields={fieldsPoste}
          itemsPerPage={20}
          itemsPerPageSelect
          pagination
          loading={isLoadingPosteByNature}
          hover
          header
          sorter
          tableFilter
          columnFilter
          clickableRows
          striped
          bordered
          scopedSlots={{
            Numero: (item, index) => <td>{index}</td>,
            Structure: (item, index) => {
              const structure = item.structure;
              return structure ? (
                <td key={index}>{structure.designationAdministrative}</td>
              ) : (
                <td key={index}></td>
              );
            },
            Occupant: (item, index) => {
              const personnel = item.personnel;
              return personnel ? (
                <td key={index}>{item.personnel.nomsPrenoms}</td>
              ) : (
                <td key={index}>
                  {<CBadge color="danger">Poste vacant</CBadge>}
                </td>
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
                <td key={index}></td>
              );
            },

            RangPoste: (item, index) => {
              const naturePoste = item.naturePoste;
              return naturePoste ? (
                <td key={index}>
                  {item.naturePoste.rangPoste.libelleRangPoste}
                </td>
              ) : (
                <td key={index}></td>
              );
            },
            age: (item, index) => {
              const personnel = item.personnel;
              return personnel ? (
                <td key={index}>
                  {
                    <CBadge color="primary">
                      {personnel.dateNaissance === null
                        ? ""
                        : calculateAge(personnel.dateNaissance)}
                    </CBadge>
                  }
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
                      color={getBadge(item.personnel.position.idPosition)}
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

export default connect(mapStateToProps)(NaturePoste);
