import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarMinimizer,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarNavTitle,
} from "@coreui/react";
import React from "react";
import { useSelector } from "react-redux";

// sidebar nav config
// import navigation from "./_nav";

const TheSidebar = (props) => {
  // const dispatch = useDispatch();
  const show = useSelector((state) => state.sideBarState.sidebarShow);

  // const showHandler = (val) => {
  //   dispatch({ type: "set_nav", sidebarShow: val });
  // };

  return (
    <CSidebar
      colorScheme="white"
      className="c-sidebar-overlaid"
      size="lg"
      show={show}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <div className="c-sidebar-brand-full text-center">
          <img src="icons/helios.jpg" alt="logo" className="logo" />

          <h6>HELIOS</h6>
        </div>
        <div className="c-sidebar-brand-minimized text-center">
          <h5>HELIOS</h5>
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={props.navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
