import React from "react";
import CreateStructure from "./components/structures/CreateStructure";
import FirstDash from "./containers/FirstDash";
import Search from "./containers/Search";
import TheLayoutPersonnel from "./containers/TheLayoutPersonnel";

const CreerDecision = React.lazy(() =>
  import("./components/decisions/CreerDecision")
);
const ProjetDetail = React.lazy(() =>
  import("./components/decisions/ProjetDetail")
);

const CourrierAjouter = React.lazy(() =>
  import("./components/mail/CourrierAjouter")
);

const MessageList = React.lazy(() =>
  import("./components/messages/MessageLists")
);

const TheLayoutMail = React.lazy(() => import("./containers/TheLayoutMail"));

const StatistiquesCorps = React.lazy(() =>
  import("./components/statistiques/StatistiquesCorps")
);

const AjouterStage = React.lazy(() =>
  import("./components/developpement/AjouterStage")
);

const PersonnelStageActif = React.lazy(() =>
  import("./components/developpement/PersonnelStageActif")
);

const Personnel25000 = React.lazy(() =>
  import("./components/personnels/Personnel25000")
);
const Structures = React.lazy(() =>
  import("./components/structures/Structures")
);

const CerficatPersonnel = React.lazy(() =>
  import("./components/personnels/CertificatPersonnel")
);

const EditPosition = React.lazy(() =>
  import("./components/personnels/EditPosition")
);

const PersonnelStageDetail = React.lazy(() =>
  import("./components/developpement/PersonnelStageDetail")
);

const DomaineOptionDetails = React.lazy(() =>
  import("./components/configuration/DomaineOptionDetails")
);
const ImpressionRapide = React.lazy(() =>
  import("./components/personnels/ImpressionRapide")
);

const CongePersonnel = React.lazy(() =>
  import("./components/personnels/CongePersonnel")
);

const ProfilUtilisateur = React.lazy(() =>
  import("./common/ProfilUtilisateur")
);

const Manuel = React.lazy(() => import("./components/Manuel/Manuel"));

const StructuresList = React.lazy(() =>
  import("./components/configuration/StructuresList")
);

const EditPoste = React.lazy(() => import("./components/postes/EditPoste"));

const PosteDetail = React.lazy(() => import("./components/postes/PosteDetail"));

const NatureStructure = React.lazy(() =>
  import("./components/structures/NatureStructure")
);

const EditProfile = React.lazy(() =>
  import("./components/personnels/edit/EditProfile")
);

const AllPostes = React.lazy(() => import("./components/postes/AllPostes"));

const Organnigramme = React.lazy(() => import("./common/Organnigramme"));

const AffectationUpdate = React.lazy(() =>
  import("./components/structures/AffectationUpdate")
);

const ListPoste = React.lazy(() => import("./components/postes/ListPoste"));

const Toaster = React.lazy(() =>
  import("./views/notifications/toaster/Toaster")
);
const Tables = React.lazy(() => import("./views/base/tables/Tables"));

const Breadcrumbs = React.lazy(() =>
  import("./views/base/breadcrumbs/Breadcrumbs")
);
const Cards = React.lazy(() => import("./views/base/cards/Cards"));
const Carousels = React.lazy(() => import("./views/base/carousels/Carousels"));
const Collapses = React.lazy(() => import("./views/base/collapses/Collapses"));
const BasicForms = React.lazy(() => import("./views/base/forms/BasicForms"));

const Jumbotrons = React.lazy(() =>
  import("./views/base/jumbotrons/Jumbotrons")
);
const ListGroups = React.lazy(() =>
  import("./views/base/list-groups/ListGroups")
);
const Navbars = React.lazy(() => import("./views/base/navbars/Navbars"));
const Navs = React.lazy(() => import("./views/base/navs/Navs"));
const Paginations = React.lazy(() =>
  import("./views/base/paginations/Pagnations")
);
const Popovers = React.lazy(() => import("./views/base/popovers/Popovers"));
const ProgressBar = React.lazy(() =>
  import("./views/base/progress-bar/ProgressBar")
);
const Switches = React.lazy(() => import("./views/base/switches/Switches"));

