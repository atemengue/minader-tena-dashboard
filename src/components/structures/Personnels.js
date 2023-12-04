import {
  CBadge,
  CButton,
  CCol,
  CCollapse,
  CDataTable,
  CFormGroup,
  CImg,
  CInputCheckbox,
  CLabel,
  CRow,
} from "@coreui/react";
import { faUserCircle, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CanLevelOne from "../../RBAC/CanLevelOne";
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import { BUCKET_URL } from "../../config";
import { fields, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import PersonnelDetailCollapse from "../personnels/PersonnelDetailCollapse";
import PersonnelModal from "../personnels/PersonnelModal";

const Personnels = ({ personnels, structureName, name, idStructure }) => {
  const [modal, setModal] = useState(false);
  const [filterPersonnels, setFilterPersonnels] = useState(personnels);
  const [personnelDetail, setPersonnelDetail] = useState("");
  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
    fonctionnaireChecked: false,
    contractuelChecked: false,
  });

  const [collapse, setCollapse] = useState(false);
  const role = localStorage.getItem("roles");

  const toggle = () => {
    setModal(!modal);
  };

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  // construire un custom hooks
  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
        });
        if (event.target.checked) {
          let men = personnels.filter((personnel) => personnel.sexe === "1");
          if (checked.fonctionnaireChecked) {
            men = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(men);
          }

          if (checked.contractuelChecked) {
            men = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(men);
          }
          setFilterPersonnels(men);
        } else {
          let data = personnels;
          if (checked.fonctionnaireChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(data);
          }

          if (checked.contractuelChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }
        break;

      case 2:
        setChecked({
          ...checked,
          manChecked: false,
          womanChecked: event.target.checked,
        });

        if (event.target.checked) {
          let women = personnels.filter((personnel) => personnel.sexe === "2");
          if (checked.fonctionnaireChecked) {
            women = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(women);
          }

          if (checked.contractuelChecked) {
            women = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(women);
          }
          setFilterPersonnels(women);
        } else {
          let data = personnels;
          if (checked.fonctionnaireChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(data);
          }

          if (checked.contractuelChecked) {
            data = personnels.filter(
              (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;
      case 3:
        setChecked({
          ...checked,
          contractuelChecked: false,
          fonctionnaireChecked: event.target.checked,
        });

        if (event.target.checked) {
          let fonctionnaires = personnels.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut === 1
          );
          if (checked.manChecked) {
            fonctionnaires = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(fonctionnaires);
          }

          if (checked.womanChecked) {
            fonctionnaires = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut === 1
            );
            setFilterPersonnels(fonctionnaires);
          }
          setFilterPersonnels(fonctionnaires);
        } else {
          let data = personnels;
          if (checked.manChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "1");
            setFilterPersonnels(data);
          }

          if (checked.womanChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "2");
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;
      case 4:
        setChecked({
          ...checked,
          fonctionnaireChecked: false,
          contractuelChecked: event.target.checked,
        });

        if (event.target.checked) {
          let contractuels = personnels.filter(
            (personnel) => personnel.grade.statutAdministratifIdStatut !== 1
          );
          if (checked.manChecked) {
            contractuels = personnels.filter(
              (personnel) =>
                personnel.sexe === "1" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(contractuels);
          }

          if (checked.womanChecked) {
            contractuels = personnels.filter(
              (personnel) =>
                personnel.sexe === "2" &&
                personnel.grade.statutAdministratifIdStatut !== 1
            );
            setFilterPersonnels(contractuels);
          }
          setFilterPersonnels(contractuels);
        } else {
          let data = personnels;
          if (checked.manChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "1");
            setFilterPersonnels(data);
          }

          if (checked.womanChecked) {
            data = personnels.filter((personnel) => personnel.sexe === "2");
            setFilterPersonnels(data);
          }
          setFilterPersonnels(data);
        }

        break;

      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
          fonctionnaireChecked: false,
          contractuelChecked: false,
        });
        break;
    }
  };

  const [details, setDetails] = useState([]);

  const toggleDetails = (data, index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
    setPersonnelDetail(data);
  };

  return (
    <>
      <PersonnelModal modal={modal} toggle={toggle} data={personnelDetail} />
      <CRow className="mb-3 mt-3">
        <CCol>
          <CheckSexeAndStatut
            name={name}
            onCheckedSexe={onCheckedSexe}
            checked={checked}
          />
          <hr />
        </CCol>
        <CCol xs="12" md="12" className="d-flex justify-content-between">
          <h4>Total: {filterPersonnels.length}</h4>

          <div className="d-flex justify-content-between">
            <div>
              <CButton
                to={`${idStructure}/decision-conges`}
                className="mr-2"
                size="sm"
                color="info"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                Créer une decision de congés
              </CButton>
            </div>
            {/* <DecisionCongeFonctionnaire
              structure={structureName}
              personnels={filterPersonnels}
            /> */}
            {/* <div>
              <CButton
                className="mr-2"
                size="sm"
                color="primary"
                style={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                Decision des Congés Corps du Travail
              </CButton>
            </div> */}

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
        </CCol>
        <CCol>
          <CanLevelOne
            role={role}
            yes={() => (
              <CollapseFied
                name={name}
                collapse={collapse}
                personnels={filterPersonnels}
              />
            )}
            no={() => ""}
          />
        </CCol>
      </CRow>
      <CDataTable
        items={filterPersonnels}
        fields={fields}
        itemsPerPage={10}
        itemsPerPageSelect
        pagination
        hover
        sorter
        header
        tableFilter
        columnFilter
        onRowClick={(data, index) => toggleDetails(data, index)}
        // onRowClick={(data) => onHandleModal(data)}
        clickableRows
        striped
        bordered
        scopedSlots={{
          Numero: (item, index) => <td>{index}</td>,
          picture: (item, index) => (
            <div
              className="c-avatar d-flex justify-content-center
            align-items-center
            "
            >
              <CImg
                src={
                  item?.photo
                    ? `${BUCKET_URL}/personnels/${item.personnelIdArchive}/${item.photo}`
                    : `${BUCKET_URL}/default/user.png`
                }
                alt="photo de profil"
                className="c-avatar-img"
              />
            </div>
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
          poste: (item, index) => {
            return <td key={index}>{item?.postes[0]?.libellePoste}</td>;
          },
          position: (item) => (
            <td>{<CBadge color="warning">{item.position.libelle}</CBadge>}</td>
          ),
          corps: (item) => (
            <td>
              <CBadge color={getBadge(item.grade.statutAdministratifIdStatut)}>
                {item.grade.statutAdministratif.libelleStatut}
              </CBadge>
            </td>
          ),
          structure: (item) => (
            <td>{item.structure.designationAdministrative}</td>
          ),
          categorie: (item) => <td>{item.grade?.categorieIdCategorie}</td>,
          Voir: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                >
                  Voir
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <PersonnelDetailCollapse data={personnelDetail} />
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default Personnels;
