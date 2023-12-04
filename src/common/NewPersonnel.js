import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React from "react";
import {
  getLibelleItem,
  getNatureRecrutement,
  getNiveauiInstruction,
  getPositionAdministrative,
  getStatutMatrimonial,
} from "../utils/functions";

const NewPersonnel = ({
  personnel,
  location,
  grades,
  structures,
  photoUrl,
}) => {
  const {
    noms,
    prenoms,
    matricule,
    dateRecrutement,
    email,
    telephones,
    sexe,
    arrondissementIdArrondissement,
    departementIdDepartement,
    regionIdRegion,
    nomJeuneFille,
    dateNaissance,
    lieuNaissance,
    numeroCNI,
    dateCNI,
    statutMatrimonial,
    nbEnfant,
    natureActeRecrutement,
    numeroActeRecrutement,
    indice,
    echelon,
    classe,
    gradeIdGrade, // GRADE ACTUEL
    gradeRecrutement,
    structureIdStructure,
    positionAdministrativeIdPositionAdministrative,
    dateDePriseEffective,
    lieuDelivranceCNI,
    niveauInstruction,
    diplomeMax,
    dateObtentionDiplomeMax,
    dateEntreeMinistere,
  } = personnel;

  return (
    <CRow className="p-5">
      <CCol className="text-center" sm="12">
        <div className="d-flex justify-content-center h-100">
          <div className="row">
            <div className="col-xs-12 col-md-12 mb-5">
              <div className="d-flex justify-conteWnt-center h-100">
                <div className="image_outer_conWtainer">
                  <div className="green_icon"></div>
                  <div className="image_inner_container">
                    <img src={photoUrl ? photoUrl : "images/user.png"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCol>
      <CCol sm="4">
        <div className="">
          <div className="d-flex justify-content-between">
            <h6>
              <strong>Noms:</strong>
            </h6>
            <span className="float-right text-right">{noms}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>
              <strong>Matricule:</strong>
            </h6>
            <span className="float-right text-right">{matricule}</span>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <h6>
              <strong>Prénoms:</strong>
            </h6>
            <span className="float-right text-right">{prenoms}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>
              <strong>Nom de Jeune Fille:</strong>
            </h6>
            <span className="float-right text-right">{nomJeuneFille}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>
              <strong>Sexe:</strong>
            </h6>
            {sexe === null ? "" : sexe === "1" ? "Masculin" : "Feminin"}
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>
              <strong>Télephones:</strong>
            </h6>
            {telephones}
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h6>
              <strong>Email:</strong>
            </h6>
            {email}
          </div>
        </div>
      </CCol>

      <CCol sm="4">
        <div className="">
          <div className="d-flex justify-content-between">
            <strong>Region d'Origine:</strong>
            <h6>{getLibelleItem(location.regions, regionIdRegion)}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Departement d'Origine:</strong>
            <h6>
              {getLibelleItem(location.departements, departementIdDepartement)}
            </h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Arrondissement d'Origine:</strong>
            <h6>
              {getLibelleItem(
                location.arrondissements,
                arrondissementIdArrondissement
              )}
            </h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Date de Naissance:</strong>
            <h6>{dateNaissance}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Lieu de Naissance:</strong>
            <h6>{lieuNaissance}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>N° CNI/Passport:</strong>
            <h6>{numeroCNI}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Date CNI/Passport:</strong>
            <h6>{dateCNI}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Lieu de Delivrance CNI:</strong>
            <h6>{lieuDelivranceCNI}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Statut Matrimonial:</strong>
            <h6>{getStatutMatrimonial(statutMatrimonial)}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Nombre d'enfant:</strong>
            <h6>{nbEnfant}</h6>
          </div>
        </div>
      </CCol>
      <CCol sm="4">
        <div className="">
          <CCard color="danger" className="text-white">
            <CCardBody>
              <div className="d-flex justify-content-between">
                <strong>Nature du recrutement:</strong>
                <h6>{getNatureRecrutement(natureActeRecrutement)}</h6>
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                <strong>N° Acte: </strong>
                <h6>{numeroActeRecrutement}</h6>
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                <strong>Date du Recrutement:</strong>
                <h6>{dateRecrutement}</h6>
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                <strong>Grade Recrutement:</strong>
                <h6>{getLibelleItem(grades, gradeRecrutement)}</h6>
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                <strong>Grade Actuel:</strong>
                <h6>{getLibelleItem(grades, gradeIdGrade)}</h6>
              </div>
            </CCardBody>
          </CCard>
          <hr />

          <div className="d-flex justify-content-between">
            <strong>Niveau d'Instruction :</strong>
            <h6>{getNiveauiInstruction(niveauInstruction)}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Diplome Eleve :</strong>
            <h6>{diplomeMax}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Date d'obtention du diplome:</strong>
            <h6>{dateObtentionDiplomeMax}</h6>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <strong>Indice:</strong>
            <h6>{indice}</h6>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <strong>Classe:</strong>
            <h6>{classe}</h6>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <strong>Echelon:</strong>
            <h6>{echelon}</h6>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <strong>Structure d'affection:</strong>
            <span className="float-right text-right">
              {getLibelleItem(structures, structureIdStructure)}
            </span>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <strong>Position Administrative:</strong>
            <h6>
              {getPositionAdministrative(
                positionAdministrativeIdPositionAdministrative
              )}
            </h6>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <strong>Date d'entree au Ministère:</strong>
            <h6>{dateEntreeMinistere}</h6>
          </div>
          <hr />

          <div className="d-flex justify-content-between">
            <strong>Date d'affection:</strong>
            <h6>{dateDePriseEffective}</h6>
          </div>
          <hr />
        </div>
      </CCol>
    </CRow>
  );
};

export default NewPersonnel;
