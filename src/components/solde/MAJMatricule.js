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
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import { faArrowRight, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { updateMatricules } from "../../actions/soldeActions/index";
import ListSelectedPersonnelModal from "../../common/ListSelectedPersonnelModal";
import { getEnSolde } from "../../utils/dataTables";

const MAJMatricule = ({ history, ...props }) => {
  const [inputList, setInputList] = useState([]);
  const [modal, setModal] = useState(false);
  const mutation = useMutation((list) => props.updateMatricules(list), {
    onSuccess: (response) => {
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setTimeout(() => {
          mutation.reset();
          clearInput();
        }, 2000);
      }
    },
  });

  const fields = ["Ancien", "Remplace", "Nouveau", "En_Solde", "Mois", "Annee"];

  const handleInputChange = (e, index) => {
    const { name, value, checked } = e.target;
    const list = [...inputList];
    if (name !== "Solde") {
      list[index][name] = value;
    } else {
      if (checked === false) {
        list[index]["Mois"] = null;
        list[index]["Annee"] = null;
      }
      list[index][name] = checked;
    }
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        Ancien: "",
        Nouveau: "",
        Solde: false,
        Mois: null,
        Annee: null,
      },
    ]);
  };

  const toggle = () => {
    setModal(!modal);
  };

  const setNewPersonnel = ({ dataList }) => {
    let personnels = [];
    dataList.map((personnel) => {
      personnels = [
        ...personnels,
        {
          Ancien: personnel.matricule,
          Nouveau: null,
          Solde: false,
          Mois: null,
          Annee: null,
          noms: personnel.nomsPrenoms,
        },
      ];
    });

    setInputList(personnels);
  };

  const clearInput = () => {
    setInputList([]);
  };

  const checkObjectProperty = () => {
    let isNull = false;
    inputList.forEach((obj) => {
      isNull = !Object.values(obj).every((o) => o === null);
    });
    pre;
    return isNull;
  };

  return (
    <>
      <ListSelectedPersonnelModal
        modal={modal}
        toggle={toggle}
        setNewPersonnel={setNewPersonnel}
      />
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CForm action="" method="post">
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <h5>Mettre à jour les matricules et l'etat de la solde</h5>
                <CButton onClick={toggle} color="info">
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faUserPlus}
                    color="white"
                  />
                  Selectionner
                </CButton>
              </CCardHeader>
              <CCardBody>
                <CFormGroup>
                  {inputList.map((x, i) => {
                    return (
                      <>
                        <hr />
                        <CRow key={i} className="my-4">
                          <CCol xs="12">
                            <h6>
                              <strong>Noms: </strong>
                              {x.noms}
                            </h6>
                          </CCol>
                          <CCol xs="6">
                            <CInput
                              autoComplete={false}
                              disabled
                              name="Ancien"
                              value={x.Ancien}
                              placeholder="Matricule d'integration"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </CCol>

                          <CCol xs="6" className="mb-3">
                            <CInput
                              autoComplete={false}
                              name="Nouveau"
                              placeholder="Matricule"
                              value={x.Nouveau}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </CCol>
                          <CCol xs="6" className="mb-3 align-items-center">
                            <CFormGroup variant="checkbox">
                              <CInputCheckbox
                                onChange={(e) => handleInputChange(e, i)}
                                id="checkbox1"
                                name="Solde"
                                value={x.Solde}
                              />
                              <CBadge color="warning" htmlFor="radio1">
                                <h6>Déja pris en charge?</h6>
                              </CBadge>
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CRow>
                              <CCol xs="6">
                                <CFormGroup>
                                  <CLabel htmlFor="ccmonth">Mois</CLabel>
                                  <CSelect
                                    disabled={x.Solde ? false : true}
                                    onChange={(e) => handleInputChange(e, i)}
                                    custom
                                    name="Mois"
                                    id="ccmonth"
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                  </CSelect>
                                </CFormGroup>
                              </CCol>
                              <CCol xs="6">
                                <CFormGroup>
                                  <CLabel htmlFor="ccyear">Annee</CLabel>
                                  <CSelect
                                    disabled={x.Solde ? false : true}
                                    onChange={(e) => handleInputChange(e, i)}
                                    custom
                                    name="Annee"
                                    id="ccyear"
                                  >
                                    <option>2017</option>
                                    <option>2018</option>
                                    <option>2019</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                  </CSelect>
                                </CFormGroup>
                              </CCol>
                            </CRow>
                          </CCol>
                          <CCol xs="12">
                            {inputList.length !== 1 && (
                              <CButton
                                className="mx-1"
                                onClick={() => handleRemoveClick(i)}
                                color="danger"
                                size="sm"
                              >
                                Supprimer le personnel
                              </CButton>
                            )}
                            {inputList.length - 1 === i && (
                              <CButton
                                size="sm"
                                className="mx-1"
                                onClick={handleAddClick}
                                color="primary"
                              >
                                Ajouter le personnel
                              </CButton>
                            )}
                          </CCol>
                        </CRow>
                      </>
                    );
                  })}
                </CFormGroup>
              </CCardBody>
            </CForm>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <div className="position-sticky">
            <CCard>
              <CCardHeader>
                <h5>Listes des matricules</h5>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  sorter
                  header
                  tableFilter
                  items={inputList}
                  fields={fields}
                  scopedSlots={{
                    Ancien: (item) => <td>{item.Ancien}</td>,
                    Remplace: (_) => (
                      <td className="text-center">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </td>
                    ),
                    Nouveau: (item) => <td>{item.Nouveau}</td>,
                    En_Solde: (item) => (
                      <td>
                        <CBadge size="md" color="warning">
                          <h6>{getEnSolde(item.Solde)}</h6>
                        </CBadge>
                      </td>
                    ),
                    Mois: (item) => <td>{item.Mois}</td>,
                    Annee: (item) => <td>{item.Annee}</td>,
                  }}
                />
              </CCardBody>

              <CCardFooter className="d-flex justify-content-between">
                <CBadge size="md" color="warning">
                  <h6>Total: {inputList.length}</h6>
                </CBadge>

                <CButton onClick={clearInput} size="md" color="danger">
                  Vider les champs
                </CButton>
                {props.isLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <CButton
                    onClick={() => mutation.mutate(inputList)}
                    size="md"
                    color="success"
                  >
                    Valider les mises a jours
                  </CButton>
                )}
              </CCardFooter>
            </CCard>
          </div>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ soldeState, errorState }) => ({
  isLoading: soldeState.isLoading,
  updateNumber: soldeState.updateNumber,
});

export default connect(mapStateToProps, { updateMatricules })(MAJMatricule);
