import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { faArrowRight, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { updatePostes } from "../../actions/posteActions";
import ListPersonnelModal from "../../common/ListPersonnelModal";
import { fieldsPosteUpdate, getBadge } from "../../utils/dataTables";

const PosteUpdate = ({ postes, structure, history, ...props }) => {
  const [personnelList, setPersonnelList] = useState([]);
  const [tableIndex, setTableIndex] = useState([]);
  const [modal, setModal] = useState(false);
  const [newPersonnel, setNewPersonnel] = useState(null);
  const [indexListPersonnel, setIndexListPersonnel] = useState(0);

  const toggle = () => {
    setModal(!modal);
  };

  // const goBack = () => {
  //   history.goBack();
  // };

  const onHandleModal = (index, number) => {
    switch (number) {
      case 1:
        toggle();
        setIndexListPersonnel(index);
        break;
      default:
        break;
    }
  };

  const fields = [
    "Poste",
    "Occupant",
    "Remplace",
    "Nouveau",
    "Matricule",
    "Supprimer",
  ];

  const handlePersonnelChange = (item) => {
    let list = [...personnelList];
    let tabs = [...tableIndex];

    if (!tabs.includes(item.idPoste)) {
      let postesIndex = [...tabs, item.idPoste];
      let personnel = {
        idPoste: item.idPoste,
        Poste: item.libellePoste,
        Occupant: item.Occupant,
        Matricule: null,
        Nouveau: null,
        newIdStructure: item.structure.idStructure,
      };
      list = [...personnelList, personnel];
      setTableIndex(postesIndex);
      setPersonnelList(list);
    }
  };

  const removePersonnel = (item) => {
    let list = [...personnelList];
    let tabs = [...tableIndex];
    let position = tabs.indexOf(item.idPoste);
    list.splice(position, 1);
    tabs.splice(position, 1);
    setTableIndex(tabs);
    setPersonnelList(list);
  };

  const setNewData = (data) => {
    setNewPersonnel(data);
    setNewField(data, indexListPersonnel);
  };

  // optimiser en ume fonction
  const setNewField = (data, index) => {
    let position = tableIndex.indexOf(index);
    let list = [...personnelList];
    list[position]["Nouveau"] = data.nomsPrenoms;
    list[position]["Matricule"] = data.matricule;
    list[position]["newIdStructure"] = data.structureIdStructure;

    setPersonnelList(list);
  };

  const update = () => {
    if (personnelList.length === 0) {
      toast.error("Veuillez selectionner les postes ");
    } else {
      props.updatePostes(personnelList).then(() => {
        clearInput();
        history.push("/temp");
        history.goBack();
        toast.success("Mises des postes de responsables valides");
      });
    }
  };

  const clearInput = () => {
    setIndexListPersonnel([]);
    setPersonnelList([]);
    setTableIndex([]);
    setNewPersonnel(null);
  };

  return (
    <>
      <ListPersonnelModal
        modal={modal}
        toggle={toggle}
        setNewData={setNewData}
        newPersonnel={newPersonnel}
      />

      <CRow className="mb-3 mt-3"></CRow>
      <CRow>
        <CCol md="6">
          <CCard>
            <CCardHeader>
              <h6>Liste du personnel en poste</h6>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={postes}
                fields={fieldsPosteUpdate}
                itemsPerPage={5}
                itemsPerPageSelect
                pagination
                hover
                sorter
                header
                tableFilter
                columnFilter
                onRowClick={(item) => handlePersonnelChange(item)}
                clickableRows
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  Occupant: (item, index) => {
                    const personnel = item.personnel;
                    return personnel ? (
                      <td key={index}>{item.personnel.nomsPrenoms}</td>
                    ) : (
                      <td key={index}>
                        <CBadge color="danger">Poste Vaccant</CBadge>
                      </td>
                    );
                  },
                  Matricule: (item, index) => {
                    const personnel = item.personnel;
                    return personnel ? (
                      <td key={index}>{item.personnel.matricule}</td>
                    ) : (
                      <td key={index}>
                        <CBadge color="danger">Poste Vaccant</CBadge>
                      </td>
                    );
                  },

                  Position: (item, index) => {
                    const position = item.personnel;
                    return position ? (
                      <td>
                        {
                          <CBadge
                            color={getBadge(item.personnel.position.idPosition)}
                          >
                            {item.personnel.position.libelle}
                          </CBadge>
                        }
                      </td>
                    ) : (
                      <td key={index}>
                        <CBadge color="danger">Poste Vaccant</CBadge>
                      </td>
                    );
                  },

                  Nouveau: (item, index) => {
                    return (
                      <td className="py-2">
                        <CButton
                          disabled={
                            tableIndex.includes(item.idPoste) ? false : true
                          }
                          onClick={() => onHandleModal(item.idPoste, 1)}
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                        >
                          Nouveau
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
            <CCardFooter>
              <CCol xs="12" md="12" className="d-flex justify-content-between">
                <h4>Total des postes: {postes.length}</h4>
              </CCol>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              <h6>Listes des Postes a mettre a jour</h6>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                sorter
                header
                tableFilter
                items={personnelList}
                itemsPerPage={5}
                fields={fields}
                scopedSlots={{
                  Poste: (item) => <td>{item.Poste}</td>,
                  Occupant: (item) => <td>{item.Occupant}</td>,
                  Remplace: (_) => (
                    <td className="text-center">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </td>
                  ),
                  Nouveau: (item) => <td>{item.Nouveau}</td>,
                  Matricule: (item) => <td>{item.Matricule}</td>,
                  NaturePoste: (item) => <td>{item.NaturePoste}</td>,
                  Supprimer: (item, index) => (
                    <td className="py-2">
                      <CButton
                        key={index}
                        onClick={() => removePersonnel(item)}
                        color="danger"
                        shape="square"
                        size="sm"
                      >
                        <FontAwesomeIcon icon={faWindowClose} />
                      </CButton>
                    </td>
                  ),
                }}
              />
            </CCardBody>
            <CCardFooter className="d-flex justify-content-between">
              <CButton onClick={clearInput} size="md" color="danger">
                Vider les champs
              </CButton>
              {props.isLoadingUpdate ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <CButton onClick={update} size="md" color="success">
                  Valider les mises a jours
                </CButton>
              )}
              <CBadge size="md" color="warning">
                <h6>Total: {personnelList.length}</h6>
              </CBadge>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ posteState }) => ({
  isLoadingUpdate: posteState.isLoadingUpdate,
  updateNumber: posteState.updateNumber,
});

export default connect(mapStateToProps, { updatePostes })(PosteUpdate);
