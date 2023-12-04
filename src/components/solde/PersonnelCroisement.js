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
import CheckSexeAndStatut from "../../common/CheckSexeAndStatut";
import CollapseFied from "../../common/CollapseField";
import ExportButton from "../../common/ExportButton";
import { BUCKET_URL } from "../../config";
import CanLevelOne from "../../RBAC/CanLevelOne";
import { fieldCroisement, fields, getBadge } from "../../utils/dataTables";
import { calculateAge } from "../../utils/functions";
import PersonnelDetailCollapse from "../personnels/PersonnelDetailCollapse";
import PersonnelModal from "../personnels/PersonnelModal";

const Personnel = ({ personnels, name }) => {
  const role = localStorage.getItem("roles");
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = (e) => {
    setCollapse(!collapse);
    e.preventDefault();
  };

  return (
    <>
      <CRow className="mb-3 mt-3">
        <CCol xs="12" md="12" className="d-flex justify-content-between">
          <h4>Total: {personnels?.length}</h4>

          <div className="d-flex justify-content-between">
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
          {/* <CanLevelOne
            role={role}
            yes={() => (
              // <CollapseFied
              //   name={name}
              //   collapse={collapse}
              //   personnels={personnels}
              // />
            )}
            no={() => ""}
          /> */}
        </CCol>
      </CRow>
      <CDataTable
        items={personnels}
        fields={fieldCroisement}
        itemsPerPage={10}
        itemsPerPageSelect
        pagination
        hover
        sorter
        header
        tableFilter
        columnFilter
        onRowClick={(data, index) => toggleDetails(data, index)}
        clickableRows
        striped
        bordered
        scopedSlots={{
          Numero: (item, index) => <td>{index}</td>,
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
        }}
      />
    </>
  );
};

export default Personnel;
