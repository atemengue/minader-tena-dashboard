import {
  CButton,
  CCol,
  CDataTable,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CRow,
} from "@coreui/react";
import {
  faSave,
  faTrashAlt,
  faUndo,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchGrades } from "../actions/gardeActions";
import { fieldsGrade, fieldsGrade2 } from "../utils/dataTables";

const ListSelectGrades = ({
  setNewGrade,
  modal,
  toggle,
  data,
  grades,
  fetchGrades,
  ...props
}) => {
  const [dataList, setDataList] = useState([]);
  const [tableIndex, setTableIndex] = useState([]);

  const handlePersonnelChange = (item) => {
    let list = [...dataList];
    let tabs = [...tableIndex];

    if (!tabs.includes(item.idGrade)) {
      let gradeIndex = [...tabs, item.idGrade];
      let grade = {
        idGrade: item.idGrade,
        libelleGrade: item.libelleGrade,
        corps: item?.corp.libelleCorps,
        categorieIdCategorie: item.categorieIdCategorie,
        personnels: [],
      };
      list = [...dataList, grade];
      setTableIndex(gradeIndex);
      setDataList(list);
    } else {
      let position = tabs.indexOf(item.idGrade);
      list.splice(position, 1);
      tabs.splice(position, 1);
      setTableIndex(tabs);
      setDataList(list);
    }
  };

  const selectGrade = () => {
    setNewGrade({ dataList, tableIndex });
    toggle();
  };

  useEffect(() => {
    if (grades.length === 0) {
      fetchGrades();
    }
  }, [fetchGrades]);

  const closeModal = () => {
    toggle();
  };

  const clearInput = () => {
    setDataList([]);
    setTableIndex([]);
  };

  return (
    <CModal size="xl" show={modal} onClose={toggle}>
      <CModalHeader closeButton>
        <div>
          <h4>Liste des grades</h4>
        </div>
        <hr />
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md="6">
            <CDataTable
              items={grades}
              fields={fieldsGrade}
              pagination
              itemsPerPageSelect
              hover
              sorter
              itemsPerPage={5}
              tableFilter
              columnFilter
              clickableRows
              onRowClick={(item) => handlePersonnelChange(item)}
              striped
              bordered
              scopedSlots={{
                Numero: (item, index) => <td key={index}>{index}</td>,
              }}
            />
          </CCol>
          <CCol md="6">
            <div className="d-flex justify-content-end">
              <CButton size="sm" color="danger" onClick={() => clearInput()}>
                <FontAwesomeIcon className="mr-2" icon={faUndo} />
                Vider la liste des grades
              </CButton>
            </div>
            <CDataTable
              items={dataList}
              fields={fieldsGrade2}
              itemsPerPage={5}
              pagination
              itemsPerPageSelect
              hover
              sorter
              tableFilter
              columnFilter
              clickableRows
              striped
              bordered
              scopedSlots={{
                Numero: (item, index) => <td key={index}>{index}</td>,

                supprimer: (item, index) => {
                  return (
                    <td key={index}>
                      <CButton
                        onClick={() => handlePersonnelChange(item)}
                        size="sm"
                        shape="square"
                        color="danger"
                      >
                        <FontAwesomeIcon size="lg" icon={faTrashAlt} />
                      </CButton>
                    </td>
                  );
                },
              }}
            />
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={closeModal}>
          <FontAwesomeIcon icon={faWindowClose} className="mr-2" />
          Fermer
        </CButton>
        <CButton onClick={selectGrade} color="info">
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Enregister
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const mapStateToProps = ({ gardeState }) => ({
  grades: gardeState.grades,
});

export default connect(mapStateToProps, { fetchGrades })(ListSelectGrades);
