import React from "react";
import { CSubheader, CNav, CNavItem, CNavLink } from "@coreui/react";

const NavStatus = () => {
  return (
    <CSubheader className="flex">
      <CNav className="d-flex align-self-center">
        <CNavItem className="p-2"></CNavItem>
        <CNavItem className="p-2">
          <CNavLink to="/personnels">En Activite</CNavLink>
        </CNavItem>
        <CNavItem className="p-2">
          <CNavLink to="/personnels/fonctionnaires">Fonctionnaires</CNavLink>
        </CNavItem>
        <CNavItem className="p-2">
          <CNavLink to="/personnels/contractuels">Contractuels</CNavLink>
        </CNavItem>
        <CNavItem className="p-2">
          <CNavLink to="/personnels/decisionnaires">Decisionnaires</CNavLink>
        </CNavItem>
      </CNav>
    </CSubheader>
  );
};
export default NavStatus;
