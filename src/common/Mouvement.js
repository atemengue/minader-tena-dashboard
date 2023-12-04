import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faArrowRight,
  faFileAlt,
  faHome,
  faSave,
  faTrashAlt,
  faUndo,
  faUserPlus,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ActeModal from "./ActeModal";
import ListPersonnelModal from "./ListPersonnelModal";
import ListSelectedPersonnelModal from "./ListSelectedPersonnelModal";
import ListSelectedPosteModal from "./ListSelectedPosteModal";
import ListStructureModal from "./ListStructureModal";

const Mouvement = ({
  fiedType,
  affectation,
  structure,
  update,
  isLoading,
  structures,
  affectationByStructure,
  error,
  actes,
}) => {
  // modals states
  const [modalPersonnel, setModalPersonnel] = useState(false);
  const [modalPoste, setModalPoste] = useState(false);
  const [modalActe, setActeModal] = useState(false);
  const [modalStructure, setModalStructure] = useState(false);
  const [modalListPersonnel, setModalListPersonnel] = useState(false);

  // array of data to move and current index state
  const [dataList, setDataList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // decision state
  const [decision, setDecision] = useState(null);

  // Table of index of elements: use for delete item
  const [tableDataIndex, setTableDataIndex] = useState([]);

  // toggle modal functions
  const toggleModalPersonnel = () => {
    setModalPersonnel(!modalPersonnel);
  };

  const toggleModalPoste = () => {
    setModalPoste(!modalPoste);
  };

  const toggleModalOnePerson = (index) => {
    setModalListPersonnel(!modalListPersonnel);
    setCurrentIndex(index);
  };

  const toggleModaStructure = (index) => {
    setModalStructure(!modalStructure);
    setCurrentIndex(index);
  };

  const toggleModalActe = () => {
    setActeModal(!modalActe);
  };

  // set new Data state personnels, or postes
  const setNewData = (data) => {
    let { dataList, tableIndex } = data;
    let newData = dataList;

    if (affectationByStructure) {
      newData = dataList.map((perso) => {
        return { ...perso, idNewStructure: structure.idStructure };
      });
    }

    setTableDataIndex(tableIndex);
    setDataList(newData);
  };

  const clearInput = () => {
    setCurrentIndex([]);
    setDataList([]);
    setDecision(null);
  };

  const setNewStructure = (data) => {
    let list = [...dataList];
    list[currentIndex]["structure"] = data.designationAdministrative;
    list[currentIndex]["idNewStructure"] = data.idStructure;
    setDataList(list);
  };

  // selection l'acte du mouvement
  const setNewActe = (data) => {
    setDecision(data);
  };

  // selectioner le mouvement occupant du poste
  const setNewBoss = (data) => {
    let list = [...dataList];
    list[currentIndex]["nouveau"] = data.nomsPrenoms;
    list[currentIndex]["matricule"] = data.matricule;
  };

  const renderStructureSlot = (item, index) => {
    if (structures) {
      return <td>{item?.structure}</td>;
    } else {
      return <td key={index}>{structure?.designationAdministrative}</td>;
    }
  };

  // supprimer la ligne du mouvement
  const deletePersonnnel = (item) => {
    let list = [...dataList];

    let tabs = [...tableDataIndex];

    let position_item = tabs.indexOf(item.matricule);
    let position =
      position_item === -1 ? tabs.indexOf(item.idPoste) : position_item;

    list.splice(position, 1);
    tabs.splice(position, 1);
    setTableDataIndex(tabs);
    setDataList(list);
  };

  // mettre a jour les affectations
  const updatePersonnel = () => {
    if (dataList.length === 0) {
      toast.error("Veuillez selectionner le personnel");
    } else {
      update(dataList, decision).then(() => {
        if (error) {
          toast.error("Erreur sur le serveur");
        } else {
          toast.success("Affectation validée");
          clearInput();
          setDataList([]);
        }
      });
    }
  };
  return (
    <>
      <ListSelectedPersonnelModal
        setNewPersonnel={setNewData}
        modal={modalPersonnel}
        toggle={toggleModalPersonnel}
      />

      <ListSelectedPosteModal
        setNewPoste={setNewData}
        modal={modalPoste}
        toggle={toggleModalPoste}
      />

      <ActeModal
        setNewActe={setNewActe}
        modal={modalActe}
        toggle={toggleModalActe}
        actes={actes}
      />

      <ListPersonnelModal
        modal={modalListPersonnel}
        toggle={toggleModalOnePerson}
        setNewData={setNewBoss}
      />

      <ListStructureModal
        structures={structures?.data}
        modal={modalStructure}
        toggle={toggleModaStructure}
        setNewStructure={setNewStructure}
      />

      <CRow>
        <CCol md="12">
          <CAlert color="dark">
            <CRow>
              <CCol md="6" className="text-center">
                <CButton
                  onClick={
                    affectation ? toggleModalPersonnel : toggleModalPoste
                  }
                  color="primary"
                >
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={affectation ? faUserPlus : faUserTie}
                  />
                  {affectation
                    ? "Selectionner le personnel"
                    : "Selectionner les postes"}
                </CButton>
              </CCol>
              <CCol md="6" className="text-center">
                <CButton
                  onClick={toggleModalActe}
                  shape="round"
                  color="warning"
                >
                  <FontAwesomeIcon className="mr-2" icon={faFileAlt} />
                  {affectation
                    ? "Selectionner la decision"
                    : "Selectionner l'acte"}
                </CButton>
              </CCol>
            </CRow>
          </CAlert>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader className="d-flex align-items-center">
              <h6>
                Par
                {affectation ? " Decision : " : " Acte :"}
                {decision &&
                  decision.numeroActe + " du " + decision.dateSignature}
              </h6>
              {decision && (
                <CTooltip content="Supprimer la decision ?">
                  <CButton
                    onClick={() => setDecision(null)}
                    className="text-center ml-2"
                    size="md"
                    color="danger"
                  >
                    <FontAwesomeIcon className="mr-2" icon={faTrashAlt} />
                  </CButton>
                </CTooltip>
              )}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={dataList}
                fields={fiedType}
                itemsPerPage={10}
                itemsPerPageSelect
                pagination
                hover
                sorter
                header
                tableFilter
                columnFilter
                clickableRows
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td key={index}>{index}</td>,
                  occupant: (item, index) => {
                    return item.occupant ? (
                      <td key={index}>{item.occupant}</td>
                    ) : (
                      <td key={index}>
                        {<CBadge color="danger">Poste vacant</CBadge>}
                      </td>
                    );
                  },

                  envoye: (_) => (
                    <td className="text-center">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </td>
                  ),
                  remplace: (_) => (
                    <td className="text-center">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </td>
                  ),
                  structure: (item, index) => renderStructureSlot(item, index),

                  selectionner: (item, index) => (
                    <td className="py-2">
                      <div className="d-flex justify-content-between">
                        <CTooltip
                          content={
                            affectation
                              ? " selectionner la structure d'affectation"
                              : " selectionner le nouvel occupant du poste"
                          }
                        >
                          <CButton
                            disabled={affectationByStructure}
                            onClick={
                              affectation
                                ? () => toggleModaStructure(index)
                                : () => toggleModalOnePerson(index)
                            }
                            color="primary"
                            size="sm"
                            className="text-center ml-2"
                          >
                            <FontAwesomeIcon
                              className="text-center"
                              size="lg"
                              icon={affectation ? faHome : faUserTie}
                            />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Voulez vous supprimer le personnel ?">
                          <CButton
                            onClick={() => deletePersonnnel(item)}
                            color="danger"
                            className="text-center ml-2"
                            size="sm"
                          >
                            <FontAwesomeIcon size="lg" icon={faTrashAlt} />
                          </CButton>
                        </CTooltip>
                      </div>
                    </td>
                  ),
                }}
              />
            </CCardBody>

            <CCardFooter className="d-flex justify-content-between">
              <CButton size="md" color="danger" onClick={() => clearInput()}>
                <FontAwesomeIcon className="mr-2" icon={faUndo} />
                Annuler les mouvements
              </CButton>
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <CButton
                  disabled={
                    (structure || structures) && decision && dataList.length > 0
                      ? false
                      : true
                  }
                  onClick={updatePersonnel}
                  size="md"
                  color="success"
                >
                  <FontAwesomeIcon className="mr-2" icon={faSave} />
                  Valider les mouvements
                </CButton>
              )}
              <CBadge size="md" color="warning">
                <h6>Total: {dataList.length}</h6>
              </CBadge>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Mouvement;
