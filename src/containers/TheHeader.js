import CIcon from "@coreui/icons-react";
import {
  CBreadcrumbRouter,
  CButton,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CToggler,
} from "@coreui/react";
import {
  faCog,
  faFileAlt,
  faHome,
  faProjectDiagram,
  faSearch,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CanLevelThree from "../RBAC/CanLevelThree";
import { logout } from "../actions/authActions";
import { SET_NAV_HIDDEN, SET_NAV_SHOW } from "../actions/types";
import { AUDIO_USER_CONNECT } from "../config";
// routes config
import routes from "../routes";
import TheHeaderDropdownMssg from "./TheHeaderDropdownMssg";
import TheHeaderDropdownTasks from "./TheHeaderDropdownTasks";
import TheHeaderDropdownUser from "./TheHeaderDropdownUser";
import { TheHeaderDropdown } from "./index";

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sideBarState.sidebarShow);

  // const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  // useEffect(() => {
  //   playing ? audio.play() : audio.pause();
  // }, [playing]);

  const toggleSidebar = () => {
    sidebarShow
      ? dispatch({ type: SET_NAV_HIDDEN })
      : dispatch({ type: SET_NAV_SHOW });
  };

  const toggleSidebarMobile = () => {
    sidebarShow
      ? dispatch({ type: SET_NAV_HIDDEN })
      : dispatch({ type: SET_NAV_SHOW });
  };

  const { logout, profile } = props;

  let history = useHistory();

  // const playSound = () => {
  //   const audio = new Audio(audio);
  //   console.log(audio);
  //   audio.play();
  // };

  return (
    <CHeader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo-minader" height="48" alt="Logo minader" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/acceuil">
            <FontAwesomeIcon className="mr-2" icon={faHome} />
            Tableau de Bord
          </CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CanLevelThree
            role={profile.roles[0]}
            yes={() => (
              <CHeaderNavLink to="/parametres">
                <FontAwesomeIcon className="mr-2" icon={faUserCog} />
                Paramètres
              </CHeaderNavLink>
            )}
            no={() => ""}
          />
        </CHeaderNavItem>
        <CanLevelThree
          role={profile.roles[0]}
          yes={() => (
            <CHeaderNavItem className="px-3">
              <CHeaderNavLink to="/configuration">
                <FontAwesomeIcon className="mr-2" icon={faCog} />
                Configuration
              </CHeaderNavLink>
            </CHeaderNavItem>
          )}
          no={() => ""}
        />
        <CHeaderNavLink to="/manuel">
          <FontAwesomeIcon className="mr-2" icon={faFileAlt} />
          Manuel d'Utilisation
        </CHeaderNavLink>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownTasks />
        {/* <TheHeaderDropdownMssg /> */}
        <TheHeaderDropdownUser />
        <TheHeaderDropdown
          logout={logout}
          profile={profile}
          history={history}
        />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

const mapStateToProps = ({ userState }) => ({
  profile: userState.profile,
});

export default connect(mapStateToProps, { logout })(TheHeader);
