import { CBadge, CButton, CCol, CDataTable, CRow } from "@coreui/react";
import React, { useState } from "react";
import Can from "../../RBAC/Can";
import { fieldsPosition, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import PersonnelModal from "../personnels/PersonnelModal";
import PersonneLExport from "./PersonnelExport";

const PersonnelAll = ({ data, structureName }) => {
  const [modal, setModal] = useState(false);
  const [filterPersonnels, setFilterPersonnels] = useState(data);
  const [personnelDetail, setPersonnelDetail] = useState("");
  const [checked, setChecked] = useState({
    manChecked: false,
    womanChecked: false,
  });

  const role = localStorage.getItem("roles");

  const toggle = () => {
    setModal(!modal);
  };

  const onHandleModal = (data) => {
    toggle();
    setPersonnelDetail(data);
  };

  const onCheckedSexe = (event) => {
    switch (parseInt(event.target.value)) {
      case 1:
        setChecked({
          ...checked,
          manChecked: event.target.checked,
          womanChecked: false,
        });

        if (event.target.checked) {
          const men = data.filter((personnel) => personnel.sexe === "1");
          setFilterPersonnels(men);
        } else {
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
          const women = data.filter((personnel) => personnel.sexe === "2");
          setFilterPersonnels(women);
        } else {
          setFilterPersonnels(data);
        }

        break;
      default:
        setChecked({
          manChecked: false,
          womanChecked: false,
        });
        break;
    }
    //   let postesFilter = postes.filter(
    //     (item) => item.naturePosteIdNaturePoste === nature
    //   );
    //   setFilterPoste(postesFilter);
    // }
  };

  return (
    <>
      <PersonnelModal modal={modal} toggle={toggle} data={personnelDetail} />
      <CRow className="mb-3 mt-3">
        <CCol xs="12" md="12" className="d-flex justify-content-between">
          <h4>Total: {filterPersonnels.length}</h4>
          <div>
            {/* <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                onChange={onCheckedSexe}
                custom
                id="man"
                checked={checked.manChecked}
                name="man"
                value="1"
              />
              <CLabel variant="custom-checkbox" htmlFor="man">
                Homme
              </CLabel>
            </CFormGroup> */}
            {/* <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                checked={checked.womanChecked}
                onChange={onCheckedSexe}
                custom
                id="woman"
                name="woman"
                value="2"
              />
              <CLabel variant="custom-checkbox" htmlFor="woman">
                Femme
              </CLabel>
            </CFormGroup> */}
          </div>
          <Can
            role={role}
            yes={() => (
              <PersonneLExport personnels={data} structure={structureName} />
            )}
            no={() => ""}
          />
        </CCol>
      </CRow>
      <CDataTable
        items={filterPersonnels}
        fields={fieldsPosition}
        itemsPerPage={10}
        itemsPerPageSelect
        pagination
        hover
        sorter
        header
        tableFilter
        columnFilter
        onRowClick={(data) => onHandleModal(data)}
        clickableRows
        striped
        bordered
        scopedSlots={{
          Numero: (item, index) => <td>{index}</td>,
          age: (item) => (
            <td>
              <CBadge color="primary">
                {item.dateNaissance === null
                  ? ""
                  : calculateAge(item.dateNaissance)}
              </CBadge>
            </td>
          ),
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
          categorie: (item) => <td>{item.categorie.idCategorie}</td>,
          Voir: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  to={`/personnels/${item.matricule}`}
                >
                  Voir
                </CButton>
              </td>
            );
          },
        }}
      />
    </>
  );
};

export default PersonnelAll;
