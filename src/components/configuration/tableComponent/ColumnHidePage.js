import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CTooltip,
} from "@coreui/react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ColumnHidePage({ instance }) {
  return (
    <div>
      <CTooltip
        style={{ backgroundColor: "red" }}
        interactive={true}
        title="Popover title"
        content={
          <CCard color="black">
            <CCardHeader>Afficher les colonness</CCardHeader>
            <CCardBody>
              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox custom />
                <CLabel color="black" variant="custom-checkbox">
                  Photo
                </CLabel>
              </CFormGroup>

              <CFormGroup variant="custom-checkbox" inline>
                <CInputCheckbox custom />
                <CLabel color="black" variant="custom-checkbox">
                  Matricule
                </CLabel>
              </CFormGroup>
            </CCardBody>
          </CCard>
        }
        placement="right"
      >
        <CButton>
          <FontAwesomeIcon color="gray" size="md" icon={faFilter} />{" "}
        </CButton>
      </CTooltip>
    </div>
  );
}
