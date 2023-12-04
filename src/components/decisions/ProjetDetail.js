import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CInput,
  CRow,
  CTextarea,
  CTooltip,
} from "@coreui/react";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faCheckDouble,
  faTrashAlt,
  faUndo,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ExportCertificatPDF from "../../common/ExportCertificatPDF";
import ExportDecisionAffectation from "../../common/ExportDecisionAffectation";
import ListSelectedPersonnelModal2 from "../../common/ListSelectedPersonnelModal2";
import Tiptap from "../../common/Tiptap";
import { fieldsRapidExport, getBadge } from "../../utils/dataTables";
import { calculateAge, renameKey } from "../../utils/functions";

const ProjetDetail = (props) => {
  const { profile } = props;
  const [modalPersonnel, setModalPersonnel] = useState(false);
  const [tableList, setTableList] = useState([{ corps: "" }]);
  const [corpsListTitle, setCorpsListTitle] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [certificatTemplate, setCertificatTemplate] = useState(`
  \u200B\t \u200B\t Le personnel dont le nom suit, déclaré définitivement admis au concours direct
  des 03 et 04 octobre 2020 pour le recrutement des personnels dans le corps des
  fonctionnaires du Génie Rural et mis à disposition du Ministère de
  l'Agriculture et Développement Rural par Décision N°:
  00401/MINFOPRA/SG/DDRHE/SDC/SCDB du 05 Mars 2021 du Ministère de la Fonction
  Publique et de la Réforme Administrative, a effectivement pris service le 02
  juin 2021
.`);

  const [textFooter, setTextFooter] = useState(`
<p>
\u200B\t \u200B\t \u200B\tEn foi de quoi la présente de prise de Service est établie
 pour servir et valoir ce que de droit. /-
</p>`);

  const [docTitle, setDoctitle] = useState("");

  // array of data to move and current index state
  const [dataList, setDataList] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tableDataIndex, setTableDataIndex] = useState({});

  const [collapse, setCollapse] = useState(true);
  const [collapseFooter, toggleCollapseFooter] = useState(false);
  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const [personnels, setPersonnels] = useState({});
  const [corpsTitle, setcorpsTitle] = useState("");

  // toggle modal functions
  const toggleModalPersonnel = () => {
    setModalPersonnel(!modalPersonnel);
  };

  const selectListPersonnelCorps = (corpsTitle) => {
    setcorpsTitle(corpsTitle);
    setModalPersonnel(!modalPersonnel);
  };

  const toggleModalDelete = (item, index) => {
    setdeleteModal(!deleteModal);
  };

  const handleCorpsInputChange = (e, index) => {
    const { name, value, checked } = e.target;
    setcorpsTitle(value);
  };

  const onDeleteCorps = (index) => {
    const list = [...corpsListTitle];
    list.splice(index, 1);
    setCorpsListTitle(list);
  };

  const corpsWithBadge = (data, index) => {
    return (
      <CCol className="d-flex m-2" key={index} md="4">
        <CBadge
          size="md"
          key={index}
          style={{ fontSize: 16 }}
          className="text-center p-1"
          color="info"
        >
          {data[index]}: {personnels[data[index]]?.personnels.length}
        </CBadge>
      </CCol>
    );
  };

  const setNewData = (data) => {
    setTableDataIndex({
      ...tableDataIndex,
      [corpsTitle]: data.tableIndex,
    });

    setPersonnels({
      ...personnels,
      [corpsTitle]: {
        personnels: data.dataList,
      },
    });
  };

  // OPTIMISER ICI
  const handleAddClick = () => {
    setTableList([
      ...tableList,
      {
        corps: "",
      },
    ]);
  };

  // supprimer un personnel de la liste
  const deletePersonnnel = (item, indexItem, indexCorprs) => {
    let list = { ...personnels };

    let tabs = { ...tableDataIndex };

    let keyName = Object.keys(tabs)[indexCorprs];

    list[keyName]?.personnels.splice(indexItem, 1);
    tabs[keyName].splice(indexItem, 1);

    setPersonnels(list);
    setTableDataIndex(tabs);
  };

  const onSetCorpsTitle = (index) => {
    let lastkey = corpsListTitle[index];

    let gradeWithPersonnels = {
      [corpsTitle]: {
        personnels: [],
      },
    };

    if (corpsListTitle.length === 0) {
      setCorpsListTitle([...corpsListTitle, corpsTitle]);
      setPersonnels({ ...personnels, ...gradeWithPersonnels });
    } else if (corpsListTitle.includes(lastkey)) {
      corpsListTitle[index] = corpsTitle;
      setCorpsListTitle(corpsListTitle);
      let newPersonnels = renameKey(personnels, lastkey, corpsTitle);
      setPersonnels(newPersonnels);
    } else {
      setCorpsListTitle([...corpsListTitle, corpsTitle]);
      setPersonnels({ ...personnels, ...gradeWithPersonnels });
    }
  };

  // faire un callback
  const handleRemoveClick = (index) => {
    let data = { ...personnels };
    let tabs = { ...tableDataIndex };

    let keyName = Object.keys(tabs)[index];
    delete data[keyName];
    delete tabs[keyName];
    setPersonnels(data);
    setTableDataIndex(tabs);
    const list = [...tableList];
    list.splice(index, 1);
    setTableList(list);
    onDeleteCorps(index);
  };

  return (
    <>
      <ListSelectedPersonnelModal2
        setNewPersonnel={setNewData}
        modal={modalPersonnel}
        toggle={toggleModalPersonnel}
      />

      <CRow>
        <CCol xs="12" lg="12">
          {false ? (
            <div className="spinner-border spinner-border-xl" role="stastus">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-between">
                  <div>
                    <h4>Projet d'affectation des personnels</h4>
                    <h6>Nom Auteur: Avezo'o</h6>
                  </div>

                  <div className="d-flex justify-content-between">
                    <CTooltip content="Afficher le pied du certificat">
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
                    <CTooltip content="Afficher l'entete du certificat">
                      <CButton
                        className="mr-2"
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
                    <ExportDecisionAffectation
                      textFooter={textFooter}
                      personnels={personnels}
                      title={docTitle}
                      docHeaderText={certificatTemplate}
                    />
                  </div>
                </div>

                <hr />
                <CRow>
                  <CCol md="12">
                    <CInput
                      size="md"
                      className="mb-2"
                      value={docTitle}
                      onChange={(value) => setDoctitle(value.target.value)}
                      type="text"
                      id="doctitle"
                      placeholder="Entrez le titre du document"
                    />
                  </CCol>
                  <CCol md="12">
                    <CCollapse show={collapse}>
                      <Tiptap
                        template={certificatTemplate}
                        onChange={setCertificatTemplate}
                      />
                    </CCollapse>
                  </CCol>
                  <CCol md="12">
                    <CCollapse show={collapseFooter}>
                      <Tiptap template={textFooter} onChange={setTextFooter} />
                    </CCollapse>
                  </CCol>
                </CRow>
              </CCardHeader>

              {tableList.map((x, i) => {
                return (
                  <>
                    <CCardBody key={i}>
                      <CRow>
                        {Object.entries(personnels).length !== 0 &&
                          corpsWithBadge(corpsListTitle, i)}
                      </CRow>
                      <CRow>
                        <CCol className="d-flex" md="6">
                          <CInput
                            className="mb-2"
                            width="200"
                            type="text"
                            id="corps"
                            placeholder="Entrez le grade des personnels"
                            onChange={(e) => handleCorpsInputChange(e)}
                          />
                          <CButton
                            onClick={() => onSetCorpsTitle(i)}
                            className="m-1"
                            color="info"
                          >
                            <FontAwesomeIcon icon={faCheckDouble} />
                          </CButton>
                        </CCol>
                        <div className>
                          <CButton
                            className="m-1"
                            onClick={() =>
                              selectListPersonnelCorps(corpsListTitle[i])
                            }
                            color="primary"
                            disabled={corpsListTitle.length < i + 1}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faUserPlus}
                            />
                            Selectionner les personnels
                          </CButton>
                        </div>
                      </CRow>

                      <CDataTable
                        items={personnels[corpsListTitle[i]]?.personnels}
                        fields={fieldsRapidExport}
                        itemsPerPage={20}
                        pagination
                        hover
                        sorter
                        tableFilter
                        columnFilter
                        itemsPerPageSelect
                        striped
                        bordered
                        scopedSlots={{
                          Numero: (item, index) => <td>{index}</td>,
                          corps: (item) => (
                            <td>
                              <CBadge
                                color={getBadge(
                                  item.grade.statutAdministratifIdStatut
                                )}
                              >
                                {item.grade.statutAdministratif.libelleStatut}
                              </CBadge>
                            </td>
                          ),

                          grade: (item) => (
                            <td>
                              <CBadge color="success">
                                {item.grade.libelleGrade}
                              </CBadge>
                            </td>
                          ),

                          age: (item) => {
                            return (
                              <td>
                                <CBadge color="primary">
                                  {item.dateNaissance === null
                                    ? ""
                                    : calculateAge(item.dateNaissance)}
                                </CBadge>
                              </td>
                            );
                          },
                          position: (item, index) => {
                            return (
                              <td key={index}>
                                {
                                  <CBadge
                                    color={getBadge(item.position.idPosition)}
                                  >
                                    {item.position.libelle}
                                  </CBadge>
                                }
                              </td>
                            );
                          },

                          categorie: (item) => (
                            <td>{item.categorieIdCategorie}</td>
                          ),
                          Voir: (item, index) => {
                            return (
                              <td className="py-2">
                                <CTooltip content="Rétirer le personnel de la liste?">
                                  <CButton
                                    onClick={() =>
                                      deletePersonnnel(item, index, i)
                                    }
                                    color="danger"
                                    className="text-center ml-2"
                                    size="sm"
                                  >
                                    <FontAwesomeIcon
                                      size="lg"
                                      icon={faTrashAlt}
                                    />
                                  </CButton>
                                </CTooltip>
                              </td>
                            );
                          },
                        }}
                      />
                    </CCardBody>
                    <CCardFooter className="d-flex justify-content-between">
                      {tableList.length !== 1 && (
                        <CButton
                          size="md"
                          color="danger"
                          onClick={() => handleRemoveClick(i)}
                        >
                          <FontAwesomeIcon className="mr-2" icon={faUndo} />
                          Supprimer et Recommencer la selection
                        </CButton>
                      )}

                      <div>
                        {tableList.length - 1 === i && (
                          <CButton
                            className="mx-1"
                            onClick={handleAddClick}
                            color="info"
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faUserPlus}
                            />
                            Ajouter du personnels
                          </CButton>
                        )}
                      </div>
                      <CBadge size="md" color="warning">
                        <h6>
                          Total:{" "}
                          {personnels[corpsListTitle[i]]?.personnels.length}
                        </h6>
                      </CBadge>
                    </CCardFooter>
                  </>
                );
              })}
            </CCard>
          )}
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ personnelState, userState }) => ({
  isLoading: personnelState.isLoading,
  actifs: personnelState.personnelActifs,
  profile: userState.profile,
});

export default connect(mapStateToProps, {})(ProjetDetail);
