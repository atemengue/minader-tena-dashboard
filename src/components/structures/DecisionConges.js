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
  CInput,
  CInputCheckbox,
  CLabel,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faArrowLeft,
  faEdit,
  faEye,
  faFileAlt,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setTyped } from "pdfmake/build/pdfmake";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { connect, useDispatch } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { fetchStructure } from "../../actions/structureActions";
import { FETCH_STRUCTURE_SUCCESS } from "../../actions/types";
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollpaseButton from "../../common/CollpaseButton";
import NewPersonnelInput from "../../common/NewPersonnelInput";
import PersonnelModalEdit from "../../common/PersonnelModalEdit";
import Tiptap from "../../common/Tiptap";
import { BUCKET_URL } from "../../config";
import useAddNewPersonnel from "../../hooks/useAddNewPersonnel";
import {
  fieldsConges,
  fieldsDecisionConges,
  getBadge,
} from "../../utils/dataTables";
import {
  textContractuelConges,
  textFonctionnaireConges,
  textFooterConges,
} from "../../utils/utility";
import DecisionCongeContractuels from "../printing/DecisionCongeContractuels.";
import DecisionCongeFonctionnaire from "../printing/DecisionCongeFonctionnaire";

function DecisionConges({ history, structure, isLoadingStructure, match }) {
  const idStructure = match.params.idStructure;

  const [modal, setModal] = useState(false);
  const [personnelDetail, setPersonnelDetail] = useState("");

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: true,
  });

  const [selectAll, setSelectAll] = useState(false);

  const [decisionTemplate, setDecisionTemplate] = useState(null);

  const [textHeader, setTextHeader] = useState("");

  const [textFooter, setTextFooter] = useState(textFooterConges);

  const dispatch = useDispatch();

  const { userField, onChangeInput, setUserField } = useAddNewPersonnel();

  const addNewPersonnel = (e) => {
    e.preventDefault();
    setPersonnelSelected([...personnelSelected, userField]);
    setUserField({
      matricule: "",
      nomsPrenoms: "",
      dateRecrutement: "",
      grade: "",
      fonction: "",
      lieudejouissance: "",
    });
  };

  const removePersonnel = (item) => {
    let data = personnelSelected.filter(
      (personnel) => personnel.matricule !== item.matricule
    );
    let matricules = personnelIndex.filter(
      (matricule) => matricule !== item.matricule
    );
    setPersonnelSelected(data);
    setPersonnelIndex(matricules);
  };

  const { isLoading, isError, data, refetch, isFetching } = useQuery(
    "detailsStructure",
    () => fetchStructure(idStructure),
    {
      onSuccess: (response) => {
        dispatch({ type: FETCH_STRUCTURE_SUCCESS, payload: response.data });
        setFilterPersonnels(response.data.allPersonnels);
        setPersonnels(response.data.allPersonnels);
      },

      onError: (error) => {
        console.log(error);
        // dispatch({ type: FETCH_STRUCTURE_SUCCESS, payload: response.data });
      },
      enabled: structure === null,
    }
  );

  useEffect(() => {}, [filterPersonnels]);

  const [filterPersonnels, setFilterPersonnels] = useState(
    structure?.allPersonnels
  );
  const [personnels, setPersonnels] = useState(structure?.allPersonnels);

  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
  });

  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
        });
        if (event.target.checked) {
          let men = personnels.filter((personnel) => personnel.sexe === "1");
          if (checked.fonctionnaireChecked) {
            men = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(men);
          }

          if (checked.contractuelChecked) {
            men = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(men);
          }
          setFilterPersonnels(men);
        } else {
          let data = personnels;
          if (checked.fonctionnaireChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(data);
          }

          if (checked.contractuelChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }
        break;

      case 2:
        setChecked({
          ...checked,
          manChecked: false,
          womanChecked: event.target.checked,
        });

        if (event.target.checked) {
          let women = personnels.filter((personnel) => personnel.sexe === "2");
          if (checked.fonctionnaireChecked) {
            women = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(women);
          }

          if (checked.contractuelChecked) {
            women = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(women);
          }
          setFilterPersonnels(women);
        } else {
          let data = personnels;
          if (checked.fonctionnaireChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(data);
          }

          if (checked.contractuelChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;
      case 3:
        setChecked({
          ...checked,
          contractuelChecked: false,
          fonctionnaireChecked: event.target.checked,
        });

        if (event.target.checked) {
          let fonctionnaires = personnels.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut === 1
          );
          setTextHeader(textFonctionnaireConges);
          if (checked.manChecked) {
            fonctionnaires = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(fonctionnaires);
          }

          if (checked.womanChecked) {
            fonctionnaires = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(fonctionnaires);
          }
          setFilterPersonnels(fonctionnaires);
        } else {
          let data = personnels;
          if (checked.manChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "1");
            setFilterPersonnels(data);
          }

          if (checked.womanChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "2");
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;
      case 4:
        setChecked({
          ...checked,
          fonctionnaireChecked: false,
          contractuelChecked: event.target.checked,
        });

        if (event.target.checked) {
          let contractuels = personnels.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
          );
          setTextHeader(textContractuelConges);
          if (checked.manChecked) {
            contractuels = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(contractuels);
          }

          if (checked.womanChecked) {
            contractuels = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(contractuels);
          }
          setFilterPersonnels(contractuels);
        } else {
          let data = personnels;
          if (checked.manChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "1");
            setFilterPersonnels(data);
          }

          if (checked.womanChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "2");
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;

      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
          fonctionnaireChecked: false,
          contractuelChecked: false,
        });
        break;
    }
  };

  const [personnelSelected, setPersonnelSelected] = useState([]);
  const [personnelIndex, setPersonnelIndex] = useState([]);

  const role = localStorage.getItem("roles");
  const [collapse, setCollapse] = useState(true);
  const [collapseInputNewUser, setCollapseInputNewUser] = useState(false);
  const [collapseFooter, toggleCollapseFooter] = useState(false);
  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const toggleCollapseAddNewUser = (e) => {
    setCollapseInputNewUser(!collapseInputNewUser);
    e.preventDefault();
  };

  // const selectAllPersonnel = () => {
  //   setSelectAll(!selectAll);
  //   let tabs = [...personnelIndex];
  //   let personnels = [...personnelSelected];

  //   filterPersonnels.map((personnel) => {
  //     if (!tabs.includes(personnel?.matricule)) {
  //       let personnelIndex = [...tabs, personnel?.matricule];
  //       let newPersonnel = {
  //         checked: true,
  //         nomsPrenoms: personnel?.nomsPrenoms,
  //         matricule: personnel?.matricule,
  //         grade: personnel?.grade?.abbreviation,
  //         fonction:
  //           personnel.postes !== null && personnel.postes.length >= 1
  //             ? `${personnel?.structure?.abbreviation}/${personnel?.postes[0].Abreviation}`
  //             : "CADRE",

  //         lieudejouissance: personnel?.arrondissement?.libelleArrondissement,
  //         dateRecrutement: personnel?.dateRecrutement,
  //       };

  //       personnels = [...personnelSelected, newPersonnel];
  //       setPersonnelSelected(personnels);
  //       setPersonnelIndex(personnelIndex);
  //     } else {
  //       let position = tabs.indexOf(personnel?.matricule);
  //       personnels.splice(position, 1);
  //       tabs.splice(position, 1);
  //       setPersonnelSelected(personnels);
  //       setPersonnelIndex(tabs); // listes des matricules
  //     }
  //   });
  // };

  const onSelectPersonnel = (personnel) => {
    const { matricule } = personnel;
    let tabs = [...personnelIndex];
    let personnels = [...personnelSelected];
    if (!tabs.includes(matricule)) {
      let personnelIndex = [...tabs, matricule];
      let newPersonnel = {
        checked: true,
        nomsPrenoms: personnel?.nomsPrenoms,
        matricule: personnel?.matricule,
        grade: personnel?.grade?.abbreviation,
        categorie: personnel?.grade?.categorieIdCategorie,
        echelon: personnel?.echelon,
        fonction:
          personnel.postes !== null && personnel.postes.length >= 1
            ? `${personnel?.structure?.abbreviation}/${personnel?.postes[0].Abreviation}`
            : personnel?.grade?.categorieIdCategorie <= 7
            ? "Agent"
            : "Cadre",

        lieudejouissance: personnel?.arrondissement?.libelleArrondissement,
        dateRecrutement: personnel?.dateRecrutement,
      };

      personnels = [...personnelSelected, newPersonnel];
      setPersonnelSelected(personnels);
      setPersonnelIndex(personnelIndex);
    } else {
      let position = tabs.indexOf(personnel.matricule);
      personnels.splice(position, 1);
      tabs.splice(position, 1);
      setPersonnelSelected(personnels);
      setPersonnelIndex(tabs); // listes des matricules
    }
  };

  const onChangeTempData = (event, item) => {
    const name = event.target.name;
    const value = event.target.value;

    const newState = personnelSelected.map((obj) => {
      if (obj.matricule === item.matricule) {
        return {
          ...obj,
          [name]: value,
        };
      }
      return obj;
    });

    setPersonnelSelected(newState);
  };

  return (
    <>
      <PersonnelModalEdit
        modal={modal}
        toggle={toggle}
        personnel={personnelDetail}
      />
      <CRow>
        <SlidingPane
          width="85%"
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={state.isPaneOpen}
          title="Personnels sectionnés pour la liste des congés"
          subtitle={structure?.first?.designationAdministrative}
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            setState({ isPaneOpen: false });
          }}
        >
          <CRow className="mb-2">
            <CCol className="d-flex justify-content-between">
              <CollpaseButton
                title="Ajouter un personnel a liste"
                collapse={collapseInputNewUser}
                toggleCollapse={toggleCollapseAddNewUser}
              />
              {/* FACTORISE L'IMPRESSION JUSTE LE BOUTTON */}
              {checked.fonctionnaireChecked && (
                <DecisionCongeFonctionnaire
                  textFooter={textFooter}
                  textHeader={textHeader}
                  disabled={checked.contractuelChecked}
                  personnels={personnelSelected}
                  structure={structure?.first.designationAdministrative}
                />
              )}
              {checked.contractuelChecked && (
                <DecisionCongeContractuels
                  textFooter={textFooter}
                  textHeader={textHeader}
                  disabled={checked.fonctionnaireChecked}
                  personnels={personnelSelected}
                  structure={structure?.first.designationAdministrative}
                />
              )}
            </CCol>
          </CRow>
          <br />
          <NewPersonnelInput
            fields={userField}
            collapse={collapseInputNewUser}
            onAddNewPersonnel={addNewPersonnel}
            onChangeInput={onChangeInput}
          />
          <hr />
          <CDataTable
            items={personnelSelected}
            fields={fieldsDecisionConges}
            itemsPerPage={50}
            pagination
            hover
            itemsPerPageSelect
            sorter
            tableFilter
            columnFilter
            clickableRows
            striped
            scopedSlots={{
              Numero: (item, index) => <td>{index}</td>,
              nomsPrenoms: (item, index) => (
                <td>
                  <CInput
                    name="nomsPrenoms"
                    value={item.nomsPrenoms}
                    onChange={(event) => onChangeTempData(event, item)}
                    placeholder={item.nomsPrenoms}
                  />
                </td>
              ),
              matricule: (item, index) => (
                <td>
                  <CInput
                    name="matricule"
                    value={item.matricule}
                    onChange={(event) => onChangeTempData(event, item)}
                    placeholder={item.matricule}
                  />
                </td>
              ),
              lieudejouissance: (item, index) => (
                <td>
                  <CInput
                    name="lieudejouissance"
                    value={item.lieudejouissance}
                    onChange={(event) => onChangeTempData(event, item)}
                    placeholder={item.lieudejouissance}
                  />
                </td>
              ),
              grade: (item) => (
                <td>
                  <CBadge color="success">{item?.grade}</CBadge>
                </td>
              ),
              categorie: (item) => (
                <td>
                  <CInput
                    name="categorie"
                    value={item.categorie}
                    onChange={(event) => onChangeTempData(event, item)}
                    placeholder={item.categorie}
                  />
                </td>
              ),
              echelon: (item) => (
                <td>
                  <CInput
                    name="echelon"
                    value={item.echelon}
                    onChange={(event) => onChangeTempData(event, item)}
                    placeholder={item.echelon}
                  />
                </td>
              ),
              fonction: (item) => (
                <td>
                  <CInput
                    name="fonction"
                    value={item.fonction}
                    onChange={(event) => onChangeTempData(event, item)}
                    placeholder={item.fonction}
                  />
                </td>
              ),
              dateRecrutement: (item) => (
                <td>
                  <CInput
                    type="date"
                    name="dateRecrutement"
                    value={item.dateRecrutement}
                    onChange={(event) => onChangeTempData(event, item)}
                    placeholder={item.dateRecrutement}
                  />
                </td>
              ),
              Voir: (item, index) => {
                return (
                  <td className=" d-flex align-items-center justify-content-between py-2">
                    <CTooltip content={"Supprimer le personnel"}>
                      <CButton
                        onClick={(_) => removePersonnel(item)}
                        color="info"
                        size="sm"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </CButton>
                    </CTooltip>
                    <CTooltip content="mettre a jour les informations du personnel (matricule, echelon)">
                      <CButton color="success" size="sm">
                        <FontAwesomeIcon icon={faSave} />
                      </CButton>
                    </CTooltip>
                  </td>
                );
              },
            }}
          />
        </SlidingPane>
      </CRow>
      <CRow>
        <CCol col="2" sm="6" md="2" className="mb-3">
          <CButton
            onClick={() => history.goBack()}
            block
            size="sm"
            color="dark"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Retour
          </CButton>
        </CCol>
        <CCol md="12">
          <div>
            <h3>Décision des congés</h3>
          </div>
        </CCol>

        <CCol xs="12" lg="12">
          {isLoadingStructure ? (
            <div className="spinner-border spinner-boder-xl" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-between">
                  <h4>
                    {structure
                      ? `${structure?.first?.abbreviation} : ${structure?.first?.designationAdministrative}`
                      : ""}{" "}
                  </h4>

                  <div className="d-flex justify-content-between">
                    <CTooltip content="Afficher le pied de la décision">
                      <CButton
                        size="sm"
                        className="mr-1"
                        disabled={collapseFooter}
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
                        l'entete de page
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Afficher l'entete de la decision">
                      <CButton
                        size="sm"
                        disabled={collapse}
                        onClick={() => toggleCollapseFooter(!collapseFooter)}
                        color="dark"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon
                          className="mr-2"
                          icon={
                            collapseFooter
                              ? faArrowAltCircleUp
                              : faArrowAltCircleDown
                          }
                        />
                        le pied de page
                      </CButton>
                    </CTooltip>
                  </div>
                </div>

                <hr />
                <CRow>
                  <CCol className="d-flex justify-content-between align-items-center">
                    <div className="p-3">
                      <CheckSexeAndStatut
                        name="decision"
                        onCheckedSexe={onCheckedSexe}
                        checked={checked}
                      />

                      {/* <CFormGroup variant="custom-checkbox" inline>
                        <CInputCheckbox
                          onChange={selectAllPersonnel}
                          custom
                          id="selectAll"
                          checked={selectAll}
                          name="selectAll"
                        />
                        <CLabel variant="custom-checkbox" htmlFor="selectAll">
                          Tout Selectionné
                        </CLabel>
                      </CFormGroup> */}
                    </div>

                    {!isLoadingStructure && (
                      <div className="d-flex justify-content-between">
                        <DecisionCongeFonctionnaire
                          textFooter={textFooter}
                          textHeader={textHeader}
                          disabled={checked.contractuelChecked}
                          personnels={personnelSelected}
                          structure={structure?.first.designationAdministrative}
                        />
                        <DecisionCongeContractuels
                          textFooter={textFooter}
                          textHeader={textHeader}
                          disabled={checked.fonctionnaireChecked}
                          personnels={personnelSelected}
                          structure={structure?.first.designationAdministrative}
                        />
                      </div>
                    )}
                  </CCol>
                </CRow>
                <hr />
                <CRow className="mb-3 mt-3">
                  <CCol
                    xs="12"
                    md="12"
                    className="d-flex justify-content-between"
                  >
                    <h4>
                      Total: {filterPersonnels?.length}{" "}
                      {checked.contractuelChecked
                        ? "Contractuels"
                        : checked.fonctionnaireChecked
                        ? "Fonctionnaires"
                        : ""}{" "}
                    </h4>
                    <div className="d-flex justify-content-between align-items-center">
                      <CTooltip content="Afficher les personnels Selectionnés">
                        <CButton onClick={() => setState({ isPaneOpen: true })}>
                          <FontAwesomeIcon
                            color=""
                            cursor="pointer"
                            icon={faEye}
                            size="lg"
                          />
                          Personnels selectionnés: {personnelSelected?.length}
                        </CButton>
                      </CTooltip>
                    </div>
                  </CCol>
                </CRow>
                <hr />

                <CRow>
                  <CCol>
                    <div>
                      <CCollapse show={collapse}>
                        {checked.fonctionnaireChecked && (
                          <Tiptap
                            template={textFonctionnaireConges}
                            onChange={setTextHeader}
                          />
                        )}
                        {checked.contractuelChecked && (
                          <Tiptap
                            template={textContractuelConges}
                            onChange={setTextHeader}
                          />
                        )}
                      </CCollapse>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <div>
                      <CCollapse show={collapseFooter}>
                        <Tiptap
                          template={textFooter}
                          onChange={setTextFooter}
                        />
                      </CCollapse>
                    </div>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={filterPersonnels}
                  fields={fieldsConges}
                  itemsPerPage={10}
                  pagination
                  hover
                  itemsPerPageSelect
                  sorter
                  tableFilter
                  columnFilter
                  clickableRows
                  striped
                  scopedSlots={{
                    check: (item, index) => (
                      <td className="text-center">
                        <CInputCheckbox
                          className="check-retraite"
                          id={item.matricule}
                          name="retraite"
                          value={item.matricule}
                          checked={
                            personnelIndex.includes(item.matricule)
                              ? true
                              : false
                          }
                          onChange={(_) => onSelectPersonnel(item)}
                        />
                      </td>
                    ),
                    Numero: (item, index) => <td>{index}</td>,
                    picture: (item, index) => (
                      <td
                        className="c-avatar d-flex justify-content-center
                      align-items-center
                      "
                      >
                        <CImg
                          src={
                            item?.photo
                              ? `${BUCKET_URL}/personnels/${item.personnelIdArchive}/${item.photo}`
                              : `${BUCKET_URL}/default/user.png`
                          }
                          alt="photo de profil"
                          className="c-avatar-img"
                        />
                      </td>
                    ),
                    lieu: (item, index) => (
                      <td>{item?.arrondissement?.libelleArrondissement}</td>
                    ),
                    grade: (item) => (
                      <td>
                        <CBadge color="success">
                          {item?.grade?.abbreviation}
                        </CBadge>
                      </td>
                    ),
                    corps: (item) => (
                      <td>
                        <CBadge
                          color={getBadge(
                            item?.grade?.statutAdministratifIdStatut
                          )}
                        >
                          {item?.grade?.statutAdministratif?.libelleStatut}
                        </CBadge>
                      </td>
                    ),
                    position: (item) => (
                      <td>
                        {
                          <CBadge color="warning">
                            {item?.position?.libelle}
                          </CBadge>
                        }
                      </td>
                    ),

                    categorie: (item, index) => (
                      <td key={index}>{item?.grade?.categorieIdCategorie}</td>
                    ),

                    poste: (item, index) => {
                      return (
                        <td key={index}>{item?.postes[0]?.libellePoste}</td>
                      );
                    },
                    Voir: (item, index) => {
                      return (
                        <td className="py-2">
                          <div className="d-flex align-items-center justify-content-between">
                            <CTooltip content={" Voir le profil du personnel"}>
                              <CButton
                                to={`/personnels/${item.matricule}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon={faEye} />
                              </CButton>
                            </CTooltip>
                          </div>
                          <div className="py-2">
                            <CTooltip content={"Modifier les informations"}>
                              <CButton
                                onClick={(_) => onHandleModal(item)}
                                color="danger"
                                size="sm"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </CButton>
                            </CTooltip>
                          </div>
                        </td>
                      );
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
}

const mapStateToProps = ({ structureState }) => ({
  isLoadingStructure: structureState.isLoadingStructure,
  structure: structureState.structure,
});

export default connect(mapStateToProps)(DecisionConges);
