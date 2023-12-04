export default [
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Application"],
  // },

  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Soft Archives ",
  //   to: "/application",
  //   fontIcon: "fas fa-archive",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Archives"],
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Archives du personnels",
  //   to: "/archives",
  //   fontIcon: "fas fa-user-tag",
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Archives du personnels",
    to: "/archives",
    fontIcon: "fas fa-archive",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Archives des actes",
    to: "/archives/actes",
    fontIcon: "fas fa-archive",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Creation"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Archivez un documents",
    to: "/archives/creer",
    fontIcon: "fas fa-file-archive",
  },
];
