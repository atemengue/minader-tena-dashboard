import CIcon from "@coreui/icons-react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import React from "react";
import { BUCKET_URL } from "../config";

const TheHeaderDropdown = ({ logout, profile, history }) => {
  const close = () => {
    logout();
    history.push("/");
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="d-flex align-items-center">
          {/* <span className="mr-3">{`${profile.noms} ${profile.prenoms}`}</span> */}
          <div className="c-avatar">
            <CImg
              src={
                profile.photo
                  ? `${BUCKET_URL}/users/${profile.userIdArchive}/${profile.photo}`
                  : `${BUCKET_URL}/default/user.png`
              }
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" className="text-center">
          <strong className="mr-3">{`${profile.noms} ${profile.prenoms}`}</strong>
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Paramètres</strong>
        </CDropdownItem>
        <CDropdownItem to="/compte">
          <CIcon name="cil-user" className="mfe-2" />
          Votre compte
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={close}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Déconnexion
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
