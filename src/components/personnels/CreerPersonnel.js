import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { connect, useDispatch } from "react-redux";
import StepWizard from "react-step-wizard";
import { fetchDomaineEtude } from "../../actions/domaineOptionActions";
import { fetchGrades } from "../../actions/gardeActions";
import { fetchAllLocations } from "../../actions/locationActions";
import {
  FETCH_ALL_LOCATIONS_FAIL,
  FETCH_ALL_LOCATIONS_SUCCESS,
} from "../../actions/locationActions/types";
import {
  displayArrondissement,
  displayDepartement,
  displayGradeActuel,
  displayGradeRecrutement,
  displayIdStructure,
} from "../../actions/personnelActions";
import { fetchStructures } from "../../actions/structureActions";
import GradeModal from "../../common/GradeModal";
import ListLocation from "../../common/ListLocation";
import ListStructureModal from "../../common/ListStructureModal";
import NewPersonnelModal from "../../common/NewPersonnelModal";
import Etape1 from "./Ajouter/Etape1";
import Etape2 from "./Ajouter/Etape2";
import Etape3 from "./Ajouter/Etape3";
import Etape4 from "./Ajouter/Etape4";
import Etape5 from "./Ajouter/Etape5";
import Nav from "./Ajouter/Nav";

const CreerPersonnel = (props) => {
  const [state, updateState] = useState({
    form: {},
    transitions: {},
  });

  const [modal, setModal] = useState(false);
  const [modalStructure, setModalStructure] = useState(false);
  const [modalLocation, setModalLocation] = useState(false);
  const [modalGrade, setModalGrade] = useState(false);

  const dispatch = useDispatch();

  const [typeModal, setTypeModal] = useState(1);
  const [typeGrade, setTypeGrade] = useState(1);
  const [structureData, setstructureData] = useState({
    idStructure: 5000,
    designationAdministrative: "Structure d'Attente d'Affectation",
  });

  const [locationData, setLocationData] = useState({
    region: {
      idRegion: 0,
      libelleRegion: "Region Inconnue",
    },
    departement: {
      idDepartement: 0,
      libelleDepartement: "Arrondissement Inconnue",
    },
    arrondissement: {
      idArrondissement: 0,
      libelleArrondissement: "Arrondissement Inconnue",
    },
  });

  const [gradeData, setGradeData] = useState({
    gradeActuel: {
      idGrade: 0,
      libelleGrade: "",
    },
    gradeRecrutement: {
      idGrade: 0,
      libelleGrade: "",
    },
  });

  const setNewLocation = (location, type) => {
    switch (type) {
      case 1:
        setLocationData({
          ...locationData,
          departement: {
            idDepartement: location.idDepartement,
            libelleDepartement: location.libelleDepartement,
          },
        });
        props.displayDepartement(location.idDepartement);
        break;
      case 2:
        setLocationData({
          ...locationData,
          arrondissement: {
            idArrondissement: location.idArrondissement,
            libelleArrondissement: location.libelleArrondissement,
          },
        });
        props.displayArrondissement(location.idArrondissement);
        break;
      default:
        return 0;
    }
  };

  const setNewStructure = (structure) => {
    setstructureData(structure);
    props.displayIdStructure(structure.idStructure);
  };

  const toggle2 = () => {
    setModalStructure(!modalStructure);
  };

  const toggle3 = () => {
    setModalLocation(!modalLocation);
  };

  const toggle4 = () => {
    setModalGrade(!modalGrade);
  };

  const setNewGrade = (grade, type) => {
    switch (type) {
      case 1:
        setGradeData({
          ...gradeData,
          gradeRecrutement: {
            idGrade: grade.idGrade,
            libelleGrade: grade.libelleGrade,
          },
        });
        props.displayGradeRecrutement(grade.idGrade);
        break;
      case 2:
        setGradeData({
          ...gradeData,
          gradeActuel: {
            idGrade: grade.idGrade,
            libelleGrade: grade.libelleGrade,
          },
        });
        props.displayGradeActuel(grade.idGrade);

      default:
        return 0;
    }
  };
  const { isLoading, isError } = useQuery(
    "locations",
    () => fetchAllLocations(),
    {
      onSuccess: (response) => {
        dispatch({ type: FETCH_ALL_LOCATIONS_SUCCESS, payload: response.data });
      },
      onError: (error) => {
        dispatch({ type: FETCH_ALL_LOCATIONS_FAIL });
      },
    }
  );

  const {
    fetchDomaineEtude,
    fetchGrades,
    location,
    grades,
    newPersonnel,
    newPersonnelPhoto,
    structures,
    fetchStructures,
    domaines,
  } = props;

  useEffect(() => {
    if (grades.length === 0) {
      fetchGrades();
    }
    if (structures === null) {
      fetchStructures();
    }
    if (domaines.length === 0) {
      fetchDomaineEtude();
    }
  }, []);

  const setInstance = (SW) =>
    updateState({
      ...state,
      SW,
    });

  const toggle = () => {
    setModal(!modal);
  };

  const renderStructureModal = () => {
    if (props.structures && props.location && props.grades) {
      return (
        <>
          <ListStructureModal
            structures={props.structures.data}
            modal={modalStructure}
            toggle={toggle2}
            setNewStructure={setNewStructure}
          />
          <ListLocation
            setNewLocation={setNewLocation}
            locations={props.location}
            type={typeModal}
            modal={modalLocation}
            toggle={toggle3}
          />
          <GradeModal
            setNewGrade={setNewGrade}
            modal={modalGrade}
            grades={props.grades}
            toggle={toggle4}
            type={typeGrade}
          />
        </>
      );
    }
  };

  return (
    <div>
      <h2>Créer un personnel</h2>
      <CRow>
        {isLoading ? (
          <div className="spinner-border spinner-border-xl" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <CCol>
            <NewPersonnelModal
              personnel={newPersonnel}
              photo={newPersonnelPhoto}
              modal={modal}
              toggle={toggle}
              location={location}
              grades={grades}
              structures={props.structures ? props.structures.data : []}
            />
            {renderStructureModal()}

            <StepWizard instance={setInstance} nav={<Nav />}>
              <Etape1 photo={newPersonnelPhoto} toggle={toggle} />
              <Etape2
                setTypeModal={setTypeModal}
                departement={locationData["departement"]}
                arrondissement={locationData["arrondissement"]}
                regions={location.regions}
                toggle3={toggle3}
                toggle={toggle}
              />
              <Etape3
                domaines={domaines}
                setTypeGrade={setTypeGrade}
                toggle1={toggle}
                toggle2={toggle4}
                grades={grades}
                gradeActuel={gradeData["gradeActuel"]}
                gradeRecrutement={gradeData["gradeRecrutement"]}
              />
              <Etape4
                toggle={toggle}
                toggle2={toggle2}
                structure={structureData}
              />
              <Etape5
                personnel={newPersonnel}
                location={location}
                photo={newPersonnelPhoto}
                grades={grades}
                structures={props.structures ? props.structures.data : []}
              />
            </StepWizard>
          </CCol>
        )}
      </CRow>
    </div>
  );
};

const mapStateToProps = ({
  locationState,
  gardeState,
  personnelState,
  structureState,
  domaineOptionEtudeState,
}) => ({
  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
  grades: gardeState.grades,
  structures: structureState.structures,
  newPersonnel: personnelState.newPersonnel,
  newPersonnelPhoto: personnelState.newPersonnelPhoto,
  domaines: domaineOptionEtudeState.domaineEtudes,
});

const mapDispatchToProps = {
  fetchGrades,
  displayIdStructure,
  displayDepartement,
  displayArrondissement,
  displayGradeRecrutement,
  displayGradeActuel,
  fetchDomaineEtude,
  fetchStructures,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreerPersonnel);
