import { CFormGroup, CInputCheckbox, CLabel } from "@coreui/react";
import React from "react";

export default function CheckSexeAndStatut({
  name,
  onCheckedSexe,
  checked,
  statusAdmin = true,
}) {
  return (
    <div className="p-3">
      <CFormGroup variant="custom-checkbox" inline>
        <CInputCheckbox
          onChange={onCheckedSexe}
          custom
          id={`${name}nam`}
          checked={checked.manChecked}
          name={`${name}nam`}
          value="1"
        />
        <CLabel variant="custom-checkbox" htmlFor={`${name}nam`}>
          Homme
        </CLabel>
      </CFormGroup>
      <CFormGroup variant="custom-checkbox" inline>
        <CInputCheckbox
          checked={checked.womanChecked}
          onChange={onCheckedSexe}
          custom
          id={`${name}woman`}
          name={`${name}woman`}
          value="2"
        />
        <CLabel variant="custom-checkbox" htmlFor={`${name}woman`}>
          Femme
        </CLabel>
      </CFormGroup>
      <CFormGroup variant="custom-checkbox" inline>
        <CInputCheckbox
          checked={checked.vacant}
          onChange={onCheckedSexe}
          custom
          id={`${name}vacant`}
          name={`${name}vacant`}
          value="5"
        />
        <CLabel variant="custom-checkbox" htmlFor={`${name}vacant`}>
          Vacant
        </CLabel>
      </CFormGroup>

      {statusAdmin && (
        <>
          <CFormGroup variant="custom-checkbox" inline>
            <CInputCheckbox
              checked={checked.fonctionnaireChecked}
              onChange={onCheckedSexe}
              custom
              id={`${name}fonctionnaires`}
              name={`${name}fonctionnaires`}
              value="3"
            />
            <CLabel variant="custom-checkbox" htmlFor={`${name}fonctionnaires`}>
              Fonctionnaires
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="custom-checkbox" inline>
            <CInputCheckbox
              checked={checked.contractuelChecked}
              onChange={onCheckedSexe}
              custom
              id={`${name}contractuel`}
              name={`${name}contractuel`}
              value="4"
            />
            <CLabel variant="custom-checkbox" htmlFor={`${name}contractuel`}>
              Contractuels
            </CLabel>
          </CFormGroup>
        </>
      )}
    </div>
  );
}
