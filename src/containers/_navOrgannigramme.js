export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Sécrétariat Général"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Administration Centrale",
    to: "/organnigramme/ac",
    fontIcon: "fas fa-home",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sécrétariat Général",
    to: "/organnigramme/sg",
    fontIcon: "fas fa-home",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Archives et Documentations",
    to: "/organnigramme/sda",
    fontIcon: "fas fa-home",
  },
  {
    _tag: "CSidebarNavItem",
    name: "SDACL",
    to: "/organnigramme/sdacl",
    fontIcon: "fas fa-home",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Direction"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Listes des Direction",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "1-DRH",
        to: "/organnigramme/drh",
      },
      {
        _tag: "CSidebarNavItem",
        name: "2-DGRACV",
        to: "/organnigramme/dgracv",
      },
      {
        _tag: "CSidebarNavItem",
        name: "3-DDA",
        to: "/organnigramme/dda",
      },

      {
        _tag: "CSidebarNavItem",
        name: "4-DOPA",
        to: "/organnigramme/dopa",
      },
      {
        _tag: "CSidebarNavItem",
        name: "5-DRCQ",
        to: "/organnigramme/drcq",
      },
      {
        _tag: "CSidebarNavItem",
        name: "6-DDLC",
        to: "/organnigramme/ddlc",
      },
      {
        _tag: "CSidebarNavItem",
        name: "7-DEPC",
        to: "/organnigramme/depc",
      },
      {
        _tag: "CSidebarNavItem",
        name: "8-DEFACC",
        to: "/organnigramme/defacc",
      },
      {
        _tag: "CSidebarNavItem",
        name: "9-DESA",
        to: "/organnigramme/desa",
      },
      {
        _tag: "CSidebarNavItem",
        name: "10-DRFP",
        to: "/organnigramme/drfp",
      },
      {
        _tag: "CSidebarNavItem",
        name: "11-DAJ",
        to: "/organnigramme/daj",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Cellules"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Listes des des cellules",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "CELLSUIVIE",
        to: "/organnigramme/suivie",
      },
      {
        _tag: "CSidebarNavItem",
        name: "CELLCOM",
        to: "/organnigramme/cellcom",
      },
      {
        _tag: "CSidebarNavItem",
        name: "CELLTRAD",
        to: "/organnigramme/celltra",
      },
      {
        _tag: "CSidebarNavItem",
        name: "CELLINFO",
        to: "/organnigramme/cellinfo",
      },
    ],
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Services deconcentrés"],
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Listes des Déléguations ",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "DRADER (Régionale)",
        to: "/organnigramme/drader",
      },
      {
        _tag: "CSidebarNavItem",
        name: "DDADER (Departementale)",
        to: "/organnigramme/ddader",
      },
      {
        _tag: "CSidebarNavItem",
        name: "DAADER (Arrondissement)",
        to: "/organnigramme/daader",
      },
    ],
  },
];
