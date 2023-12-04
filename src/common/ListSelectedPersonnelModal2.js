import {
  CBadge,
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
import { fetchPersonnels } from "../actions/personnelActions";
import {
  fieldsAffectationModal,
  fieldsAffectationModal2,
  getBadge,
} from "../utils/dataTables";
import { calculateAge } from "../utils/functions";

const ListSelectedPersonnelModal = ({
  setNewPersonnel,
  modal,
  toggle,
  data,
  personnels,
  fetchPersonnels,
  ...props
}) => {
  const [dataList, setDataList] = useState([]);
  const [tableIndex, setTableIndex] = useState([]);

  const handlePersonnelChange = (item) => {
    let list = [...dataList];
    let tabs = [...tableIndex];

    if (!tabs.includes(item.matricule)) {
      let matriculeIndex = [...tabs, item.matricule];
      let personnel = {
        matricule: item.matricule,
        matriculeSansTiret: item.matriculeSansTiret,
        noms: item.noms,
        prenoms: item.prenoms,
        nomsPrenoms: item.nomsPrenoms,
        idNewStructure: null,
        idNewPosition: null,
        libelleNewPosition: null,
        dateNaissance: item.dateNaissance,
        lieuNaissance: item.lieuNaissance,
        anneeRetraite: item.anneeRetraite,
        dateRecrutement: item.dateRecrutement,
        age: calculateAge(item.dateNaissance),
        categorie: item.currentCategorie,
        position: item.position,
        grade: item.grade,
        dateRetraite: item.dateRetraite,
        structure: item?.structure,
        postes: item?.postes,
        telephones: item?.telephones,
        email: item?.email,
      };
      list = [...dataList, personnel];
      setTableIndex(matriculeIndex);
      setDataList(list);
    } else {
      let position = tabs.indexOf(item.matricule);
      list.splice(position, 1);
      tabs.splice(position, 1);
      setTableIndex(tabs);
      setDataList(list);
    }
  };

  const selectPersonnel = () => {
    setNewPersonnel({ dataList, tableIndex });
    toggle();
  };

  useEffect(() => {
    if (personnels.length === 0) {
      fetchPersonnels();
    }
  }, [fetchPersonnels]);

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
          <h4>Liste du Personnel</h4>
        </div>
        <hr />
        <h5>Nombre de personnel selectionnés: {dataList.length} </h5>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md="6">
            <CDataTable
              items={personnels}
              fields={fieldsAffectationModal}
              pagination
              itemsPerPageSelect
              hover
              sorter
              onRowClick={(item) => handlePersonnelChange(item)}
              tableFilter
              columnFilter
              clickableRows
              striped
              bordered
              scopedSlots={{
                corps: (item) => (
                  <td>
                    <CBadge
                      color={getBadge(item.grade.statutAdministratifIdStatut)}
                    >
                      {item.grade.statutAdministratif.libelleStatut}
                    </CBadge>
                  </td>
                ),
              }}
            />
          </CCol>
          <CCol md="6">
            <div className="d-flex justify-content-end">
              <CButton size="sm" color="danger" onClick={() => clearInput()}>
                <FontAwesomeIcon className="mr-2" icon={faUndo} />
                Vider la liste du personnels
              </CButton>
            </div>
            <CDataTable
              items={dataList}
              fields={fieldsAffectationModal2}
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
                corps: (item) => (
                  <td>
                    <CBadge
                      color={getBadge(item.grade.statutAdministratifIdStatut)}
                    >
                      {item.grade.statutAdministratif.libelleStatut}
                    </CBadge>
                  </td>
                ),
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
        <CButton onClick={selectPersonnel} color="info">
          <FontAwesomeIcon icon={faSave} className="mr-2" />
          Enregister
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const mapStateToProps = ({ personnelState }) => ({
  personnels: personnelState.personnels,
});

export default connect(mapStateToProps, { fetchPersonnels })(
  ListSelectedPersonnelModal
);
