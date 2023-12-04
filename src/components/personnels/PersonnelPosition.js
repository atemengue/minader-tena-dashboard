import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import { faEye, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchPositions,
  fetchPositionsPersonnels,
} from "../../actions/positionActions";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import CanLevelOne from "../../RBAC/CanLevelOne";
import { fieldsPosition, getBadge, getPosition } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import WidgetsPosition from "../../views/widgets/WidgetsPosition";
import PersonnelModal from "./PersonnelModal";

const PersonnelPosition = (props) => {
  const [position, setPosition] = useState(1);
  const [modal, setModal] = useState(false);
  const [personnelDetail, setPersonnelDetail] = useState("");
  const [collapse, setCollapse] = useState(false);

  const role = localStorage.getItem("roles");

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  useEffect(() => {
    if (props.personnels.length === 0) {
      props.fetchPositionsPersonnels(position);
    }
    if (props.positionList.length === 0) {
      props.fetchPositions(); // ajouter en memo
    }
  }, []);

  const onChangePosition = (position) => {
    setPosition(position);
    props.fetchPositionsPersonnels(position);
  };

  return (
    <>
      <PersonnelModal modal={modal} toggle={toggle} data={personnelDetail} />
      <CRow>
        <CCol col="6" sm="6" md="4" className="mb-3">
          <CanLevelOne
            role={role}
            yes={() => (
              <CButton to="position/modifier" block size="xl" color="primary">
                <FontAwesomeIcon color="white" size="xl" icon={faUserEdit} />{" "}
                Modification les positions
              </CButton>
            )}
            no={() => ""}
          />
        </CCol>
        <CCol xs="12" lg="12">
          <WidgetsPosition />
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <h4>
                  {getPosition(position)} : {props.positionNumber}
                </h4>
                <CFormGroup row>
                  <CCol md="4">
                    <span className="font-weight" htmlFor="selectSm">
                      Position
                    </span>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CSelect
                      onChange={(event) => onChangePosition(event.target.value)}
                      defaultValue={position}
                      custom
                      size="md"
                      name="selectSm"
                      id="SelectLm"
                    >
                      {props.positionList.length !== 0
                        ? props.positionList.map((position, index) => {
                            return (
                              <option key={index} value={position.idPosition}>
                                {position.libelle}
                              </option>
                            );
                          })
                        : null}
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CanLevelOne
                  role={role}
                  yes={() => (
                    <ExportButton
                      collapse={collapse}
                      toggleCollapse={toggleCollapse}
                    />
                  )}
                  no={() => ""}
                />
              </div>
              <div>
                {!props.isLoadingTwo && (
                  <CanLevelOne
                    role={role}
                    yes={() => (
                      <CollapseFied
                        toggleCollapse={toggleCollapse}
                        collapse={collapse}
                        personnels={props.personnels}
                      />
                    )}
                    no={() => ""}
                  />
                )}
              </div>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={props.personnels}
                fields={fieldsPosition}
                itemsPerPage={10}
                pagination
                hover
                loading={props.isLoadingTwo}
                sorter
                tableFilter
                columnFilter
                clickableRows
                itemsPerPageSelect
                striped
                bordered
                scopedSlots={{
                  Numero: (item, index) => <td>{index}</td>,
                  position: (item) => (
                    <td>
                      {<CBadge color="warning">{item.position.libelle}</CBadge>}
                    </td>
                  ),
                  categorie: (item) => (
                    <td>{item.grade?.categorieIdCategorie}</td>
                  ),
                  structure: (item) => (
                    <td>
                      {item.structure
                        ? item.structure.designationAdministrative
                        : "Vide"}
                    </td>
                  ),
                  corps: (item) => (
                    <td>
                      <CBadge
                        color={getBadge(item.grade.statutAdministratifIdStatut)}
                      >
                        {item.grade.statutAdministratif.libelleStatut}
                      </CBadge>
                    </td>
                  ),
                  age: (item) => (
                    <td>
                      <CBadge color="primary">
                        {item.dateNaissance === null
                          ? ""
                          : calculateAge(item.dateNaissance)}
                      </CBadge>
                    </td>
                  ),
                  Voir: (item, index) => {
                    return (
                      <td className="py-2">
                        <CTooltip content="Voir le profil du personnel">
                          <CButton
                            color="info"
                            to={`personnels/${item.matricule}`}
                            size="sm"
                          >
                            <FontAwesomeIcon className="mr-2" icon={faEye} />
                            Voir
                          </CButton>
                        </CTooltip>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

const mapStateToProps = ({ positionState }) => ({
  isLoadingTwo: positionState.isLoadingTwo,
  personnels: positionState.personnels,
  positionList: positionState.positionList,
  positionNumber: positionState.positionNumber,
});

export default connect(mapStateToProps, {
  fetchPositions,
  fetchPositionsPersonnels,
})(PersonnelPosition);
