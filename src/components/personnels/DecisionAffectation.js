import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CInput,
  CRow,
  CTextarea,
  CTooltip,
} from "@coreui/react";
import {
  faBars,
  faCheckDouble,
  faHome,
  faTrashAlt,
  faUndo,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import CollapseFieldAffectation from "../../common/CollapseFieldAffectation";
import ListSelectedPersonnelModal2 from "../../common/ListSelectedPersonnelModal2";
import ListStructureModal from "../../common/ListStructureModal";
import {
  fieldDecisionDaffection,
  fieldsRapidExport,
  getBadge,
} from "../../utils/dataTables";
import {
  calculateAge,
  certifcatPlaceHolder,
  renameKey,
} from "../../utils/functions";

const DecisionAffectation = (props) => {
  const { profile, structures } = props;
  const [modalPersonnel, setModalPersonnel] = useState(false);
  const [tableList, setTableList] = useState([{ corps: "" }]);
  const [modalStructure, setModalStructure] = useState(false);
  const [corpsListTitle, setCorpsListTitle] = useState([]);
  const [deleteModal, setdeleteModal] = useState(false);
  const [docHeaderText, setdocHeaderText] = useState("");

  const [docTitle, setDoctitle] = useState("");

  const [structureData, setstructureData] = useState({
    idStructure: 5000,
    designationAdministrative: "Selectionner la structure",
  });

  // array of data to move and current index state
  const [dataList, setDataList] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentCorpsIndex, setCurrentCorpsIndex] = useState(null);

  const [tableDataIndex, setTableDataIndex] = useState({});

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
  const deletePersonnnel = (item, indexItem, indexCorps) => {
    let list = { ...personnels };

    let tabs = { ...tableDataIndex };

    let keyName = Object.keys(tabs)[indexCorps];

    list[keyName]?.personnels.splice(indexItem, 1);
    tabs[keyName].splice(indexItem, 1);

    setPersonnels(list);
    setTableDataIndex(tabs);
  };

  const onSetCorpsTitle = (index) => {
    setCurrentIndex(null);
    setCurrentCorpsIndex(null);
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

  const toggle2 = () => {
    setModalStructure(!modalStructure);
  };

  const toggle3 = (indexItem, indexCorps) => {
    setModalStructure(!modalStructure);
    setCurrentCorpsIndex(indexCorps);
    setCurrentIndex(indexItem);
  };

  const setNewStructure = (structure) => {
    if (currentIndex !== null && currentCorpsIndex !== null) {
      let list = { ...personnels };
      let tabs = { ...tableDataIndex };
      let keyName = Object.keys(tabs)[currentCorpsIndex];

      // list[keyName]?.personnels[currentIndex]["NouveauPosteAffectation"] = structure?.designationAdministrative;
      // tabs[keyName].splice(indexItem, 1);
    } else {
      setstructureData(structure);
      setcorpsTitle(structure?.designationAdministrative);
      setCurrentIndex(0);
      setCurrentCorpsIndex(0);
    }
  };

  return (
    <>
      <ListSelectedPersonnelModal2
        setNewPersonnel={setNewData}
        modal={modalPersonnel}
        toggle={toggleModalPersonnel}
      />
      <ListStructureModal
        structures={structures?.data}
        modal={modalStructure}
        toggle={toggle2}
        setNewStructure={setNewStructure}
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
                  <h4>Décision d'affectation du Personnel</h4>

                  {/* <ExportDecisionAffectationPDF
                    personnels={personnels}
                    title={docTitle}
                    docHeaderText={docHeaderText}
                  /> */}
                </div>
                <CollapseFieldAffectation
                  collapse="true"
                  personnels={personnels}
                />

                <hr />
                <CRow>
                  <CCol md="6">
                    <CInput
                      size="md"
                      className="mb-2"
                      value={docTitle}
                      type="text"
                      id="doctitle"
                      placeholder="Entrez le titre du document"
                    />
                  </CCol>
                  <CCol md="6">
                    <CTextarea
                      onChange={(value) => setdocHeaderText(value.target.value)}
                      value={docHeaderText}
                      rows={10}
                      placeholder={certifcatPlaceHolder}
                    />
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
                            className="m-1"
                            id="structureAffectation"
                            placeholder="Selectionner la structure"
                            onChange={(e) => handleCorpsInputChange(e)}
                            value={structureData.designationAdministrative}
                          />
                          <CButton
                            className="m-1"
                            onClick={toggle2}
                            size="md"
                            color="danger"
                          >
                            <FontAwesomeIcon icon={faBars} size="sm" />
                          </CButton>

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
                        fields={fieldDecisionDaffection}
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

                          grade: (item) => (
                            <td>
                              <CBadge color="success">
                                {item.grade.libelleGrade}
                              </CBadge>
                            </td>
                          ),

                          motif: (item, index) => {
                            return (
                              <td key={index}>
                                <CInput
                                  size="md"
                                  className="mb-2"
                                  placeholder="Entrez le motif"
                                />
                              </td>
                            );
                          },

                          NouveauPosteAffectation: (item, index) => (
                            <div>
                              <td>{item?.NouveauPosteAffectation}</td>
                              <CTooltip content="selectionner le nouveau poste d'affectation">
                                <CButton
                                  color="danger"
                                  className="text-center ml-2"
                                  size="sm"
                                  onClick={() => toggle3(index, i)}
                                >
                                  <FontAwesomeIcon
                                    className="text-center"
                                    size="lg"
                                    icon={faHome}
                                  />
                                </CButton>
                              </CTooltip>
                            </div>
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

const mapStateToProps = ({ personnelState, userState, structureState }) => ({
  isLoading: personnelState.isLoading,
  actifs: personnelState.personnelActifs,
  profile: userState.profile,
  structures: structureState.structures,
});

export default connect(mapStateToProps, {})(DecisionAffectation);
