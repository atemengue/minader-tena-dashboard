import { useState } from "react";

function useFilterLocationPoste(data, departs, arronds) {
  const [arrondissements, setArrondissements] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [filterData, setFilterData] = useState(data);

  // filter sur les regions
  const [filterState, setFilterState] = useState({
    workRegion: false,
    workDepartement: false,
    workArrondissement: false,
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
        (poste) => poste.structure?.regionIdRegion !== 1
      );
      setFilterData(values);
    } else {
      setFilterData(data);
    }
  };

  const handleWorkLocation = (event) => {
    const value = parseInt(event.target.value);
    const name = event.target.name;
    setIdLocation({
      ...idLocation,
      [name]: value,
    });

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
          let values = data.filter(
            (poste) => poste.structure?.regionIdRegion === value
          );
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
          let values = data.filter(
            (poste) => poste.structure?.departementIdDepartement === value
          );
          setFilterData(values);
        } else {
          setFilterState({
            ...filterState,
            workDepartement: false,
          });
          let values = data.filter(
            (poste) => poste.structure?.regionIdRegion === idLocation.idRegion
          );
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
          let values = data.filter(
            (poste) => poste.structure?.arrondissementIdArrondissement === value
          );
          setFilterData(values);
        } else {
          setFilterState({
            ...filterState,
            workArrondissement: false,
          });
          let values = data.filter(
            (poste) =>
              poste.structure?.departementIdDepartement ===
              idLocation.idDepartement
          );
          setFilterData(values);
        }
        break;

      default:
        break;
    }
  };

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

export default useFilterLocationPoste;
