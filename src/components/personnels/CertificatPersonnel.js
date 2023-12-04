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
import { faSave, faUserCircle } from "@fortawesome/free-regular-svg-icons";
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
import ListSelectedPersonnelModal2 from "../../common/ListSelectedPersonnelModal2";
import Tiptap from "../../common/Tiptap";
import { fieldsRapidExport, getBadge } from "../../utils/dataTables";
import { calculateAge, renameKey } from "../../utils/functions";
import {
  textFooterCertificatCollectif,
  textHeaderCertificatCollectif,
} from "../../utils/utility";

const CertificatPersonnel = (props) => {
  const { profile } = props;
  const [modalPersonnel, setModalPersonnel] = useState(false);
  const [tableList, setTableList] = useState([{ corps: "" }]);
  const [corpsListTitle, setCorpsListTitle] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [certificatTemplate, setCertificatTemplate] = useState(
    textHeaderCertificatCollectif
  );
  const [textFooter, setTextFooter] = useState(textFooterCertificatCollectif);
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

  const setNewData = ({ dataList, tableIndex }) => {
    setTableDataIndex({
      ...tableDataIndex,
      [corpsTitle]: tableIndex,
    });

    let lastData = personnels[corpsTitle].personnels;

    setPersonnels({
      ...personnels,
      [corpsTitle]: {
        personnels: [...lastData, ...dataList],
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

  // handle Change Input
  const onChangeTempData = (event, corps, item) => {
    const name = event.target.name;
    const value = event.target.value;
    const newState = personnels[corps].personnels.map((obj) => {
      if (obj.matricule === item.matricule) {
        return {
          ...obj,
          [name]: value,
        };
      }
      return obj;
    });
    setPersonnels({
      ...personnels,
      [corps]: {
        personnels: newState,
      },
    });
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
                  <h4>
                    Certificat Collectif de Prise de Service
                    <CTooltip content="Enregistré le document">
                      <FontAwesomeIcon className="ml-2" icon={faSave} />
                    </CTooltip>
                  </h4>

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
                    <ExportCertificatPDF
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
                  <div key={i}>
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
                        <div>
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
                            Selectionner ou Ajouter le personnels
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
                          nomsPrenoms: (item, index) => (
                            <td>
                              <CInput
                                name="nomsPrenoms"
                                value={item.nomsPrenoms}
                                onChange={(event) =>
                                  onChangeTempData(
                                    event,
                                    corpsListTitle[i],
                                    item
                                  )
                                }
                                placeholder={item.nomsPrenoms}
                              />
                            </td>
                          ),
                          matricule: (item, index) => (
                            <td>
                              <CInput
                                name="matricule"
                                value={item.matricule}
                                onChange={(event) =>
                                  onChangeTempData(
                                    event,
                                    corpsListTitle[i],
                                    item
                                  )
                                }
                                placeholder={item.matricule}
                              />
                            </td>
                          ),
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
                          <div>
                            <CButton
                              className="mx-1"
                              onClick={handleAddClick}
                              color="info"
                            >
                              <FontAwesomeIcon
                                className="mr-2"
                                icon={faUserPlus}
                              />
                              Ajouter un corps et du Personnels
                            </CButton>
                          </div>
                        )}
                      </div>
                      <CBadge size="md" color="warning">
                        <h6>
                          Total:{" "}
                          {personnels[corpsListTitle[i]]?.personnels.length}
                        </h6>
                      </CBadge>
                    </CCardFooter>
                  </div>
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

export default connect(mapStateToProps, {})(CertificatPersonnel);