const Tabs = React.lazy(() => import("./views/base/tabs/Tabs"));
const Tooltips = React.lazy(() => import("./views/base/tooltips/Tooltips"));
const BrandButtons = React.lazy(() =>
  import("./views/buttons/brand-buttons/BrandButtons")
);
const ButtonDropdowns = React.lazy(() =>
  import("./views/buttons/button-dropdowns/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() =>
  import("./views/buttons/button-groups/ButtonGroups")
);
const Buttons = React.lazy(() => import("./views/buttons/buttons/Buttons"));
const Charts = React.lazy(() => import("./views/charts/Charts"));
const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() =>
  import("./views/icons/coreui-icons/CoreUIIcons")
);
const Flags = React.lazy(() => import("./views/icons/flags/Flags"));
const Brands = React.lazy(() => import("./views/icons/brands/Brands"));
const Alerts = React.lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = React.lazy(() => import("./views/notifications/badges/Badges"));
const Modals = React.lazy(() => import("./views/notifications/modals/Modals"));
const Colors = React.lazy(() => import("./views/theme/colors/Colors"));
const Typography = React.lazy(() =>
  import("./views/theme/typography/Typography")
);
const Widgets = React.lazy(() => import("./views/widgets/Widgets"));
const Users = React.lazy(() => import("./views/users/Users"));
const User = React.lazy(() => import("./views/users/User"));

// add front end components
const Personnel = React.lazy(() =>
  import("./components/personnels/Personnels")
);
const PersonnelActifs = React.lazy(() =>
  import("./components/personnels/PersonnelActif")
);

const PersonnelAll = React.lazy(() =>
  import("./components/personnels/PersonnelAll")
);
const PersonnelDetail = React.lazy(() =>
  import("./components/personnels/PersonnelDetail")
);

const PersonnelArchive = React.lazy(() =>
  import("./components/personnels/PersonnelArchive")
);

const Retraites = React.lazy(() =>
  import("./components/retraites/Retraites.js")
);

const PersonnelPosition = React.lazy(() =>
  import("./components/personnels/PersonnelPosition")
);
const PersonnelSolde = React.lazy(() =>
  import("./components/solde/PersonnelSolde")
);

const PersonnelStage = React.lazy(() =>
  import("./components/developpement/PersonnelStage")
);

const PersonnelIntegration = React.lazy(() =>
  import("./components/solde/PersonnelIntegration")
);

const PersonnelSocle = React.lazy(() =>
  import("./components/solde/PersonnelSocle")
);

const MAJMatricule = React.lazy(() =>
  import("./components/solde/MAJMatricule")
);

const CreerPersonnel = React.lazy(() =>
  import("./components/personnels/CreerPersonnel")
);

const Statistiques = React.lazy(() =>
  import("./components/statistiques/Statisiques")
);

const Classification = React.lazy(() =>
  import("./components/statistiques/Classification")
);

const StructureDetail = React.lazy(() =>
  import("./components/structures/StructureDetail")
);
const DecisionConges = React.lazy(() =>
  import("./components/structures/DecisionConges")
);

const CreerStructure = React.lazy(() =>
  import("./components/structures/CreateStructure")
);

const Profile = React.lazy(() => import("./components/profil/Profile"));

const Parametres = React.lazy(() =>
  import("./components/parametres/Parametres")
);

const Utilisateurs = React.lazy(() =>
  import("./components/parametres/Utilisateurs")
);
const Scopes = React.lazy(() => import("./components/parametres/Scopes"));
const Roles = React.lazy(() => import("./components/parametres/Roles"));

const PersonnelGradeCorps = React.lazy(() =>
  import("./components/personnels/PersonnelGradeCorps")
);

const CreerArchive = React.lazy(() =>
  import("./components/archivesModule/CreerArchive")
);

const Actes = React.lazy(() => import("./components/archivesModule/Actes"));

const ActeDetails = React.lazy(() =>
  import("./components/archivesModule/ActeDetails")
);

const ArchivePersonnel = React.lazy(() =>
  import("./components/archivesModule/ArchivePersonnel")
);

const NominationUpdate = React.lazy(() =>
  import("./components/postes/NominationUpdate")
);

const Configuration = React.lazy(() =>
  import("./components/configuration/Configuration")
);

const ConfigurationCategorie = React.lazy(() =>
  import("./components/configuration/ConfigurationCategorie")
);

const ConfigurationDomaineOption = React.lazy(() =>
  import("./components/configuration/ConfigurationDomaineOption")
);

const PersonnelRegion = React.lazy(() =>
  import("./components/personnels/PersonnelParRegion")
);

