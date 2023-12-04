import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CRow,
  CSelect,
} from "@coreui/react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ListPersonnelModal from "../../common/ListPersonnelModal";
import {
  fieldsPosteUpdate,
  getBadge,
  getNaturePoste,
} from "../../utils/dataTables";

export const MAJByNature = ({
  postes,
  history,
  fetchPosteByNature,
  isLoadingPosteByNature,
  natureList,
  ...props
}) => {
  const [personnelList, setPersonnelList] = useState([]);
  const [tableIndex, setTableIndex] = useState([]);
  const [modal, setModal] = useState(false);
  const [newPersonnel, setNewPersonnel] = useState(null);
  const [naturePoste, setNaturePoste] = useState(4);
  const [indexListPersonnel, setIndexListPersonnel] = useState(0);

  const clearInput = () => {
    setIndexListPersonnel([]);
    setPersonnelList([]);
    setTableIndex([]);
    setNewPersonnel(null);
  };

  // factorise cette function
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
    // } else {
    //   let position = tabs.indexOf(item.idPoste);
    //   list.splice(position, 1);
    //   tabs.splice(position, 1);
    //   setTableIndex(tabs);
    //   setPersonnelList(list);
    // }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (index, number) => {
    switch (number) {
      case 1:
        toggle();
        setIndexListPersonnel(index);
        break;
      case 2:
        setIndexListPersonnel(index);

      default:
        break;
    }
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

    setPersonnelList(list);
  };

  const onChangeNature = (nature) => {
    setTimeout(() => {
      setNaturePoste(nature);
      fetchPosteByNature(nature);
    }, 1000);
  };

  // factorise ici
  const fields = ["Poste", "Occupant", "Remplace", "Nouveau", "Matricule"];

  return (
    <CRow>
      <ListPersonnelModal
        modal={modal}
        toggle={toggle}
        setNewData={setNewData}
        newPersonnel={newPersonnel}
      />

      <CCol md="12">
        <CRow>
          <CCol md="12" className="m-4">
            <CFormGroup className="d-flex align-items-center" row>
              <CCol xs="12" md="4">
                <h5 className="font-weight" htmlFor="selectSm">
                  Nature du Poste
                </h5>
                <CSelect
                  onChange={(event) => onChangeNature(event.target.value)}
                  defaultValue={naturePoste}
                  custom
                  size="md"
                  name="selectSm"
                  id="SelectLm"
                >
                  {natureList.length !== 0
                    ? natureList.map((nature, index) => {
                        return (
                          <option key={index} value={nature.idNaturePoste}>
                            {nature.libelleNaturePoste}
                          </option>
                        );
                      })
                    : null}
                </CSelect>
              </CCol>
            </CFormGroup>
          </CCol>
        </CRow>
      </CCol>
      <CCol md="12">
        <CRow>
          <CCol md="7">
            <CCard>
              <CCardHeader>
                <h5>
                  {getNaturePoste(naturePoste)}: {postes.length}
                </h5>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={postes}
                  fields={fieldsPosteUpdate}
                  itemsPerPage={5}
                  Nouveau
                  itemsPerPageSelect
                  pagination
                  hover
                  sorter
                  loading={isLoadingPosteByNature}
                  header
                  tableFilter
                  columnFilter
                  clickableRows
                  onRowClick={(item) => handlePersonnelChange(item)}
                  striped
                  bordered
                  scopedSlots={{
                    Numero: (item, index) => <td key={index}>{index}</td>,
                    Structure: (item, index) => {
                      const structure = item.structure;
                      return structure ? (
                        <td key={index}>
                          {item.structure.designationAdministrative}
                        </td>
                      ) : (
                        <td key={index}>
                          <CBadge color="danger">Poste Vaccant</CBadge>
                        </td>
                      );
                    },
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
                              color={getBadge(
                                item.personnel.position.idPosition
                              )}
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
                    Nouveau: (item) => {
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
                <CCol
                  xs="12"
                  md="12"
                  className="d-flex justify-content-between"
                >
                  <h4>Total des postes: {postes.length}</h4>
                </CCol>
              </CCardFooter>
            </CCard>
          </CCol>
          <CCol xs="12" md="5">
            <CCard>
              <CCardHeader>Listes des Postes a mettre a jour</CCardHeader>
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
                  }}
                />
              </CCardBody>
              <CCardFooter className="d-flex justify-content-between">
                <CButton onClick={clearInput} size="md" color="danger">
                  Vider les champs
                </CButton>
                {props.isLoadingUpdate ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
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
      </CCol>
    </CRow>
  );
};

export default MAJByNature;
