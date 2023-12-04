import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import {
  faArchive,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faArrowLeft,
  faCamera,
  faCheck,
  faEdit,
  faEye,
  faTimesCircle,
  faTrashAlt,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import CanLevelOne from "../../RBAC/CanLevelOne";
import CanLevelThree from "../../RBAC/CanLevelThree";
import { fetchStage } from "../../actions/stages";
import { BUCKET_URL } from "../../config/index";
import { getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";

const PersonnelStageDetail = (props) => {
  const idStage = props.match.params.idStage;
  const [collapse, setCollapse] = useState(false);
  const [stage, setStage] = useState({});

  const { history, profile } = props;

  const { isFetching, data, isError } = useQuery(
    "repoStage",
    () => fetchStage(idStage),
    {
      onSuccess: (response) => {
        setStage(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const renderPoste = (postes) => {
    return postes.map((poste, index) => {
      return (
        <>
          <div className="d-flex justify-content-between">
            <h6>
              <strong>Poste:{++index}</strong>
            </h6>
            <span className="float-right text-right">{poste.libellePoste}</span>
          </div>
          <hr />
        </>
      );
    });
  };

  if (isError) return <div>IsError</div>;

  return isFetching ? (
    <div className="spinner-border spinner-border-xl" role="stastus">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <>
      <CRow>
        <CCol col="2" sm="6" md="2" className="mb-3">
          <CButton
            onClick={() => history.goBack()}
            block
            size="sm"
            color="dark"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Retour
          </CButton>
        </CCol>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="mr-3">{stage.nomsPrenoms}</span>
                </div>
                {/* {person.positionIdPosition === 2 && (
                  <NotificationRetraite personnel={person} />
                )} */}
                <CanLevelOne
                  role={profile.roles[0]}
                  yes={() => (
                    <CButton
                      to={`/personnels/${stage.personnel.matricule}/archives`}
                      color="info"
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faArchive}
                        color="white"
                      />
                      Voir les archives
                    </CButton>
                  )}
                  no={() => ""}
                />
              </div>
            </CCardHeader>

            <CCardBody>
              <CRow className="p-5">
                <CCol className="text-center" sm="4">
                  <div className="d-flex justify-content-center h-100">
                    <div className="image_outer_container">
                      <div className="image_inner_container">
                        <img
                          src={
                            stage.personnel.photo
                              ? `${BUCKET_URL}/personnels/${stage.personnel.personnelIdArchive}/${stage.personnel.photo}`
                              : `${BUCKET_URL}/default/user.png`
                          }
                          alt="Avatar"
                        />
                      </div>
                      <div className="p-3">
                        <CButton
                          color={getBadge(stage.personnel.positionIdPosition)}
                        >
                          {stage.personnel?.position?.libelle}
                        </CButton>
                      </div>
                    </div>
                  </div>
                </CCol>
                <CCol sm="4">
                  <div className="">
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Matricule: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.matricule}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Noms: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.noms}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Prénoms:</strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.prenoms}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Sexe: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.sexe === "1" ? "Masculin" : "Feminin"}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Age: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.dateNaissance === null
                          ? ""
                          : calculateAge(stage.personnel?.dateNaissance)}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Date de Retraite: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.dateRetraite}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Telephones: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.telephones}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Email: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage.personnel.email}
                      </span>
                    </div>
                    <hr />
                  </div>
                </CCol>
                <CCol sm="4">
                  <div className="">
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Objet du Stage:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {stage.objet}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Date de debut de Stage:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {stage.dateDebut}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Date de Fin de Stage:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {stage?.dateFin}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Grade Actuel:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {stage?.personnel.grade.libelleGrade}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Lieu de Stage</strong>
                      </h6>
                      <span>{stage.lieu}</span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Diplome de fin de Stage </strong>
                      </h6>
                      <span>{stage?.diplome}</span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Structure:</strong>
                      </h6>
                      <span className="float-right text-right">
                        {stage?.personnel.structure?.designationAdministrative}
                      </span>
                    </div>
                    <hr />
                    {renderPoste(stage.personnel?.postes)}
                    {stage?.personnel.postes.length > 0 && (
                      <>
                        <div className="d-flex align-items-center  justify-content-between">
                          <h6>
                            <strong>Poste:</strong>
                          </h6>
                          <span>
                            {stage?.personnel.postes.length > 0
                              ? stage.personnel.postes[0].libellePoste
                              : "Sans Poste"}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader style={{ fontWeight: "bold" }}>
              Origine du personnel{" "}
            </CCardHeader>
            <CCardBody>
              <div className="">
                <div className="d-flex justify-content-between">
                  <h6>Region:</h6>
                  <span>{person.region?.libelleRegion}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Departement</h6>
                  <span>{person.departement?.libelleDepartement}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Arrondissement</h6>
                  <span>{person.arrondissement?.libelleArrondissement}</span>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader style={{ fontWeight: "bold" }}>
              Lieu de Naissance et Informations
            </CCardHeader>
            <CCardBody>
              <div className="">
                <div className="d-flex justify-content-between">
                  <h6>Lieu de Naissance:</h6>
                  <span>{person.lieuNaissance}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Date Naissance:</h6>
                  <span>{person.dateNaissance}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Nbre enfants</h6>
                  <span> 00 </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Numero CNU/passport: 00</h6>
                  <span>{person.numeroCNI}</span>
                </div>
                <hr />

                <div className="d-flex justify-content-between">
                  <h6>Date CNI: </h6>
                  <span>{person.dateCNI}</span>
                </div>
                <hr />

                <div className="d-flex justify-content-between">
                  <h6>Lieu de delivrance: 00</h6>
                  <span>{person.lieuDelivranceCNI}</span>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader style={{ fontWeight: "bold" }}>
              Gardes et Indices
            </CCardHeader>
            <CCardBody>
              <div className="">
                <div className="d-flex justify-content-between">
                  <h6>Indice de carriere:</h6>
                  <span>{person.indice}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Indice solde:</h6>
                  <span>{person.indice}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Classe:</h6>
                  <span>{person.classe}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Echelon:</h6>
                  <span>{person.echelon}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Annee probable de retraite</h6>
                  <span>{person.anneeRetraite}</span>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}

      {/* <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard>
            <CCardHeader style={{ fontWeight: "bold" }}>Scolarité</CCardHeader>
            <CCardBody>
              <div className="">
                <div className="d-flex justify-content-between">
                  <h6>Niveau d'Instruction: </h6>
                  <span>{person?.niveauEtude?.niveau}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Diplome: </h6>
                  <span>{person.diplomeMax}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Option du diplome: </h6>
                  <span>{person.optionDiplomeMax}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Date d'obtention du diplome: </h6>
                  <span>{person.dateObtentionDiplomeMax}</span>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  );
};

const mapStateToProps = ({ personnelState, userState }) => ({
  person: personnelState.personnel,
  profile: userState.profile,
});

export default connect(mapStateToProps, {})(PersonnelStageDetail);
