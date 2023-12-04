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
  CTooltip,
} from "@coreui/react";
import {
  faArrowLeft,
  faBars,
  faEye,
  faEyeSlash,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { fetchActe, fetchNatureActes } from "../../actions/natureActions";
import { fetchSignataires } from "../../actions/signataireActions";
import { API_URL, BUCKET_URL } from "../../config";

const ActeDetails = (props) => {
  const FileInput = createRef();
  const {
    naturesActes,
    fetchNatureActes,
    fetchSignataires,
    signataires,
    fetchActe,
    data,
  } = props;

  const [idActe, setIdActe] = useState(props.match.params.idActe);

  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);

  const [acte, setActe] = useState(props.location.state?.data || {});

  useEffect(() => {
    if (naturesActes.length === 0) {
      fetchNatureActes();
    }
    if (signataires.length === 0) {
      fetchSignataires();
    }
  }, []);

  const onSave = (event) => {
    event.preventDefault();

    setLoading(true);
    const formData = new FormData();

    if (file) {
      formData.append("file", file, file.name);
    }

    formData.append("idActe", acte.idActe);
    formData.append("numeroActe", acte.numeroActe);
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

    fetch(`${API_URL}/actes`, {
      method: "PATCH",
      body: formData,
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          toast.success("Acte ajouté avec success");
          props.history.goBack();
        } else {
          toast.error("Erreur: Verifiez les champs");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  return (
    <>
      {console.log(acte)}
      <CCol col="2" sm="6" md="2" className="mb-3">
        <CButton
          onClick={() => props.history.goBack()}
          block
          size="sm"
          color="dark"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Retour
        </CButton>
      </CCol>
      <CCard>
        <CForm onSubmit={onSave}>
          <CCardHeader className="d-flex justify-content-between">
            <h4>Informations du l'Acte</h4>
            <CTooltip
              content={
                acte?.nomActe
                  ? " Voir le document dans les archives"
                  : "Document Non disponible"
              }
            >
              <CButton
                target="_blank"
                href={`${BUCKET_URL}/documents/${acte?.nomActe}`}
                disabled={acte?.nomActe ? false : true}
                color={acte?.nomActe ? "success" : "danger"}
                size="xl"
              >
                <FontAwesomeIcon icon={acte?.nomActe ? faEye : faEyeSlash} />
                {acte?.nomActe
                  ? " Voir le document"
                  : " Document Non disponible"}
              </CButton>
            </CTooltip>
          </CCardHeader>
          {acte && (
            <CCardBody>
              <CRow className="mb-3">
                <CCol md="3">
                  <CLabel className="font-weight-bold" htmlFor="selectNature">
                    Nature:
                  </CLabel>
                  <CSelect
                    required
                    value={acte?.natureActeIdNatureActe}
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
                <CCol md="5">
                  <CLabel className="font-weight-bold" htmlFor="selectNumero">
                    Numero(N°):
                  </CLabel>
                  <CInput
                    required
                    value={acte?.numeroActe}
                    onChange={(numero) =>
                      setActe({
                        ...acte,
                        numeroActe: numero.target.value,
                      })
                    }
                    id="selectNumero"
                    placeholder="Numero du document"
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
              <CRow className="md-3"></CRow>
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
          )}
          <CCardFooter className="d-flex justify-content-between">
            <CButton disabled size="sm" color="danger">
              <FontAwesomeIcon icon={faTrash} size="md" /> Vider les champs
            </CButton>
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <CButton type="submit" size="sm" color="success">
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
  data: natureActeState.acte,
});

const mapDispatchToProps = {
  fetchNatureActes,
  fetchSignataires,
  fetchActe,
};

export default connect(mapStateToProps, mapDispatchToProps)(ActeDetails);
