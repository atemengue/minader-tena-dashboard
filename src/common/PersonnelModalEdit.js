import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { getBatch } from "react-redux/lib/utils/batch";
import { BUCKET_URL } from "../config";
import { getBadge } from "../utils/dataTables";
import { calculateAge, isEmpty } from "../utils/functions";

const PersonnelModalEdit = ({ modal, toggle, personnel }) => {
  const [data, setData] = useState(personnel);

  const renderFirstName = (sexe) => {
    if (sexe === "2") {
      return (
        <>
          <div className="d-flex align-items-center  justify-content-between">
            <h6>
              <strong>Nom de jeune fille: </strong>
            </h6>
            <span>{personnel.nomJeuneFille}</span>
          </div>
          <hr />
        </>
      );
    }
  };

  const renderPoste = (personnel) => {
    if (personnel?.postes.length > 0) {
      return personnel.postes.map((poste, index) => {
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
              {personnel?.positionAdministrative?.libelle}
            </span>
          </div>
        </>
      );
    }
  };

  return !isEmpty(personnel) ? (
    <CModal size="lg" show={modal} onClose={toggle} color="info">
      <CModalHeader
        closeButton
        className="d-flex align-items-center justify-content-between"
      >
        {/* <span className="mr-3">{personnel.nomsPrenoms}</span> */}
        <CButton color="warning" to={`/personnels/${personnel.matricule}`}>
          <FontAwesomeIcon icon={faEye} className="mr-2" />
          Voir le profil
        </CButton>
      </CModalHeader>
      <CModalBody>
        <CRow className="p-5">
          <CCol sm="6">
            <div className="">
              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Matricule: </strong>
                </h6>
                <span className="float-right text-right">
                  {personnel.matricule}
                </span>
              </div>
              <hr />

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Noms: </strong>
                </h6>
                <span className="float-right text-right">{personnel.noms}</span>
              </div>
              <hr />

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Prénoms:</strong>
                </h6>
                <span className="float-right text-right">
                  {personnel.prenoms}
                </span>
              </div>
              <hr />

              {renderFirstName(personnel.sexe)}

              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Sexe: </strong>
                </h6>
                <span className="float-right text-right">
                  <CFormGroup variant="checkbox" inline>
                    <CInputRadio
                      checked={personnel.sexe === "1" ? true : false}
                      className="form-check-input"
                      id="masculin"
                      name="sexe"
                      value={1}
                      onChange={(value) => {
                        setData({ ...personnel, sexe: value.target.value });
                      }}
                    />
                    <CLabel variant="checkbox" htmlFor="masculin">
                      Masculin
                    </CLabel>
                  </CFormGroup>
                  <CFormGroup variant="checkbox" inline>
                    <CInputRadio
                      checked={personnel.sexe === "2" ? true : false}
                      className="form-check-input"
                      id="feminin"
                      name="sexe"
                      value={2}
                      onChange={(value) => {
                        setData({ ...personnel, sexe: value.target.value });
                      }}
                    />
                    <CLabel variant="checkbox" htmlFor="feminin">
                      Feminin
                    </CLabel>
                  </CFormGroup>
                </span>
              </div>

              <hr />
              <div className="d-flex align-items-center  justify-content-between">
                <h6>
                  <strong>Telephones: </strong>
                </h6>
                <span className="float-right text-right">
                  {personnel.telephones}
                </span>
              </div>
              <hr />
            </div>
            <div className="">
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Date de Recrutement:</strong>{" "}
                </h6>
                <span className="float-right text-right">
                  {personnel.dateRecrutement}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Grade:</strong>{" "}
                </h6>
                <span className="float-right text-right">
                  {personnel.grade.libelleGrade}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Categorie:</strong>
                </h6>
                <span>{personnel.grade?.categorieIdCategorie}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Structure:</strong>
                </h6>
                <span className="float-right text-right">
                  {personnel.structure
                    ? personnel.structure.designationAdministrative
                    : "Structure Inconnue"}
                </span>
              </div>

              <hr />
              <div>{renderPoste(personnel)}</div>
              <div className="d-flex justify-content-between">
                <h6>
                  <strong>Région de Travail :</strong>
                </h6>
                <span>{personnel.structure?.region?.libelleRegion}</span>
              </div>
            </div>
          </CCol>
          {/* <CCol sm="6">// MODIFIER ICI</CCol> */}
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="warning" to={`/personnels/${data.matricule}`}>
          Modifier les informatons
        </CButton>
        <CButton color="secondary" onClick={toggle}>
          Fermer
        </CButton>
      </CModalFooter>
    </CModal>
  ) : null;
};

export default PersonnelModalEdit;
