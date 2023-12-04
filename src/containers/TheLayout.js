import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorBanner from "../common/ErrorBanner";
import navArchives from "./_navArchives";
import navConfiguration from "./_navConfig";
import navCourrier from "./_navCourrier";
import navDeveloppement from "./_navDeveloppement";
import navManuel from "./_navManuel";
import navOrgannigramme from "./_navOrgannigramme";
import navParametres from "./_navParametres";
import navPersonnel from "./_navPersonnel.js";
import navProjets from "./_navProjets";
import navSolde from "./_navSolde.js";
import navStation from "./_navStation";
import navStatistique from "./_navStatistique";
import { TheContent, TheFooter, TheHeader, TheSidebar } from "./index";

const TheLayout = () => {
  const [navigation, setNavigation] = useState([]);
  let location = useLocation();
  const { pathname } = location;

  const showSidebar = (pathname) => {
    if (pathname === "/") {
      return;
    } else if (pathname === "/acceuil" || pathname.includes("/messages")) {
      return;
    } else {
      return <TheSidebar navigation={navigation} />;
    }
  };

  const setNavigationData = (path) => {
    const routeName = path.split("/")[1];

    switch (routeName) {
      case "personnels":
        setNavigation(navPersonnel);
        break;
      case "solde":
        setNavigation(navSolde);
        break;
      case "statistiques":
        setNavigation(navStatistique);
        break;
      case "stations":
      case "postes":
        setNavigation(navStation);
        break;
      case "parametres":
        setNavigation(navParametres);
        break;
      case "projets":
        setNavigation(navProjets);
        break;
      case "organnigramme":
        setNavigation(navOrgannigramme);
        break;
      case "archives":
        setNavigation(navArchives);
        break;
      case "courrier":
        setNavigation(navCourrier);
        break;
      case "developpement":
        setNavigation(navDeveloppement);
        break;
      case "configuration":
        setNavigation(navConfiguration);
        break;
      case "manuel":
        setNavigation(navManuel);
        break;
      default:
        return navigation;
    }
  };

  useEffect(() => {
    setNavigationData(pathname);
  }, [pathname, setNavigationData]);

  return (
    <div className="c-app c-default-layout">
      {showSidebar(pathname)}
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <ErrorBanner />
          <TheContent />
        </div>
        <TheFooter />
      </div>
      {/* <a href="#" className="float">
        <i className="fa fa-plus my-float"></i>
      </a> */}
    </div>
  );
};

export default React.memo(TheLayout);
