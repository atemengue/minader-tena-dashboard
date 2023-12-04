import React from "react";

import TheLayoutPersonnel from "../containers/TheLayoutPersonnel";

const TheLayoutMail = React.lazy(() => import("../containers/TheLayoutMail"));

const AjouterCourrier = React.lazy(() =>
  import("../components/mail/CourrierAjouter")
);

export const mailRoutes = () => {
  return [
    {
      path: "/courrier",
      name: "Courrier DRH",
      component: TheLayoutMail,
      exact: true,
    },
    {
      path: "/courrier/arrive",
      name: "Courrier Arrivée",
      component: TheLayoutPersonnel,
    },
    {
      path: "/courrier/ajouter",
      name: "Ajouter un courrier",
      component: AjouterCourrier,
    },
  ];
};
