import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CInput,
  CLabel,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import {
  faClosedCaptioning,
  faJoint,
  faSave,
  faTrash,
  faUserAltSlash,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import PersonnelCroisement from "./PersonnelCroisement";

const Croisement = () => {
  const FileInput = createRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [present, setPresent] = useState([]);
  const [nonPresent, setNonPresent] = useState([]);

  const onSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    toast.warning("Croisement en cours");

    const formData = new FormData();

    if (file) {
      formData.append("file", file, file.name);
    }

    try {
      const response = await fetch(`${API_URL}/solde/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
      toast.success("Croisement terminé");
      setPresent(data?.present);
      setNonPresent(data?.nonPresent);
    } catch (error) {
      setLoading(false);
      toast.error("Erreur sur le croisement verifier les champs du fichier");
    }
  };

  return (
    <CCard>
      <CForm onSubmit={onSave}>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <div>
            <h4>Croisement des fichiers avec le fichier DRH</h4>
          </div>

          {loading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CButton type="submit" size="md" color="success">
              Croiser les fichiers <FontAwesomeIcon icon={faJoint} size="md" />
            </CButton>
          )}
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md="12">
              <CLabel className="font-weight-bold" htmlFor="selectFile">
                Selectionner le fichier
              </CLabel>
              <CInput
                ref={FileInput}
                required
                onChange={(file) => setFile(file.target.files[0])}
                type="file"
                name="selectFile"
                id="selectFile"
              />
            </CCol>
          </CRow>
          <CTabs activeTab="PersonnelPresent">
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink data-tab="PersonnelPresent">
                  <FontAwesomeIcon
                    color="#2eb85c"
                    size="2x"
                    className="mr-1"
                    icon={faUserCheck}
                  />
                  Personnel Present
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink data-tab="personnelNonPresent">
                  <FontAwesomeIcon
                    color="#e03232"
                    size="2x"
                    className="mr-1"
                    icon={faUserAltSlash}
                  />
                  Personnel Non Present
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane data-tab="PersonnelPresent">
                <PersonnelCroisement name="present" personnels={present} />
              </CTabPane>

              <CTabPane data-tab="personnelNonPresent">
                <PersonnelCroisement
                  name="nomPresent"
                  personnels={nonPresent}
                />
              </CTabPane>
            </CTabContent>
          </CTabs>
        </CCardBody>
        <CCardFooter className="d-flex justify-content-between">
          <CButton size="md" color="danger">
            <FontAwesomeIcon icon={faTrash} size="md" /> Vider les champs
          </CButton>
        </CCardFooter>
      </CForm>
    </CCard>
  );
};

export default Croisement;