const Croisement = React.lazy(() => import("./components/solde/Croisement"));

const DecisionList = React.lazy(() =>
  import("./components/decisions/DecisionsList")
);

// const TheContentMenu = React.lazy(() =>
//   import("./containers/TheContentMenu")
// )

// const routes = [
//   { path: "/", exact: true, name: "Acceuil"},
//   { path: "/dashboard", name: "Tableau de Bord", component: Dashboard },
//   { path: "/theme", name: "Theme", component: Colors, exact: true },
//   { path: "/theme/colors", name: "Colors", component: Colors },
//   { path: "/theme/typography", name: "Typography", component: Typography },
//   { path: "/base", name: "Base", component: Cards, exact: true },
//   { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
//   { path: "/base/cards", name: "Cards", component: Cards },
//   { path: "/base/carousels", name: "Carousel", component: Carousels },
//   { path: "/base/collapses", name: "Collapse", component: Collapses },
//   { path: "/base/forms", name: "Forms", component: BasicForms },
//   { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
//   { path: "/base/list-groups", name: "List Groups", component: ListGroups },
//   { path: "/base/navbars", name: "Navbars", component: Navbars },
//   { path: "/base/navs", name: "Navs", component: Navs },
//   { path: "/base/paginations", name: "Paginations", component: Paginations },
//   { path: "/base/popovers", name: "Popovers", component: Popovers },
//   { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
//   { path: "/base/switches", name: "Switches", component: Switches },
//   { path: "/base/tables", name: "Tables", component: Tables },
//   { path: "/base/tabs", name: "Tabs", component: Tabs },
//   { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
//   { path: "/buttons", name: "Buttons", component: Buttons, exact: true },
//   { path: "/buttons/buttons", name: "Buttons", component: Buttons },
//   {
//     path: "/buttons/button-dropdowns",
//     name: "Dropdowns",
//     component: ButtonDropdowns,
//   },
//   {
//     path: "/buttons/button-groups",
//     name: "Button Groups",
//     component: ButtonGroups,
//   },
//   {
//     path: "/buttons/brand-buttons",
//     name: "Brand Buttons",
//     component: BrandButtons,
//   },
//   { path: "/charts", name: "Charts", component: Charts },
//   { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
//   { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
//   { path: "/icons/flags", name: "Flags", component: Flags },
//   { path: "/icons/brands", name: "Brands", component: Brands },
//   {
//   path: "/notifications",
//   name: "Notifications",
//   component: Alerts,
//   exact: true,
// },
//   { path: "/notifications/alerts", name: "Alerts", component: Alerts },
//   { path: "/notifications/badges", name: "Badges", component: Badges },
//   { path: "/notifications/modals", name: "Modals", component: Modals },
//   { path: "/notifications/toaster", name: "Toaster", component: Toaster },
//   { path: "/widgets", name: "Widgets", component: Widgets },
//   { path: "/users", exact: true, name: "Users", component: Users },
//   { path: "/users/:id", exact: true, name: "User Details", component: User },

//   {
//     path: "/personnels",
//     name: "personnels",
//     component: PersonnelAll,
//     exact: true,
//   },

//   {
//     path: "/personnels/actif",
//     name: "Personnels en Activité",
//     component: PersonnelActifs,
//   },

//   {
//     path: "/personnels/fonctionnaires",
//     name: "Personnels Fonctionnaires",
//     component: PersonnelFonctionnaire,
//   },
//   {
//     path: "/personnels/contractuels",
//     name: "Personnels Contractuels",
//     component: PersonnelContractuel,
//   },
//   {
//     path: "/personnels/decisionnaires",
//     name: "Personnels Decisionnaires",
//     component: PersonnelDecisionnnaire,
//   },
//   {
//     path: "/personnels/retraites",
//     name: "Personnels En retraite",
//     component: Retraites,
//   },
//   {
//     path: "/personnels/details/:matricule",
//     name: "Personnel informations",
//     component: PersonnelDetail,
//   },
//   {
//     path: "/personnels/archives/:matricule",
//     name: `Personnels Archives/:matricule`,
//     component: PersonnelArchive,
//   },
// ];

