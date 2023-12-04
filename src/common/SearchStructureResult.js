import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CImg,
  CRow,
  CSelect,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { fieldsStructureResearch, getBadge } from "../utils/dataTables";

const SearchStructureResult = ({ structures }) => {
  return (
    <CDataTable
      fields={fieldsStructureResearch}
      itemsPerPage={50}
      items={structures}
      pagination
      itemsPerPageSelect
      hover
      sorter
      tableFilter
      columnFilter
      clickableRows
      bordered
      scopedSlots={{
        Numero: (item, index) => <td>{index}</td>,
        Voir: (item, index) => {
          return (
            <td className="py-2">
              <CTooltip content="Voir les détails">
                <CButton
                  color="info"
                  to={`/structures/${item.idStructure}`}
                  size="sm"
                >
                  <FontAwesomeIcon className="mr-2" icon={faEye} />
                  Voir les details
                </CButton>
              </CTooltip>
            </td>
          );
        },
      }}
    />
  );
};

export default SearchStructureResult;
