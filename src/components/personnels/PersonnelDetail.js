import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CFormGroup,
  CImg,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
  CTooltip,
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
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import CanLevelOne from "../../RBAC/CanLevelOne";
import CanLevelThree from "../../RBAC/CanLevelThree";
import {
  deleteMouvement,
  deletePersonnel,
  fetchPersonnel,
  updatePersonnelPhoto,
} from "../../actions/personnelActions";
import ConfirmDelete from "../../common/ConfirmDelete";
import { BUCKET_URL } from "../../config/index";
import { fieldsMouvement, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import FichePersonnel from "../printing/FichePersonnel";
import NotificationRetraite from "../printing/NotificationRetraite";
import PresenceEffective from "../printing/PresenceEffective";
import PriseService from "../printing/PriseService";
import RepriseServive from "../printing/RepriseService";

const PersonnelDetail = (props) => {
  const [deleteModal, setdeleteModal] = useState(false);
  const [deleteModalProfil, setdeleteModalProfil] = useState(false);
  const [mouvementId, setMouvementId] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [loader, setloader] = useState(false);

  // user ref profile
  const photoElt = useRef();

  // personnel state field
  const [photoUrl, setPhotoUrl] = useState(null);
  const [userPhotoData, setuserPhotoData] = useState("");
  const [picture, setPicture] = useState(null);

  // handleImage Profile user
  const handlePicture = (event) => {
    setPicture(null);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setPhotoUrl(reader.result);
      setuserPhotoData(file);
    };

    reader.abort = () => {
      setuserPhotoData(null);
      setPhotoUrl("images/user.png");
    };

    reader.onloadend = () => {
      if (file === undefined) {
        setPhotoUrl("images/user.png");
        setuserPhotoData(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetUserPhoto = () => {
    setPhotoUrl(null);
    setuserPhotoData(null);
  };

  const matricule = props.match.params.matricule;
  const {
    fetchPersonnel,
    person,
    history,
    deleteMouvement,
    profile,
    deletePersonnel,
  } = props;

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  useEffect(() => {
    fetchPersonnel(matricule);
  }, [matricule, fetchPersonnel]);

  //  bad mutation
  const deletePersonnelMutation = useMutation(
    (matricule) => deletePersonnel(matricule),
    {
      onSuccess: (response) => {
        if (response.status === "error") {
          toast.error(response.message);
          setloader(false);
        } else {
          setloader(false);
          toast.success(response.message);
          setTimeout(() => {
            deletePersonnelMutation.reset();
            props.history.push("/personnels");
          }, 2000);
        }
      },
    }
  );

  const updatePhoto = useMutation((data) => updatePersonnelPhoto(data), {
    onSuccess: (response) => {
      toast.success("photo de profil mis a jour");
    },
    onError: (error) => {
      toast.error("Erreur sur le serveur");
    },
  });

  const onUpdatedPhoto = () => {
    updatePhoto.mutate({
      photoUrl,
      userPhotoData,
      matricule: person.matricule,
    });
  };

  const onEntering = () => {};
  const onEntered = () => {};
  const onExiting = () => {};
  const onExited = () => {};

  const renderFirstName = (sexe) => {
    if (sexe === "2") {
      return (
        <>
          <div className="d-flex align-items-center  justify-content-between">
            <h6>
              <strong>Nom de jeune fille: </strong>
            </h6>
            <span className="float-right text-right">
              {person.nomJeuneFille}
            </span>
          </div>
          <hr />
        </>
      );
    }
  };

  const toggleModalDetele = (idMouvement) => {
    setdeleteModal(!deleteModal);
    setMouvementId(idMouvement);
  };

  const toggleModalDeteleProfil = () => {
    setdeleteModalProfil(!deleteModalProfil);
  };

  const onValidated = (isValidated) => {
    if (isValidated) {
      deleteMouvement(mouvementId).then((_) => {
        toast.success("Mouvement supprimés");
      });
    }
  };

  // BAD CODE// il faut nettoyer ici
  const onValidatedDeleteProfil = (isValidated) => {
    if (isValidated) {
      setloader(true);
      deletePersonnelMutation.mutate(person.matricule);
    }
  };

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

  return person === null ? (
    <div className="spinner-border spinner-border-xl" role="stastus">
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <>
      <ConfirmDelete
        type="delete"
        message={`le mouvement de ${person.nomsPrenoms}`}
        onValidated={onValidated}
        modal={deleteModal}
        toggle={toggleModalDetele}
      />

      <ConfirmDelete
        type="delete"
        message={`le supprimer les informations de ${person.nomsPrenoms}`}
        onValidated={onValidatedDeleteProfil}
        modal={deleteModalProfil}
        toggle={toggleModalDeteleProfil}
      />

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
                  <div>
                    <span className="mr-3">{person.nomsPrenoms}</span>
                    <div className="mr-3">
                      Numéro du Dossier dans la Salle d'archive:
                      <CBadge size="2x" color="warning">
                        {person.folderNumberArchive}
                      </CBadge>
                    </div>
                  </div>

                  {updatePhoto.isLoading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
                {/* {person.positionIdPosition === 2 && (
                  <NotificationRetraite personnel={person} />
                )} */}
                <CanLevelOne
                  role={profile.roles[0]}
                  yes={() => (
                    <CButton
                      to={`/personnels/${person.matricule}/archives`}
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
              <hr />
              <CanLevelOne
                role={profile.roles[0]}
                yes={() => (
                  <div className="d-flex align-items-center justify-content-between">
                    <CButton
                      size="sm"
                      to={`/personnels/${person.matricule}/modifier`}
                      color="dark"
                      style={{ color: "white" }}
                    >
                      <FontAwesomeIcon className="mr-2" icon={faEdit} />
                      Modifier les informations
                    </CButton>
                    <CButton
                      size="sm"
                      onClick={toggleCollapse}
                      color="dark"
                      style={{ color: "white" }}
                    >
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={
                          collapse ? faArrowAltCircleUp : faArrowAltCircleDown
                        }
                      />
                      Imprimer les fiches
                    </CButton>
                  </div>
                )}
                no={() => ""}
              />
              <div>
                <CCollapse show={collapse}>
                  <CRow className="p-3">
                    <CCol className="d-flex justify-content-between">
                      <FichePersonnel personnel={person} />
                      {person?.positionIdPosition === 2 && (
                        <NotificationRetraite personnel={person} />
                      )}

                      <div>
                        <CTooltip
                          placement="bottom"
                          content={"Afficher Notification en Conge"}
                        >
                          <CButton to={`conges/${matricule}`}>
                            <CImg
                              fluid
                              width="50"
                              height="50"
                              src="icons/conge.svg"
                            />
                            <div className="m-1">
                              <h6>Notification Conge</h6>
                            </div>
                          </CButton>
                        </CTooltip>
                      </div>
                      <PresenceEffective personnel={person} />
                      <PriseService />
                      <RepriseServive />
                    </CCol>
                  </CRow>
                </CCollapse>
              </div>
            </CCardHeader>

            <CCardBody>
              <CRow className="p-5">
                <CCol className="text-center" sm="4">
                  <div className="d-flex justify-content-center h-100">
                    <div className="image_outer_container">
                      <div className="green_icon"></div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <CTooltip content="Choisir une photo sur votre ordinateur">
                          <FontAwesomeIcon
                            cursor="pointer"
                            icon={faCamera}
                            size="lg"
                            color="blue"
                            onClick={() => photoElt.current.click()}
                          />
                        </CTooltip>
                        {photoUrl && (
                          <CTooltip content="Valider la nouvelle photo de profil">
                            <FontAwesomeIcon
                              style={{ marginBottom: 8 }}
                              cursor="pointer"
                              icon={faCheck}
                              size="lg"
                              color="green"
                              onClick={() => onUpdatedPhoto()}
                            />
                          </CTooltip>
                        )}

                        <CTooltip content="Supprimer la photo">
                          <FontAwesomeIcon
                            cursor="pointer"
                            color="red"
                            size="lg"
                            icon={faTimesCircle}
                            onClick={resetUserPhoto}
                          />
                        </CTooltip>
                      </div>
                      <div className="image_inner_container">
                        <img
                          src={
                            photoUrl
                              ? photoUrl
                              : person.photo
                              ? `${BUCKET_URL}/personnels/${person.personnelIdArchive}/${person.photo}`
                              : `${BUCKET_URL}/default/user.png`
                          }
                          alt="Avatar"
                        />
                      </div>
                      <div className="p-3">
                        <CButton color={getBadge(person.positionIdPosition)}>
                          {person?.position?.libelle}
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
                        {person.matricule}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Noms: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {person.noms}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Prénoms:</strong>
                      </h6>
                      <span className="float-right text-right">
                        {person.prenoms}
                      </span>
                    </div>
                    <hr />

                    {renderFirstName(person.sexe)}

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Sexe: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {person.sexe === "1" ? "Masculin" : "Feminin"}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Age: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {person.dateNaissance === null
                          ? ""
                          : calculateAge(person?.dateNaissance)}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Date de Retraite: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {person.dateRetraite}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Telephones: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {person.telephones}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Email: </strong>
                      </h6>
                      <span className="float-right text-right">
                        {person.email}
                      </span>
                    </div>
                    <hr />
                  </div>
                </CCol>
                <CCol sm="4">
                  <div className="">
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Numero Acte Recrutement:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {person.numeroActeRecrutement}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Date de Recrutement:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {person.dateRecrutement}
                      </span>
                    </div>
                    <hr />

                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Grade de Recrutement:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {person?.firstGrade?.libelleGrade}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Grade Actuel:</strong>{" "}
                      </h6>
                      <span className="float-right text-right">
                        {person?.grade.libelleGrade}
                      </span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Categorie Actuelle</strong>
                      </h6>
                      <span>{person?.grade?.categorieIdCategorie}</span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Date d'entrée au Ministère</strong>
                      </h6>
                      <span>{person?.dateEntreeMinistere}</span>
                    </div>
                    <hr />
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Structure:</strong>
                      </h6>
                      <span className="float-right text-right">
                        {person?.structure?.designationAdministrative}
                      </span>
                    </div>
                    <hr />
                    {renderPoste(person?.postes)}
                    {/* {person?.postes.length > 0 && (
                      <>
                        <div className="d-flex align-items-center  justify-content-between">
                          <h6>
                            <strong>Poste:</strong>
                          </h6>
                          <span>
                            {person?.postes.length > 0
                              ? person.postes[0].libellePoste
                              : "Sans Poste"}
                          </span>
                        </div>
                        <hr />
                      </>
                    )} */}
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Région de Travail :</strong>
                      </h6>
                      <span className="float-right text-right">
                        {person?.structure?.region?.libelleRegion}
                      </span>
                    </div>
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Département de Travail :</strong>
                      </h6>
                      <span className="float-right text-right">
                        {person?.structure?.departement?.libelleDepartement}
                      </span>
                    </div>
                    <div className="d-flex align-items-center  justify-content-between">
                      <h6>
                        <strong>Arrondissement de Travail :</strong>
                      </h6>
                      <span className="float-right text-right">
                        {
                          person?.structure?.arrondissement
                            ?.libelleArrondissement
                        }
                      </span>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
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
      </CRow>

      <CRow>
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
      </CRow>

      <CRow>
        <CCol xs="12" sm="12" md="12">
          <CCard>
            <CTabs activeTab="home">
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink data-tab="home">Mouvements</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="profile">Gestion de profil</CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink data-tab="messages">Qualifications</CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="home">
                  <CDataTable
                    items={person.mouvements}
                    fields={fieldsMouvement}
                    scopedSlots={{
                      Numero: (item, index) => <td>{index}</td>,
                      poste: (item) => (
                        <td>{item.poste ? item.poste.libellePoste : " "}</td>
                      ),
                      structure: (item) => (
                        <td>
                          {item?.poste
                            ? item.poste?.structure.designationAdministrative
                            : item?.structure?.designationAdministrative}
                        </td>
                      ),
                      personnel: (item) => (
                        <td>
                          {item.personnels ? item.personnels[0].noms : ""}
                        </td>
                      ),
                      dateEffective: (item) => (
                        <td>{item.acte ? item.acte.dateSignature : ""}</td>
                      ),
                      natureActe: (item) => (
                        <td>
                          {item.acte
                            ? item.acte.natureActe.libelleNatureActe
                            : ""}
                        </td>
                      ),
                      numeroActe: (item) => (
                        <td>{item.acte ? item.acte.numeroActe : ""}</td>
                      ),
                      signataire: (item) => (
                        <td>
                          {item.acte ? item.acte.signataire.nomSignataire : ""}
                        </td>
                      ),
                      actions: ({ acte, idMouvement }, index) => {
                        return (
                          <td className="py-2">
                            <div
                              key={index}
                              className="d-flex justify-content-between"
                            >
                              {acte && (
                                <>
                                  {" "}
                                  <CTooltip
                                    content={
                                      acte.nomActe
                                        ? " Voir le document"
                                        : " document Indisponbile"
                                    }
                                  >
                                    <CButton
                                      disabled={!acte.nomActe ? true : false}
                                      target="_blank"
                                      color={
                                        acte.nomActe ? "success" : "danger"
                                      }
                                      size="sm"
                                      href={`${BUCKET_URL}/documents/${acte.nomActe}`}
                                    >
                                      <FontAwesomeIcon
                                        className="mr-2"
                                        icon={faEye}
                                      />
                                      {acte.nomActe ? " Voir" : " indisponible"}
                                    </CButton>
                                  </CTooltip>
                                  <CTooltip content=" Supprimer le mouvement ?">
                                    <CButton
                                      onClick={() =>
                                        toggleModalDetele(idMouvement)
                                      }
                                      className="ml-2"
                                      color="danger"
                                      size="sm"
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        className="mr-2"
                                      />
                                      Supprimer
                                    </CButton>
                                  </CTooltip>
                                </>
                              )}
                            </div>
                          </td>
                        );
                      },
                    }}
                  ></CDataTable>
                </CTabPane>
                <CTabPane data-tab="profile">Gestion du profil</CTabPane>
                <CTabPane data-tab="messages">Qualifications</CTabPane>
              </CTabContent>
            </CTabs>
          </CCard>
          <CRow className="mb-2">
            <CCol xs="12">
              <CanLevelThree
                role={profile.roles[0]}
                yes={() =>
                  !loader ? (
                    <CButton
                      onClick={toggleModalDeteleProfil}
                      color="danger"
                      size="xl"
                    >
                      <FontAwesomeIcon className="mr-2" icon={faUserTimes} />
                      Supprimer le personnel
                    </CButton>
                  ) : (
                    <div
                      className="spinner-border spinner-border-xl"
                      role="stastus"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  )
                }
                no={() => ""}
              />
            </CCol>
          </CRow>
          <CFormGroup row>
            <CCol sm="4">
              <input
                ref={photoElt}
                onChange={handlePicture}
                type="file"
                size="md"
                id="photo"
                hidden
              />
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ personnelState, userState }) => ({
  person: personnelState.personnel,
  profile: userState.profile,
});

export default connect(mapStateToProps, {
  fetchPersonnel,
  deleteMouvement,
  deletePersonnel,
})(PersonnelDetail);
