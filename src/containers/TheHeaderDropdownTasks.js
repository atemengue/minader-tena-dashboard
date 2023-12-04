import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  faBuilding,
  faUserCheck,
  faUserPlus,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TheHeaderDropdownTasks = () => {
  const itemsCount = 5;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-list" />
        <CBadge shape="pill" color="warning">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>Listes des taches rapides</strong>
        </CDropdownItem>
        <CDropdownItem to="/personnels/creer" className="d-block">
          <div className="small mb-1">
            <FontAwesomeIcon className="mr-2" icon={faUserPlus} />
            Créer un personnel
          </div>
        </CDropdownItem>
        <CDropdownItem to="/personnels/affectation" className="d-block">
          <div className="small mb-1">
            <FontAwesomeIcon className="mr-2" icon={faBuilding} />
            Mettre à jour les affectations.
          </div>
        </CDropdownItem>
        <CDropdownItem to="/personnels/nomination" className="d-block">
          <div className="small mb-1">
            <FontAwesomeIcon className="mr-2" icon={faUserTie} />
            Mettre à jour les nominations.
          </div>
        </CDropdownItem>
        <CDropdownItem to="/personnels/matricules" className="d-block">
          <div className="small mb-1">
            <FontAwesomeIcon className="mr-2" icon={faUserCheck} />
            Mettre à jour les matricules du personnel .
          </div>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownTasks;
