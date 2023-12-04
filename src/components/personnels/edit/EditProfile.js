import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import {
  faArrowLeft,
  faBars,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchGrades } from "../../../actions/gardeActions";
import { fetchAllLocations } from "../../../actions/locationActions";
import {
  FETCH_ALL_LOCATIONS_FAIL,
  FETCH_ALL_LOCATIONS_SUCCESS,
} from "../../../actions/locationActions/types";
import {
  fetchPersonnel,
  updateFolderNumberArchive,
  updatePersonnelInformation,
} from "../../../actions/personnelActions";
import { fetchStructures } from "../../../actions/structureActions";
import ListStructureModal from "../../../common/ListStructureModal";
import { BUCKET_URL } from "../../../config";

const EditProfile = (props) => {
  const {
    fetchPersonnel,
    personnel,
    fetchAllLocations: fetchLocations,
    fetchGrades,
    fetchStructures,
    grades,
    location,
    history,
    updatePersonnelInformation,
    structures,
  } = props;

  const matriculeParams = props.match.params.matricule;
  const [data, setData] = useState(personnel);
  const [modalStructure, setModalStructure] = useState(false);
  const [structureData, setstructureData] = useState({
    idStructure: null,
    designationAdministrative: null,
  });

  const [archiveNumber, setArchiveNumber] = useState("");

  const dispatch = useDispatch();

  const setNewStructure = (structure) => {
    setstructureData(structure);
    setData({
      ...data,
      structureIdStructure: structure.idStructure,
      structure: {
        ...structure,
        designationAdministrative: structure.designationAdministrative,
      },
    });
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

  const toggle = () => {
    setModalStructure(!modalStructure);
  };

  const updateArchiveNumberMutation = useMutation(
    (data) => updateFolderNumberArchive(data),
    {
      onSuccess: (response) => {
        toast.success("Numero du dossier dans la salle d'Archive mis a jour");
        history.goBack();
      },
      onError: (error) => {
        toast.error("Erreur serveur pendant la mise a jour");
      },
    }
  );

  useEffect(() => {
    if (personnel === null) {
      fetchPersonnel(matriculeParams);
    }
    if (grades.length === 0) {
      fetchGrades();
    }
    if (structures === null) {
      fetchStructures();
    }
    setData(personnel);
  }, [matriculeParams, fetchPersonnel, personnel, setData, fetchStructures]);

  const OnSave = () => {
    updatePersonnelInformation(matriculeParams, data).then(() => {
      history.goBack();
      toast.success("Mises des postes de responsables valides");
    });
  };

  const onSaveArchiveNumber = () => {
    updateArchiveNumberMutation.mutate({
      matricule: matriculeParams,
      value: archiveNumber,
    });
  };

  const renderStructureModal = () => {
    if (structures) {
      return (
        <ListStructureModal
          structures={structures.data}
          modal={modalStructure}
          toggle={toggle}
          setNewStructure={setNewStructure}
        />
      );
    }
  };

  return (
    <>
      {renderStructureModal()}
      <CCol col="2" sm="6" md="2" className="mb-3">
        <CButton onClick={() => history.goBack()} block size="sm" color="dark">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour
        </CButton>
      </CCol>
      {data && (
        <CCard>
          <CCardHeader>
            <div>
              <span className="mr-3">{data.nomsPrenoms}</span>
              <div>
                <CFormGroup row>
                  <CCol sm="4">
                    <CLabel className="font-weight-bold" htmlFor="noms">
                      Numéro du Dossier dans la Salle d'archive:{" "}
                      <CBadge size="2x" color="warning">
                        {archiveNumber}
                      </CBadge>
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      size="md"
                      placeholder={data.folderNumberArchive}
                      value={archiveNumber}
                      onChange={(value) => setArchiveNumber(value.target.value)}
                    />
                  </CCol>
                </CFormGroup>

                <CButton onClick={onSaveArchiveNumber} color="success">
                  Mettre A jour le numero du dossier:
                </CButton>
                {updateArchiveNumberMutation.isLoading && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <CRow className="p-5">
              <CCol className="text-center" sm="12">
                <div className="d-flex justify-content-center h-100">
                  <div className="row">
                    <div className="col-xs-12 col-md-12 mb-5">
                      <div className="d-flex justify-conteWnt-center h-100">
                        <div className="image_outer_conWtainer">
                          <div className="green_icon"></div>
                          <div className="image_inner_container">
                            <img
                              src={
                                data.photo
                                  ? `${BUCKET_URL}/personnels/${data.personnelIdArchive}/${data.photo}`
                                  : `${BUCKET_URL}/default/user.png`
                              }
                              alt="photo de profil"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CCol>
              <CCol sm="4">
                <div className="">
                  <div className="">
                    <CLabel className="font-weight-bold" htmlFor="noms">
                      <strong>Noms:</strong>
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      size="md"
                      id="noms"
                      placeholder="Noms"
                      value={data.noms}
                      onChange={(value) => {
                        setData({ ...data, noms: value.target.value });
                      }}
                    />
                  </div>
                  <hr />
                  <div className="">
                    <CLabel className="font-weight-bold" htmlFor="prenoms">
                      <strong> Prenoms:</strong>
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      size="md"
                      id="prenoms"
                      placeholder="prenoms"
                      value={data.prenoms}
                      onChange={(value) => {
                        setData({ ...data, prenoms: value.target.value });
                      }}
                    />
                  </div>
                  <hr />

                  <div className="">
                    <CLabel className="font-weight-bold" htmlFor="matricule">
                      <strong> Matricule:</strong>
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      size="md"
                      id="matricule"
                      placeholder="matricule"
                      value={data.matricule}
                      onChange={(value) => {
                        setData({ ...data, matricule: value.target.value });
                      }}
                    />
                  </div>
                  <hr />
                  <div className="">
                    <CLabel
                      className="font-weight-bold"
                      htmlFor="nomJeuneFille"
                    >
                      <strong> Nom de Jeune Fille:</strong>
                    </CLabel>
                    <CInput
                      required
                      type="text"
                      size="md"
                      id="nomJeuneFille"
                      placeholder="nomJeuneFille"
                      value={data.nomJeuneFille}
                      onChange={(value) => {
                        setData({ ...data, nomJeuneFille: value.target.value });
                      }}
                    />
                  </div>
                  <hr />
                  <div className="">
                    <CLabel className="font-weight-bold" htmlFor="sexe">
                      Sexe:
                    </CLabel>
                    <br />
                    <CFormGroup variant="checkbox" inline>
                      <CInputRadio
                        className="form-check-input"
                        id="masculin"
                        name="sexe"
                        value={1}
                        onChange={(value) => {
                          setData({ ...data, sexe: value.target.value });
                        }}
                      />
                      <CLabel variant="checkbox" htmlFor="masculin">
                        Masculin
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox" inline>
                      <CInputRadio
                        className="form-check-input"
                        id="feminin"
                        name="sexe"
                        value={2}
                        onChange={(value) => {
                          setData({ ...data, sexe: value.target.value });
                        }}
                      />
                      <CLabel variant="checkbox" htmlFor="feminin">
                        Feminin
                      </CLabel>
                    </CFormGroup>
                  </div>
                  <hr />
                  <div className="">
                    <CLabel className="font-weight-bold" htmlFor="telephone">
                      Telephones:
                    </CLabel>
                    <CInput
                      value={data.telephones}
                      id="telephone"
                      placeholder="telephones"
                      onChange={(value) => {
                        setData({ ...data, telephones: value.target.value });
                      }}
                    />
                  </div>
                  <hr />
                  <div className="">
                    <CLabel className="font-weight-bold" htmlFor="email">
                      addresse Email:
                    </CLabel>
                    <CInput
                      value={data.email}
                      type="email"
                      id="email"
                      placeholder="email"
                      onChange={(value) => {
                        setData({ ...data, email: value.target.value });
                      }}
                    />
                  </div>
                </div>
                <hr />
                <div>
                  <CFormGroup row>
                    <CCol>
                      <CLabel
                        className="font-weight-bold"
                        htmlFor="structureAffectation"
                      >
                        Structure d'Affectation:
                      </CLabel>
                      <CRow>
                        <CCol sm="10">
                          <CInput
                            id="structureAffectation"
                            placeholder="Selectionner la structure"
                            value={data.structure?.designationAdministrative}
                          />
                        </CCol>
                        <CCol sm="2">
                          <CButton onClick={toggle} size="md" color="danger">
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CFormGroup>
                </div>
                <hr />
                <div>
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="positionAdministrative"
                  >
                    Position Administrative:
                  </CLabel>
                  <CSelect
                    onChange={(value) => {
                      setData({
                        ...data,
                        positionAdministrativeIdPositionAdministrative:
                          value.target.value,
                      });
                    }}
                    value={data.positionAdministrativeIdPositionAdministrative}
                  >
                    <option value="2">Cadre</option>
                    <option value="1">Responsable</option>
                    <option value="3">Employe de Bureau</option>
                    <option value="4">Chauffeur</option>
                    <option value="5">Secrétaire</option>
                    <option value="6">Agent d'entretien</option>
                    <option value="7">Gardien</option>
                  </CSelect>
                </div>
                <hr />

                <div>
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="dateAffectation"
                  >
                    Date d'affectation
                  </CLabel>
                  <CInput
                    value={data.dateDePriseEffective}
                    type="date"
                    id="dateAffectation"
                    onChange={(value) => {
                      setData({
                        ...data,
                        dateDePriseEffective: value.target.value,
                      });
                    }}
                  />
                </div>

                <hr />

                <div>
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="dateEntreeMinistere"
                  >
                    Date d'entree au ministère
                  </CLabel>
                  <CInput
                    value={data.dateEntreeMinistere}
                    onChange={(value) => {
                      setData({
                        ...data,
                        dateEntreeMinistere: value.target.value,
                      });
                    }}
                    type="date"
                    id="dateEntreeMinistere"
                  />
                </div>
              </CCol>
              <CCol sm="4">
                <div className="">
                  <CLabel className="font-weight-bold" htmlFor="selectRegion">
                    Region:
                  </CLabel>
                  <CSelect
                    custom
                    name="selectRegion"
                    id="selectRegion"
                    value={data.regionIdRegion}
                    onChange={(value) => {
                      setData({ ...data, regionIdRegion: value.target.value });
                    }}
                  >
                    {props.location.regions.map((region, index) => {
                      return (
                        <option key={index} value={region.idRegion}>
                          {region.libelleRegion}
                        </option>
                      );
                    })}
                  </CSelect>
                </div>
                <hr />
                <div className="">
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="selectDepartement"
                  >
                    Departement:
                  </CLabel>
                  <CSelect
                    custom
                    name="selectDepartement"
                    id="selectDepartement"
                    value={data.departementIdDepartement}
                    onChange={(value) => {
                      setData({
                        ...data,
                        departementIdDepartement: value.target.value,
                      });
                    }}
                  >
                    {props.location.departements.map((departement, index) => {
                      return (
                        <option key={index} value={departement.idDepartement}>
                          {departement.libelleDepartement}
                        </option>
                      );
                    })}
                  </CSelect>
                </div>
                <hr />
                <div className="">
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="selectArrondissement"
                  >
                    Arrondissement:
                  </CLabel>
                  <CSelect
                    custom
                    name="selectArrondissement"
                    id="selectArrondissement"
                    value={data.arrondissementIdArrondissement}
                    onChange={(value) => {
                      setData({
                        ...data,
                        arrondissementIdArrondissement: value.target.value,
                      });
                    }}
                  >
                    {props.location.arrondissements.map(
                      (arrondissement, index) => {
                        return (
                          <option
                            key={index}
                            value={arrondissement.idArrondissement}
                          >
                            {arrondissement.libelleArrondissement}
                          </option>
                        );
                      }
                    )}
                  </CSelect>
                </div>
                <hr />
                <div className="">
                  <CLabel className="font-weight-bold" htmlFor="lieuNaissance">
                    Lieu de Naissance:
                  </CLabel>
                  <CInput
                    value={data.lieuNaissance}
                    id="lieuNaissance"
                    name="lieuNaissance"
                    placeholder="Text"
                    onChange={(value) => {
                      setData({ ...data, lieuNaissance: value.target.value });
                    }}
                  />
                </div>
                <hr />
                <div className="">
                  <CLabel className="font-weight-bold" htmlFor="dateNaissance">
                    Date de Naissance:
                  </CLabel>
                  <CInput
                    type="date"
                    value={data.dateNaissance}
                    id="dateNaissance"
                    name="dateNaissance"
                    placeholder="dd-mm-yyyy"
                    onChange={(value) => {
                      setData({ ...data, dateNaissance: value.target.value });
                    }}
                  />
                </div>
                <hr />
                <div className="">
                  <CLabel className="font-weight-bold" htmlFor="numeroCNI">
                    Numero CNI/Passport:
                  </CLabel>
                  <CInput
                    id="numeroCNI"
                    value={data.numeroCNI}
                    name="numeroCNI"
                    placeholder="123123434"
                    onChange={(value) => {
                      setData({ ...data, numeroCNI: value.target.value });
                    }}
                  />
                </div>
                <hr />
                <div className="">
                  <CLabel className="font-weight-bold" htmlFor="dateCNI">
                    Date CNI/Passport:
                  </CLabel>
                  <CInput
                    id="dateCNI"
                    type="date"
                    name="dateCNI"
                    value={data.dateCNI}
                    onChange={(value) => {
                      setData({ ...data, dateCNI: value.target.value });
                    }}
                  />
                </div>
                <hr />
                <div className="">
                  <CLabel className="font-weight-bold" htmlFor="lieuDelivrance">
                    Lieu de Delivrance:
                  </CLabel>
                  <CInput
                    id="lieuDelivrance"
                    type="text"
                    name="lieuDelivrance"
                    value={data.lieuDelivranceCNI}
                    onChange={(value) => {
                      setData({
                        ...data,
                        lieuDelivranceCNI: value.target.value,
                      });
                    }}
                  />
                </div>
                <hr />
                <div className="">
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="statutMatrimonial"
                  >
                    Situation Matrimoniale:
                  </CLabel>
                  <CSelect
                    name="statutMatrimonial"
                    value={data.statutMatrimonial}
                    onChange={(value) => {
                      setData({
                        ...data,
                        statutMatrimonial: value.target.value,
                      });
                    }}
                  >
                    <option value="1">Celibataire</option>
                    <option value="2">Marie</option>
                    <option value="3">Divorce</option>
                    <option value="4">Veuve</option>
                  </CSelect>
                </div>
                <hr />
                <div className="">
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="regimeMatrimonial"
                  >
                    Regime Matrimonial:
                  </CLabel>
                  <CSelect
                    name="regimeMatrimonial"
                    value={data.regimeMatrimonial}
                    onChange={(value) => {
                      setData({
                        ...data,
                        regimeMatrimonial: value.target.value,
                      });
                    }}
                  >
                    <option value="1">Monogame</option>
                    <option value="2">Polygame</option>
                  </CSelect>
                  <hr />
                </div>
                <div className="">
                  <CLabel className="font-weight-bold" htmlFor="nbEnfant">
                    Nombre d'enfants:
                  </CLabel>
                  <CInput
                    value={data.nbEnfant}
                    id="nbEnfant"
                    name="nbEnfant"
                    placeholder="00"
                    onChange={(value) => {
                      setData({ ...data, nbEnfant: value.target.value });
                    }}
                  />
                </div>
              </CCol>
              <CCol sm="4">
                <div className="">
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="selectNatureActe"
                  >
                    Nature du Recrutement:
                  </CLabel>
                  <CSelect
                    value={data.natureActeRecrutement}
                    custom
                    name="selectNatureActe"
                    id="selectNatureActe"
                    onChange={(value) => {
                      setData({
                        ...data,
                        natureActeRecrutement: value.target.value,
                      });
                    }}
                  >
                    <option value={1}>Arreté</option>
                    <option value={2}>Decret</option>
                    <option value={3}>Décision</option>
                    <option value={4}>Note de service</option>
                    <option value={5}>Affectation</option>
                    <option value={6}>Contrat</option>
                  </CSelect>
                </div>
                <hr />

                <div>
                  <CLabel className="font-weight-bold" htmlFor="ActeNumber">
                    N: de l'acte de recrutement:
                  </CLabel>
                  <CInput
                    id="ActeNumber"
                    name="ActeNumber"
                    placeholder="le numero de l'acte"
                    value={data.numeroActeRecrutement}
                    onChange={(value) => {
                      setData({
                        ...data,
                        numeroActeRecrutement: value.target.value,
                      });
                    }}
                  />
                </div>
                <hr />

                <div>
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="dateRecrutement"
                  >
                    Date de Recrutement:
                  </CLabel>
                  <CInput
                    id="dateRecrutement"
                    name="dateRecrutement"
                    placeholder="la date de recrutement"
                    type="date"
                    value={data.dateRecrutement}
                    onChange={(value) => {
                      setData({ ...data, dateRecrutement: value.target.value });
                    }}
                  />
                </div>
                <hr />

                <div>
                  <CLabel className="font-weight-bold" htmlFor="selectGrade">
                    Garde de Recrutement:
                  </CLabel>
                  <CSelect
                    custom
                    value={data.gradeRecrutement}
                    name="selectGrade"
                    id="selectGrade"
                    onChange={(value) => {
                      setData({
                        ...data,
                        gradeRecrutement: value.target.value,
                      });
                    }}
                  >
                    {props.grades.map((grade, index) => {
                      return (
                        <option key={index} value={grade.idGrade}>
                          {grade.libelleGrade}
                        </option>
                      );
                    })}
                  </CSelect>
                </div>
                <hr />

                <div>
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="selectGradeActuel"
                  >
                    Garde de Actuel:
                  </CLabel>
                  <CSelect
                    custom
                    value={data.gradeIdGrade}
                    name="selectGradeActuel"
                    id="selectGradeActuel"
                    onChange={(value) => {
                      setData({ ...data, gradeIdGrade: value.target.value });
                    }}
                  >
                    {props.grades.map((grade, index) => {
                      return (
                        <option key={index} value={grade.idGrade}>
                          {grade.libelleGrade}
                        </option>
                      );
                    })}
                  </CSelect>
                </div>
                <hr />

                <div>
                  <CLabel className="font-weight-bold" htmlFor="indice">
                    Indice:
                  </CLabel>
                  <CInput
                    id="indice"
                    name="indice"
                    placeholder="Text"
                    value={data.indice}
                    onChange={(value) => {
                      setData({ ...data, indice: value.target.value });
                    }}
                  />
                </div>
                <hr />

                <div>
                  <CLabel className="font-weight-bold" htmlFor="classe">
                    Classe:
                  </CLabel>
                  <CInput
                    id="classe"
                    name="classe"
                    placeholder="Text"
                    value={data.classe}
                    onChange={(value) => {
                      setData({ ...data, classe: value.target.value });
                    }}
                  />
                </div>
                <hr />

                <div>
                  <CLabel className="font-weight-bold" htmlFor="echelon">
                    Echelon:
                  </CLabel>
                  <CInput
                    id="echelon"
                    name="echelon"
                    placeholder="Text"
                    value={data.echelon}
                    onChange={(value) => {
                      setData({ ...data, echelon: value.target.value });
                    }}
                  />
                </div>
                <hr />
                <div>
                  <CLabel className="font-weight-bold" htmlFor="schoolLevel">
                    Niveau d'instruction
                  </CLabel>
                  <CSelect
                    value={data.niveauInstruction}
                    custom
                    name="schoolLevel"
                    id="schoolLevel"
                    onChange={(value) => {
                      setData({
                        ...data,
                        niveauInstruction: value.target.value,
                      });
                    }}
                  >
                    <option value={0}>
                      Selectionner le Niveau d'instruction
                    </option>
                    <option value={1}>
                      CEP / FSLC(First School Leaving Certificate){" "}
                    </option>
                    <option value={2}>BEPC /GCE Ordinary Level</option>
                    <option value={3}>PROBATOIRE</option>
                    <option value={4}>BACCALAUREAT / GCE Advanced Level</option>
                    <option value={9}>BACC+1</option>
                    <option value={10}>BACC+2</option>
                    <option value={5}>LICENCE / (BACHELOR DEGREE)</option>
                    <option value={6}>MASTER I</option>
                    <option value={7}>MASTER II (MASTER DEGREE)</option>
                    <option value={8}>DOCTORAT (PHD)</option>
                  </CSelect>
                </div>
                <hr />

                <div>
                  <CLabel className="font-weight-bold" htmlFor="diplomeMax">
                    Diplome le plus Elevé:
                  </CLabel>
                  <CInput
                    id="diplomeMax"
                    name="diplomeMax"
                    placeholder="Modifier le diplome"
                    value={data.diplomeMax}
                    onChange={(value) => {
                      setData({ ...data, diplomeMax: value.target.value });
                    }}
                  />
                </div>
                <hr />

                <div>
                  <CLabel
                    className="font-weight-bold"
                    htmlFor="dateObtentionDiplomeMax"
                  >
                    Date Obtention du diplome:
                  </CLabel>
                  <CInput
                    id="dateObtentionDiplomeMax"
                    name="dateObtentionDiplomeMax"
                    placeholder="Text"
                    type="date"
                    value={data.dateObtentionDiplomeMax}
                    onChange={(value) => {
                      setData({
                        ...data,
                        dateObtentionDiplomeMax: value.target.value,
                      });
                    }}
                  />
                </div>
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-around">
            <CButton onClick={() => history.goBack()} size="md" color="primary">
              <FontAwesomeIcon icon={faArrowLeft} size="sm" /> Annuler
            </CButton>
            {/* {isLoading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : ( */}
            <CButton onClick={OnSave} size="md" color="success">
              <FontAwesomeIcon icon={faUserPlus} size="sm" /> Sauvegarder les
              modifications
            </CButton>
            {/* )} */}
          </CCardFooter>
        </CCard>
      )}
    </>
  );
};
const mapStateToProps = ({
  personnelState,
  locationState,
  gardeState,
  structureState,
}) => ({
  personnel: personnelState.personnel,
  grades: gardeState.grades,

  location: {
    regions: locationState.regions,
    arrondissements: locationState.arrondissements,
    departements: locationState.departements,
  },
  structures: structureState.structures,
});

export default connect(mapStateToProps, {
  fetchPersonnel,
  updatePersonnelInformation,
  fetchGrades,
  fetchStructures,
})(EditProfile);
