export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Stations Helios"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Stations",
    to: "/stations",
    fontIcon: "fas fa-home",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Structure par RMIA",
    to: "/structures/natures",
    fontIcon: "fas fa-hotel",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Postes"],
  },
  {
    _tag: "CSidebarNav",
    name: "Postes",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Postes de reponsabilites",
    fontIcon: "fas fa-id-card",
    to: "/responsables",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Tout les postes",
    fontIcon: "fas fa-user-tie",
    to: "/postes",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Mouvements "],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Affectation",
    fontIcon: "fas fa-building",
    to: "/structures/affectation",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Nomination",
    fontIcon: "fas fa-user-tie",
    to: "/structures/nomination",
  },
];
