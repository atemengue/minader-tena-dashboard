import { CButton, CCol, CDataTable, CRow, CTooltip } from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { BUCKET_URL } from "../config";
import { fieldsMouvement, getBadge } from "../utils/dataTables";
import { calculateAge, isEmpty } from "../utils/functions";

const DetailPoste = ({ poste }) => {
  const renderFirstName = (sexe) => {
    if (sexe === "2") {
      return (
        <>
          <h6>
            <strong>Nom de jeune fille:</strong>
            {poste.personnel.nomJeuneFille}
          </h6>
          <hr />
        </>
      );
    } else {
      return " ";
    }
  };
  return !isEmpty(poste) ? (
    <>
      <CRow className="p-5">
        <CCol className="text-center" sm="12">
          <div className="d-flex justify-content-center h-100">
            <div className="image_outer_container">
              <div className="green_icon"></div>
              <div className="image_inner_container">
                <img
                  src={
                    poste.personnel && poste.personnel.photo
                      ? `${BUCKET_URL}/personnels/${poste.personnel.personnelIdArchive}/${poste.personnel.photo}`
                      : `${BUCKET_URL}/default/user.png`
                  }
                  alt="photo de profil"
                />
              </div>
              <div className="p-3 ">
                {poste.personnel && (
                  <CButton color={getBadge(poste.personnel.positionIdPosition)}>
                    {poste.personnel.position.libelle}
                  </CButton>
                )}
              </div>
            </div>
          </div>
        </CCol>
        <CCol sm="6">
          <div className="">
            <h6>
              <strong>Poste:</strong> {poste.libellePoste}
            </h6>
            <hr />
            <h6>
              <strong>Occupant: </strong>{" "}
              {poste.Occupant
                ? poste.Occupant
                : poste.personnel
                ? poste.personnel.nomsPrenoms
                : ""}
            </h6>
            <hr />
            <h6>
              <strong>Matricule: </strong>{" "}
              {poste.personnel ? poste.personnel.matricule : ""}
            </h6>
            <hr />
            <h6>
              <strong>Date de Recrutement: </strong>{" "}
              {poste.personnel ? poste.personnel.dateRecrutement : ""}
            </h6>
            <hr />
            <h6>
              <strong> Grade: </strong>
              {poste.personnel ? poste.personnel.grade.libelleGrade : ""}
            </h6>
            <hr />
            {renderFirstName(poste.personnel ? poste.personnel.sexe : null)}
            <h6>
              <strong>Catégorie: </strong>{" "}
              {poste.personnel
                ? poste?.personnel?.grade?.categorieIdCategorie
                : ""}
            </h6>
            <hr />
            <h6>
              <strong>Corps: </strong>
              {poste.personnel ? poste.personnel.grade.corp.libelleCorps : ""}
            </h6>
            <hr />
            <h6>
              <strong>Sexe: </strong>{" "}
              {poste.personnel === "1" ? "Masculin" : "Feminin"}
            </h6>
            <hr />
            <h6>
              <strong> Age: </strong>
              {poste.personnel
                ? poste.personnel.dateNaissance === null
                  ? ""
                  : calculateAge(poste.personnel.dateNaissance)
                : ""}
            </h6>
            <hr />
            <h6>
              <strong>Telephones:</strong>{" "}
              {poste.personnel ? poste.personnel.telephones : ""}
            </h6>
          </div>
        </CCol>
        <CCol sm="6">
          <div className="">
            <h6>
              <strong>Nature du poste:</strong>{" "}
              {poste.naturePoste.libelleNaturePoste}
            </h6>
            <hr />
            <h6>
              <strong>Rang du poste:</strong>{" "}
              {poste.naturePoste.rangPoste.libelleRangPoste}
            </h6>
            <hr />
            <h6>
              <strong>Structure:</strong>{" "}
              {poste.structure.designationAdministrative}
            </h6>
            <hr />
            <h6>
              <strong>Date de Nomination au poste: </strong>
              {
                poste?.mouvements[poste?.mouvements.length - 1]
                  ?.datePriseEffective
              }
            </h6>
            <hr />
            <h6>
              <strong>Numero de l'acte: </strong>
              {
                poste?.mouvements[poste?.mouvements.length - 1]?.acte
                  ?.numeroActe
              }
            </h6>
            <hr />
            <h6>
              <strong>Nature de l'acte: </strong>
              {
                poste.mouvements[poste.mouvements.length - 1]?.acte?.natureActe
                  ?.libelleNatureActe
              }
            </h6>
            <CButton
              disabled={
                !poste.mouvements[poste.mouvements.length - 1]?.acte?.nomActe
                  ? true
                  : false
              }
              target="_blank"
              color={
                poste.mouvements[poste.mouvements.length - 1]?.acte?.nomActe
                  ? "success"
                  : "danger"
              }
              size="sm"
              href={`${BUCKET_URL}/documents/${
                poste.mouvements[poste.mouvements.length - 1]?.acte?.nomActe
              }`}
            >
              <FontAwesomeIcon className="mr-2" icon={faEye} />
              {poste.mouvements[poste.mouvements.length - 1]?.acte?.nomActe
                ? " Voir"
                : " indisponible"}
            </CButton>
          </div>
        </CCol>
      </CRow>
      <hr />
      <CRow>
        <CCol>
          <h2>Historique du poste </h2>
          <CDataTable
            scopedSlots={{
              Numero: (item, index) => <td>{index}</td>,
              poste: (item) => (
                <td>{item.poste ? item.poste.libellePoste : " "}</td>
              ),
              structure: (item) => (
                <td>
                  {item?.structure
                    ? item?.structure.designationAdministrative
                    : item?.structure?.designationAdministrative}
                </td>
              ),
              personnel: (item) => (
                <td>{item.personnels ? item.personnels[0].noms : ""}</td>
              ),
              dateEffective: (item) => (
                <td>{item.acte ? item.acte.dateSignature : ""}</td>
              ),
              natureActe: (item) => (
                <td>
                  {item.acte ? item.acte.natureActe.libelleNatureActe : ""}
                </td>
              ),
              numeroActe: (item) => (
                <td>{item.acte ? item.acte.numeroActe : ""}</td>
              ),
              signataire: (item) => (
                <td>{item.acte ? item.acte.signataire.nomSignataire : ""}</td>
              ),
              actions: ({ acte, idMouvement }, index) => {
                return (
                  <td className="py-2">
                    <div key={index} className="d-flex justify-content-between">
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
                              color={acte.nomActe ? "success" : "danger"}
                              size="sm"
                              href={`${BUCKET_URL}/documents/${acte.nomActe}`}
                            >
                              <FontAwesomeIcon className="mr-2" icon={faEye} />
                              {acte.nomActe ? " Voir" : " indisponible"}
                            </CButton>
                          </CTooltip>
                        </>
                      )}
                    </div>
                  </td>
                );
              },
            }}
            items={poste?.mouvements}
            fields={fieldsMouvement}
          ></CDataTable>
        </CCol>
      </CRow>
    </>
  ) : null;
};

export default DetailPoste;
