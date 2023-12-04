import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchPositions,
  fetchPositionsPersonnels,
} from "../../actions/positionActions";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import Can from "../../RBAC/Can";
import { fieldsPosition, getBadge, getPosition } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import PersonnelModal from "../personnels/PersonnelModal";

const PersonnelIntegration = (props) => {
  const [position, setPosition] = useState(6);
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
  }, [
    props.fetchPositionsPersonnels,
    props.fetchPositions,
    props.positionList,
  ]);

  const onChangePosition = (position) => {
    setPosition(position);
    props.fetchPositionsPersonnels(position);
  };

  return (
    <>
      <PersonnelModal modal={modal} toggle={toggle} data={personnelDetail} />
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <h4>
                  {getPosition(position)} : {props.positionNumber}
                </h4>
                <Can
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
                  <Can
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
})(PersonnelIntegration);
