import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { faBars, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { fetchNatureActes } from "../../actions/natureActions";
import { fetchSignataires } from "../../actions/signataireActions";
import { API_URL } from "../../config";

const CreerArchive = (props) => {
  const FileInput = createRef();
  const { naturesActes, fetchNatureActes, fetchSignataires, signataires } =
    props;

  const [acte, setActe] = useState({
    numeroActePartOne: null,
    numeroActePartTwo: null,
    dateSignature: null,
    description: null,
    idActeAdministratif: null,
    signataireIdSignataire: null,
    natureActeIdNatureActe: null,
    description: null,
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (naturesActes.length === 0) {
      fetchNatureActes();
    }
    if (signataires.length === 0) {
      fetchSignataires();
    }
  }, [naturesActes, fetchNatureActes, signataires, fetchSignataires]);

  const onSave = (event) => {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData();

    if (file) {
      formData.append("file", file, file.name);
    }
    formData.append(
      "numeroActe",
      acte.numeroActePartOne +
        "/" +
        acte.numeroActePartTwo +
        " DU " +
        acte.dateSignature
    );
    formData.append("dateSignature", acte.dateSignature);
    formData.append("description", acte.description);
    formData.append(
      "signataireIdSignataire",
      parseInt(acte.signataireIdSignataire)
    );
    formData.append(
      "natureActeIdNatureActe",
      parseInt(acte.natureActeIdNatureActe)
    );

    fetch(`${API_URL}/actes/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          clearInput();
          toast.success("Acte ajouté avec success");
        } else {
          toast.error("Erreur: Verifiez les champs");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const clearInput = () => {
    setActe({
      numeroActePartOne: "",
      numeroActePartTwo: "",
      dateSignature: "",
      description: "",
      idActeAdministratif: "",
      signataireIdSignataire: "",
      natureActeIdNatureActe: "",
      description: "",
    });

    setFile(null);
  };

  return (
    <>
      <CCard>
        <CForm onSubmit={onSave}>
          <CCardHeader className="d-flex justify-content-between">
            <h4>Creer une archive</h4>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol md="3">
                <CLabel className="font-weight-bold" htmlFor="selectNature">
                  Nature:
                </CLabel>
                <CSelect
                  required
                  value={acte.natureActeIdNatureActe}
                  onChange={(nature) =>
                    setActe({
                      ...acte,
                      natureActeIdNatureActe: nature.target.value,
                    })
                  }
                  name="selectNature"
                  id="selectNature"
                >
                  {[
                    {
                      idNatureActe: 0,
                      libelleNatureActe: "Selectionner la nature",
                    },
                    ...naturesActes,
                  ].map((nature, index) => {
                    return (
                      <option key={index} value={nature.idNatureActe}>
                        {nature.libelleNatureActe}
                      </option>
                    );
                  })}
                </CSelect>
              </CCol>
              <CCol md="3">
                <CLabel className="font-weight-bold" htmlFor="selectNumero">
                  Numero(N°):
                </CLabel>
                <CInput
                  required
                  value={acte.numeroActePartOne}
                  onChange={(numero) =>
                    setActe({
                      ...acte,
                      numeroActePartOne: numero.target.value,
                    })
                  }
                  id="selectNumero"
                  placeholder="Numero du document"
                />
              </CCol>
              <CCol md="3">
                <CLabel className="font-weight-bold" htmlFor="selectNumero">
                  /
                </CLabel>
                <CInput
                  required
                  value={acte.numeroActePartTwo}
                  id="selectDu"
                  placeholder="/STRUCTURE"
                  onEND
                  onChange={(numero) =>
                    setActe({
                      ...acte,
                      numeroActePartTwo: numero.target.value,
                    })
                  }
                />
              </CCol>
              <CCol md="3">
                <CLabel className="font-weight-bold" htmlFor="selectDu">
                  DU
                </CLabel>
                <CInput
                  required
                  value={acte.dateSignature}
                  onChange={(du) =>
                    setActe({
                      ...acte,
                      dateSignature: du.target.value,
                    })
                  }
                  type="date"
                  id="selectDu"
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="mb-3" md="6">
                <CLabel
                  className="font-weight-bold"
                  htmlFor="selectDescription"
                >
                  Description:
                </CLabel>
                <CTextarea
                  value={acte.description}
                  required
                  onChange={(value) =>
                    setActe({
                      ...acte,
                      description: value.target.value,
                    })
                  }
                  id="selectDescription"
                  placeholder="portant......"
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="12">
                <CLabel className="font-weight-bold" htmlFor="Signataire">
                  Signataire:
                </CLabel>
              </CCol>
              <CCol xs="12" md="6" className="d-flex">
                <CSelect
                  required
                  onChange={(signataire) =>
                    setActe({
                      ...acte,
                      signataireIdSignataire: signataire.target.value,
                    })
                  }
                  defaultValue={0}
                  value={acte.signataireIdSignataire}
                  name="Signataire"
                  id="Signataire"
                >
                  {[
                    {
                      idSignataire: 0,
                      nomSignataire: "Selectionner le signataire",
                    },
                    ...signataires,
                  ].map((signataire, index) => {
                    return (
                      <option key={index} value={signataire.idSignataire}>
                        {signataire.nomSignataire}
                      </option>
                    );
                  })}
                </CSelect>
                <CButton className="ml-3" size="xs" color="danger">
                  <FontAwesomeIcon icon={faBars} size="xs" />
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol md="12">
                <CLabel className="font-weight-bold" htmlFor="selectFile">
                  Selectionner le fichier
                </CLabel>
                <CInput
                  ref={FileInput}
                  onChange={(file) => setFile(file.target.files[0])}
                  type="file"
                  name="selectFile"
                  id="selectFile"
                />
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="d-flex justify-content-between">
            <CButton onClick={clearInput} size="md" color="danger">
              <FontAwesomeIcon icon={faTrash} size="md" /> Vider les champs
            </CButton>
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <CButton type="submit" size="md" color="success">
                Enregistrer <FontAwesomeIcon icon={faSave} size="md" />
              </CButton>
            )}
          </CCardFooter>
        </CForm>
      </CCard>
    </>
  );
};

const mapStateToProps = ({ natureActeState, signataireState }) => ({
  naturesActes: natureActeState.naturesActes,
  signataires: signataireState.signataires,
});

const mapDispatchToProps = {
  fetchNatureActes,
  fetchSignataires,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreerArchive);