const routes = [
  { path: "/", exact: true, name: "Acceuil", component: FirstDash },
  {
    path: "/acceuil",
    exact: true,
    name: "Tableau de Bord",
    component: FirstDash,
  },
  {
    path: "/organnigramme/:structure",
    name: "Organnigramme",
    component: Organnigramme,
  },
  {
    path: "/personnels",
    name: "personnels",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/personnels/creer",
    name: "Creer personnels",
    component: CreerPersonnel,
  },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },

  {
    path: "/personnels/position",
    name: "Personnel par position",
    component: PersonnelPosition,
    exact: true,
  },
  // { path: "/charts", name: "Charts", component: Charts },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   component: Alerts,
  //   exact: true,
  // },

  {
    path: "/personnels/position/modifier",
    name: "Modification des positions",
    component: EditPosition,
    exact: true,
  },

  {
    path: "/personnels/actif",
    name: "Personnels en Activité",
    component: PersonnelActifs,
  },

  {
    path: "/personnels/decision",
    name: "Decision des personnels",
    component: DecisionList,
    exact: true,
  },
  {
    path: "/personnels/decision/creer",
    name: "Creer une decision",
    component: CreerDecision,
  },
  {
    path: "/personnels/decision/:idProjet",
    name: "Details de projet",
    component: ProjetDetail,
    exact: true,
  },

  {
    path: "/personnels/jeunes25000",
    name: "25000 Jeunes",
    component: Personnel25000,
  },

  {
    path: "/personnels/grades",
    name: "Personnels par grade",
    component: PersonnelGradeCorps,
  },
  {
    path: "/personnels/retraites",
    name: "Personnels en retraite",
    component: Retraites,
  },
  // {
  //   path: "/personnels/region",
  //   name: "Personnels par region",
  //   component: PersonnelRegion,
  // },
  {
    path: "/personnels/affectation",
    name: "Mouvements Affectation",
    component: AffectationUpdate,
  },

  {
    path: "/personnels/nomination",
    name: "Mouvement de Nomination",
    component: NominationUpdate,
  },

  {
    path: "/personnels/matricules",
    name: "Mise a jour des matricules",
    component: MAJMatricule,
  },

  {
    path: "/personnels/impression",
    name: "Impression Rapide du personnel",
    component: ImpressionRapide,
  },

  {
    path: "/personnels/certificat",
    name: "Certificat Collectif ",
    component: CerficatPersonnel,
  },

  {
    path: "/personnels/:matricule/modifier",
    name: "Archives du personnels",
    component: EditProfile,
  },

  {
    path: "/personnels/conges/:matricule",
    name: "Conge du personnnel",
    component: CongePersonnel,
  },
  {
    path: "/personnels/:matricule/archives",
    name: "Archives du personnels",
    component: PersonnelArchive,
  },

  {
    path: "/archives/:matricule/archives",
    name: "Archives du personnels",
    component: PersonnelArchive,
  },

  {
    path: "/personnels/:matricule",
    name: "Personnel informations",
    component: PersonnelDetail,
  },

  {
    path: "/developpement",
    name: "Stages et Formations",
    component: PersonnelStage,
    exact: true,
  },

  {
    path: "/developpement/ajouter",
    name: "Mettre un personnel en Stage | Formatioms",
    component: AjouterStage,
  },
  {
    path: "/developpement/en_stage/:idStage",
    name: "Personnel Stage",
    component: PersonnelStageDetail,
  },
  {
    path: "/developpement/en_stage",
    name: "Tout le Personnel en Stage",
    component: PersonnelStageActif,
  },

  {
    path: "/solde",
    name: "Solde et Pension",
    component: PersonnelSolde,
    exact: true,
  },
  {
    path: "/solde/socle",
    name: "Elements de Socle",
    component: PersonnelSocle,
  },

  {
    path: "/solde/croisement",
    name: "Croisement RH Solde",
    component: Croisement,
  },

  {
    path: "/solde/matricules",
    name: "Mise a jour des matricules",
    component: MAJMatricule,
  },
  {
    path: "/solde/integration",
    name: "Personnel en cours d'integration",
    component: PersonnelIntegration,
  },
  {
    path: "/solde/details/:matricule",
    name: "Elements de Socle",
    component: PersonnelDetail,
  },
  {
    path: "/stations",
    name: "stations",
    component: Structures,
    exact: true,
  },

  {
    path: "/structures/natures",
    name: "Stations par RMIA",
    component: NatureStructure,
    exact: true,
  },
  {
    path: "/structures/affectation",
    name: "Affectation du personnel",
    component: AffectationUpdate,
  },

  {
    path: "/structures/nomination",
    name: "Nomination du personnel",
    component: NominationUpdate,
  },

  {
    path: "/structures/creer",
    name: "Creer une structure",
    component: CreerStructure,
  },
  {
    path: "/structures/:idStructure/decision-conges",
    name: "Decision de congés",
    component: DecisionConges,
    exact: true,
  },

  {
    path: "/structures/:idStructure",
    name: "Details structure",
    component: StructureDetail,
    exact: true,
  },

  {
    path: "/responsables",
    name: "Listes des responsables",
    component: ListPoste,
    exact: true,
  },
  {
    path: "/postes/details/:idPoste/modifier",
    name: "Modifier le poste",
    component: EditPoste,
  },

  {
    path: "/postes/details/:idPoste",
    name: "Postes details",
    component: PosteDetail,
  },

  {
    path: "/postes",
    name: "Tout les postes",
    component: AllPostes,
    exact: true,
  },

  {
    path: "/statistiques",
    name: "Statistiques",
    exact: true,
    component: Classification,
  },

  // {
  //   path: "/statistiques/chiffres",
  //   name: "Statistiques du personnels",
  //   component: Charts,
  // },

  // {
  //   path: "/statistiques/corps",
  //   name: "Statistiques par corps",
  //   component: StatistiquesCorps,
  // },

  {
    exact: true,
    path: "/archives",
    name: "Arhives Ressources Humaines",
    component: ArchivePersonnel,
  },
  {
    path: "/archives/actes/:idActe",
    name: "Details de l'acte",
    component: ActeDetails,
  },
  {
    path: "/archives/actes",
    name: "Listes des actes",
    component: Actes,
  },

  {
    path: "/archives/creer",
    name: "Creer une archive",
    component: CreerArchive,
  },

  {
    path: "/projets",
    name: "projets et Programmes",
    component: TheLayoutPersonnel,
  },
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
    name: "Courrier Ajouter",
    component: CourrierAjouter,
  },
  {
    path: "/courrier/depart",
    name: "Courrier Départ",
    component: TheLayoutPersonnel,
  },
  {
    path: "/courrier/recherche",
    name: "Recherchez un courrier",
    component: TheLayoutPersonnel,
  },
  {
    path: "/courrier/tache",
    name: "Taches non Soldée",
    component: TheLayoutPersonnel,
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Alerts,
    exact: true,
  },

  {
    path: "/compte",
    name: "Votre compte",
    component: Profile,
  },
  {
    path: "/parametres",
    name: "Parametrès",
    component: Parametres,
    exact: true,
  },

  {
    path: "/parametres/utilisateurs/:idUser",
    name: "Details Utilisateurs",
    exact: true,
    params: false,
    component: ProfilUtilisateur,
  },
  {
    path: "/parametres/utilisateurs",
    name: "Listes des utilisateurs",
    component: Utilisateurs,
  },

  {
    path: "/parametres/utilisateurs/creer",
    exact: true,
    name: "Creer un nouvel Utilisateur",
    component: ProfilUtilisateur,
  },
  {
    path: "/parametres/roles",
    name: "Roles",
    component: Roles,
  },
  {
    path: "/parametres/scopes",
    name: "Scopes",
    component: Scopes,
  },

  {
    path: "/configuration",
    name: "Configuration",
    component: Configuration,
    exact: true,
  },
  {
    path: "/configuration/categories",
    name: "Categories et age de Retraites",
    component: ConfigurationCategorie,
  },
  {
    path: "/configuration/structures",
    name: "Structures",
    component: StructuresList,
    exact: true,
  },
  {
    path: "/configuration/structures/creer",
    name: "Creer une Structure",
    component: CreateStructure,
  },

  {
    path: "/configuration/domaines_options/:idDomaine",
    name: "Details du domaines",
    component: DomaineOptionDetails,
  },

  {
    path: "/configuration/domaines_options",
    name: "Domaines et Options du personnels",
    component: ConfigurationDomaineOption,
  },

  {
    path: "/manuel",
    name: "Manuel d'Utilisation",
    component: Manuel,
    exact: true,
  },

  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/notifications/toaster", name: "Toaster", component: Toaster },
  { path: "/widgets", name: "Widgets", component: Widgets },

  {
    path: "/messages",
    name: "Messages",
    component: MessageList,
    exact: true,
  },

  {
    path: "/messages/:id",
    name: "Messages",
    component: MessageList,
  },
];

export default routes;
