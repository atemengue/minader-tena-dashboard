import { CCard, CCardBody, CCardHeader, CCardImg } from "@coreui/react";
import React from "react";
export default function Manuel() {
  return (
    <div>
      <CCard>
        <CCardHeader>Manuel d'utilisation en cours d'ecriture</CCardHeader>
        <CCardBody>
          <CCardImg
            height="250"
            width="250"
            variant="full"
            src="images/icons/document-write.svg"
          />
        </CCardBody>
      </CCard>
    </div>
  );
}
