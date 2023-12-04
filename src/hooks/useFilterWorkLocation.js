import { useState } from "react";

// id Corps et grades selectBox

function useFilterWorkLocation(data, departs, arronds, origine) {
  const [arrondissements, setArrondissements] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [filterData, setFilterData] = useState(data);

  // filter sur les regions
  const [filterState, setFilterState] = useState({
    originRegion: false,
    originDepartement: false,
    originArrondissement: false,
    workRegion: false,
    workDepartement: false,
    workArrondissement: false,
    manChecked: false,
    womanChecked: false,
    responsable: false,
    cadre: false,
    deconcentres: false,
  });

  // state for location
  const [idLocation, setIdLocation] = useState({
    idRegion: null,
    idDepartement: null,
    idArrondissement: null, // revoir le code ici
  });

  // check services deconcentres
  const [checkedServiceDeconcentres, setCheckedServiceDeconcentres] =
    useState(false);

  const handleServiceDeconcentres = (event) => {
    const checked = event.target.checked;
    setCheckedServiceDeconcentres(checked);

    if (checked) {
      // filter sur les services centraux
      let values = data.filter(
        (personnel) => personnel?.structure?.regionIdRegion !== 1
      );
      setFilterData(values);
    } else {
      setFilterData(data);
    }
  };

  function handleWorkLocation(event) {
    const value = parseInt(event.target.value);
    const name = event.target.name;
    setIdLocation({
      ...idLocation,
      [name]: value,
    });

    // dependance du code BAD CODE
    const filterRegion = (personnel) => {
      if (origine) {
        return personnel?.regionIdRegion === value;
      }
      return personnel?.structure?.regionIdRegion === value;
    };

    const filterIdRegion = (personnel) => {
      if (origine) {
        return personnel?.regionIdRegion === idLocation.idRegion;
      }
      return personnel?.structure?.regionIdRegion === idLocation.idRegion;
    };

    const filterIdDepartement = (personnel) => {
      if (origine) {
        return personnel?.departementIdDepartement === idLocation.idDepartement;
      }
      return (
        personnel?.structure?.departementIdDepartement ===
        idLocation.idDepartement
      );
    };

    const filterDepartement = (personnel) => {
      if (origine) {
        return personnel?.departementIdDepartement === value;
      }
      return personnel?.structure?.departementIdDepartement === value;
    };

    const filterArrondissement = (personnel) => {
      if (origine) {
        return personnel?.arrondissementIdArrondissement === value;
      }
      return personnel?.structure?.arrondissementIdArrondissement === value;
    };

    switch (name) {
      case "idRegion":
        let departements = departs.filter(
          (item) => item?.regionIdRegion === value
        );
        setDepartements(departements);
        if (value !== -1) {
          setFilterState({
            ...filterState,
            workRegion: true,
          });
          let values = data.filter(filterRegion);

          setFilterData(values);
        } else {
          setFilterState({
            ...filterState,
            workRegion: false,
          });
          setIdLocation({ ...idLocation, idRegion: -1 });
          setFilterData(data);
        }
        setArrondissements([]);
        break;
      case "idDepartement":
        let arrondissements = arronds.filter(
          (item) => item?.departementIdDepartement === value
        );
        setArrondissements(arrondissements);

        if (value !== -2) {
          setFilterState({
            ...filterState,
            workDepartement: true,
          });
          let values = data.filter(filterDepartement);
          setFilterData(values);
        } else {
          setFilterState({
            ...filterState,
            workDepartement: false,
          });

          let values = data.filter(filterIdRegion);

          // set data toutes les departements
          setFilterData(values);
        }

        break;
      case "idArrondissement":
        if (value !== -3) {
          setFilterState({
            ...filterState,
            workArrondissement: true,
          });
          let values = data.filter(filterArrondissement);
          setFilterData(values);
        } else {
          setFilterState({
            ...filterState,
            workArrondissement: false,
          });
          let values = data.filter(filterIdDepartement);
          setFilterData(values);
        }
        break;

      default:
        break;
    }
  }

  return {
    handleWorkLocation,
    idLocation,
    setDepartements,
    setArrondissements,
    departements,
    arrondissements,
    filterState,
    filterData,
    setFilterData,
    setIdLocation,
    checkedServiceDeconcentres,
    handleServiceDeconcentres,
  };
}

export default useFilterWorkLocation;
