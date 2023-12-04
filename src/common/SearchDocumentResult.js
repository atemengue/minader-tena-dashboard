import { CBadge, CCol, CDataTable, CImg } from "@coreui/react";
import { faEye, faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BUCKET_URL } from "../config";
import { fieldsDocumentResearch, getBadge } from "../utils/dataTables";

const SearchDocumentResult = ({ document }) => {
  return (
    <CDataTable
      fields={fieldsDocumentResearch}
      itemsPerPage={50}
      items={document}
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
        // Noms: (item, index) => (
        //   <td>
        //     {item.nomsPrenoms}-{item?.matricule}
        //   </td>
        // ),
        Voir: (item, index) => {
          return (
            <td className="py-2">
              <CTooltip content="Consulter le document">
                <CButton color="info" size="sm">
                  <FontAwesomeIcon className="mr-2" icon={faEye} />
                  Voir
                </CButton>
              </CTooltip>
            </td>
          );
        },
      }}
    />
  );

  // <div className="result">
  //   <div className=" d-flex align-items-center">
  //     <CCol
  //       md="1"
  //       className="d-flex align-items-center justify-content-center"
  //     >
  //       <div className="c-avatar d-flex align-items-center">
  //         <div className="image_inner_container2">
  //           <FontAwesomeIcon size="3x" icon={faFileArchive} />
  //         </div>
  //       </div>
  //     </CCol>

  //     <div className="result-detail">
  //       <div>
  //         <a href="#">
  //           {document?.nomsPrenoms} -(
  //           {document?.matricule})
  //         </a>
  //       </div>
  //       <div>
  //         <a class="link" href="#">
  //           {document?.title}
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // </div>
  // );
};

export default SearchDocumentResult;
