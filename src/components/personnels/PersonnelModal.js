import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BUCKET_URL } from "../../config";
import { getBadge } from "../../utils/dataTables";
import { calculateAge, isEmpty } from "../../utils/functions";

const PersonnelModal = ({ modal, toggle, data }) => {
  const renderFirstName = (sexe) => {
    if (sexe === "2") {
      return (
        <>
          <div className="d-flex align-items-center  justify-content-between">
            <h6>
              <strong>Nom de jeune fille: </strong>
            </h6>
            <span>{data.nomJeuneFille}</span>
          </div>
          <hr />
        </>
      );
    }
  };

  const renderPoste = (data) => {
    if (data?.postes.length > 0) {
      return data.postes.map((poste, index) => {
        return (
          <>
            <div className="d-flex justify-content-between">
              <h6>
                <strong>Poste:{++index}</strong>
              </h6>
              <span className="float-right text-right">
                {poste.libellePoste}
              </span>
            </div>
            <hr />
          </>
        );
      });
    } else {
      return (
        <>
          <div className="d-flex justify-content-between">
            <h6>
              <strong></strong>{" "}
            </h6>
            <span className="float-right text-right">
              {data?.positionAdministrative?.libelle}
            </span>
          </div>
        </>
      );
    }
  };

  return !isEmpty(data) ? (
    <CModal size="lg" show={modal} onClose={toggle} color="info">
      <CModalHeader
        closeButton
        className="d-flex align-items-center justify-content-between"
      >
        {/* <span className="mr-3">{data.nomsPrenoms}</span> */}
        <CButton color="warning" to={`/personnels/${data.matricule}`}>
          <FontAwesomeIcon icon={faEye} className="mr-2" />
          Voir le profil
        </CButton>
      </CModalHeader>
      <CModalBody>
        <CRow className="p-5">
          <CCol className="text-center" sm="12">
            <div className="d-flex justify-content-center h-100">
              <div className="image_outer_container">
                <div className="green_icon"></div>
                <div className="image_inner_container">
                  <img
                    src={
                      data?.photo
                        ? `${BUCKET_URL}/personnels/${data?.personnelIdArchive}/${data?.photo}`
                        : `${BUCKET_URL}/default/user.png`
                    }
                    alt="photo de profil"
                  />
                </div>
                <div className="p-3 ">
                  <CButton color={getBadge(data.positionIdPosition)}>
                    {data.position.libelle}
                  </CButton>
                </div>
              </div>
            </div>
          </CCol>
          <CCol sm="6">
            <div className="">
              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Matricule: </strong>
                </h6>
                <span className="float-right text-right">{data.matricule}</span>
              </div>
              <hr />

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Noms: </strong>
                </h6>
                <span className="float-right text-right">{data.noms}</span>
              </div>
              <hr />

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Prénoms:</strong>
                </h6>
                <span className="float-right text-right">{data.prenoms}</span>
              </div>
              <hr />

              {renderFirstName(data.sexe)}

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Sexe: </strong>
                </h6>
                <span className="float-right text-right">
                  {data.sexe === "1" ? "Masculin" : "Feminin"}
                </span>
              </div>
              <hr />

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Age: </strong>
                </h6>
                <span className="float-right text-right">
                  {data.dateNaissance === null
                    ? ""
                    : calculateAge(data.dateNaissance)}
                </span>
              </div>
              <hr />

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Date de Retraite: </strong>
                </h6>
                <span className="float-right text-right">
                  {data.dateRetraite}
                </span>
              </div>
              <hr />
              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Telephones: </strong>
                </h6>
                <span className="float-right text-right">
                  {data.telephones}
                </span>
              </div>
              <hr />
            </div>
          </CCol>
          <CCol sm="6">
            <div className="">
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Date de Recrutement:</strong>{" "}
                </h6>
                <span className="float-right text-right">
                  {data.dateRecrutement}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Grade:</strong>{" "}
                </h6>
                <span className="float-right text-right">
                  {data.grade.libelleGrade}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Categorie:</strong>
                </h6>
                <span>{data.grade?.categorieIdCategorie}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Structure:</strong>
                </h6>
                <span className="float-right text-right">
                  {data.structure
                    ? data.structure.designationAdministrative
                    : "Structure Inconnue"}
                </span>
              </div>

              <hr />
              <div>{renderPoste(data)}</div>
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Région de Travail :</strong>
                </h6>
                <span>{data.structure?.region?.libelleRegion}</span>
              </div>
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" to={`/personnels/${data.matricule}`}>
          Voir les details
        </CButton>
        <CButton color="secondary" onClick={toggle}>
          Fermer
        </CButton>
      </CModalFooter>
    </CModal>
  ) : null;
};

export default PersonnelModal;
