import { CCard } from "@coreui/react";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SecurityContent = () => {
  return (
    <CCard>
      <div className="mw-100 md-100">
        <div className="text-center">
          <FontAwesomeIcon icon={faEyeSlash} size="9x" />
        </div>
      </div>
    </CCard>
  );
};

export default SecurityContent;
