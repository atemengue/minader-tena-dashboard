export default [
  {
    _tag: "CSidebarNavItem",
    name: "Tableau de Bord",
    to: "/personnels",
    show: false,
    fontIcon: "fas fa-home",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Creer un personnel",
    to: "/personnels/creer",
    fontIcon: "fas fa-user-plus",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Personnels"],
    show: false,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "personnels",
    route: "/personnels",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "En Activite",
        to: "/personnels/actif",
        fontIcon: "fas fa-user-check",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Position",
        to: "/personnels/position",
        fontIcon: "fas fa-user-tag",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Retraites",
        to: "/personnels/retraites",
        fontIcon: "fas fa-user-alt-slash",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Grades et Corps",
        to: "/personnels/grades",
        fontIcon: "fas fa-user-graduate",
      },
      {
        _tag: "CSidebarNavItem",
        name: "25000 JEUNES",
        to: "/personnels/jeunes25000",
        fontIcon: "fas fa-user-graduate",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Mouvements"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "MAJ Affectation",
    to: "/personnels/affectation",
    fontIcon: "fas fa-building",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Nomination",
    fontIcon: "fas fa-user-tie",
    to: "/personnels/nomination",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Listes des decisions",
  //   fontIcon: "fas fa-user-tie",
  //   to: "/personnels/decision",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Impréssion"],
  },
  ,
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Certificat Collectif",
  //   fontIcon: "fas fa-certificate",
  //   to: "/personnels/certificat",
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Impression Rapide",
    fontIcon: "fas fa-file-pdf",
    to: "/personnels/impression",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Mise a jours Matricule",
    fontIcon: "fas fa-user-tie",
    to: "/personnels/matricules",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Décision"],
  },
];
