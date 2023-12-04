import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import {
  faArrowRight,
  faSave,
  faTrashAlt,
  faUndo,
  faUserPlus,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { updatePersonnelPosition } from "../actions/personnelActions";
import ListPositionModal from "./ListPositionModal";
import ListSelectedPersonnelModal from "./ListSelectedPersonnelModal";

const PositionEditGrille = ({ positions, fiedType, isLoading }) => {
  // modals states
  const [modalListPersonnel, setModalListPersonnel] = useState(false);
  const [modalPosition, setModalPosition] = useState(false);
  const [modalPersonnel, setModalPersonnel] = useState(false);
  const [loader, setloader] = useState(false);

  // array of data to move and current index state
  const [dataList, setDataList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Table of index of elements: use for delete item
  const [tableDataIndex, setTableDataIndex] = useState([]);

  // update mutation

  const updateMutation = useMutation(
    (personnels) => updatePersonnelPosition(personnels),
    {
      onSuccess: (response) => {
        setloader(false);
        toast.success(response.data.message);
        setTimeout(() => {
          updateMutation.reset();
          clearInput();
        }, 2000);
      },
      onError: (error) => {
        setloader(false);
        toast.error(error.response.data.message);
      },
    }
  );

  // toggle modal functions
  const toggleModalPersonnel = () => {
    setModalPersonnel(!modalPersonnel);
  };

  const toggleModaPosition = (index) => {
    setModalPosition(!modalPosition);
    setCurrentIndex(index);
  };

  // set new Data state personnels, or postes
  const setNewData = (data) => {
    setTableDataIndex(data.tableIndex);
    setDataList(data.dataList);
  };

  const clearInput = () => {
    setCurrentIndex([]);
    setDataList([]);
  };

  const setNewPosition = (data) => {
    let list = [...dataList];
    list[currentIndex]["libelleNewPosition"] = data.libelle;
    list[currentIndex]["idNewPosition"] = data.idPosition;
    setDataList(list);
  };

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

  const update = () => {
    setloader(true);
    updateMutation.mutate(dataList);
  };

  return (
    <>
      <ListSelectedPersonnelModal
        setNewPersonnel={setNewData}
        modal={modalPersonnel}
        toggle={toggleModalPersonnel}
      />
      <ListPositionModal
        setNewPosition={setNewPosition}
        modal={modalPosition}
        toggle={toggleModaPosition}
        positions={positions}
      />

      <CRow>
        <CCol md="12">
          <CAlert color="dark">
            <CRow>
              <CCol md="6">
                <CButton onClick={toggleModalPersonnel} color="primary">
                  <FontAwesomeIcon className="mr-2" icon={faUserPlus} />{" "}
                  Selectionner les personnels
                </CButton>
              </CCol>
            </CRow>
          </CAlert>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CCard>
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

                  positionActuelle: (item, index) => (
                    <td key={index}>{item.position.libelle}</td>
                  ),

                  switch: (_) => (
                    <td className="text-center">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </td>
                  ),

                  nouvellePosition: (item, index) => (
                    <td key={index}>{item?.libelleNewPosition}</td>
                  ),

                  selectionner: (item, index) => (
                    <td className="py-2">
                      <div className="d-flex justify-content-between">
                        <CTooltip content="selectionner la nouvelle position">
                          <CButton
                            onClick={() => toggleModaPosition(index)}
                            color="primary"
                            size="sm"
                            className="text-center ml-2"
                          >
                            <FontAwesomeIcon
                              className="text-center"
                              size="lg"
                              icon={faUserTag}
                            />
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Supprimer ?">
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
                Annuler les modifications
              </CButton>
              {loader ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <CButton
                  disabled={positions && dataList.length > 0 ? false : true}
                  size="md"
                  color="success"
                  onClick={update}
                >
                  <FontAwesomeIcon className="mr-2" icon={faSave} />
                  Valider les modifications
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

export default PositionEditGrille;
