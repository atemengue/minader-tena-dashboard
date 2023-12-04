import { CCard, CCardBody, CCardHeader, CCardImg } from "@coreui/react";
import React from "react";

export default function Organnigramme({ name, match }) {
  const structure = match.params.structure;

  return (
    <CCard>
      <CCardHeader>{name}</CCardHeader>
      <CCardBody>
        <CCardImg
          id="structure-figure"
          variant="full"
          src={`icons/${structure}.svg`}
        />
      </CCardBody>
    </CCard>
  );
}
