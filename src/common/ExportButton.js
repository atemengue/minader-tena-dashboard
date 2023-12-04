import { CButton } from "@coreui/react";
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ExportButton = ({ toggleCollapse, collapse }) => {
  return (
    <div>
      <CButton
        onClick={toggleCollapse}
        size="sm"
        color="dark"
        style={{ color: "white" }}
      >
        <FontAwesomeIcon
          className="mr-2"
          icon={collapse ? faArrowAltCircleUp : faArrowAltCircleDown}
        />
        Exporter PDF & EXCEL
      </CButton>
    </div>
  );
};

export default ExportButton;
