import { CButton } from "@coreui/react";
import { faFileExcel, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TheExtractButton = ({ pdfDownload, excelDownload, children }) => {
  return (
    <div className="d-flex">
      <div className="mx-2">{children}</div>
      <div className="mx-2">
        <CButton
          onClick={pdfDownload}
          size="sm"
          block
          shape="square"
          color="danger"
        >
          <FontAwesomeIcon className="mr-2" icon={faFilePdf} color="white" />
          PDF
        </CButton>
      </div>

      <div className="mx-2">
        <CButton
          onClick={excelDownload}
          size="sm"
          block
          shape="square"
          color="success"
        >
          <FontAwesomeIcon className="mr-2" icon={faFileExcel} color="white" />
          EXCEL
        </CButton>
      </div>
    </div>
  );
};

export default TheExtractButton;
