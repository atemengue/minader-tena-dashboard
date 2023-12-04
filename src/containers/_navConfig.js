export default [
  {
    _tag: "CSidebarNavItem",
    name: "Configuration",
    to: "/configuration",
    icon: "cil-settings",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Categories",
    to: "/configuration/categories",
    icon: "fas fa-user-tag",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Creation"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Structures",
    to: "/configuration/structures",
    fontIcon: "fas fa-house-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Domaines et Options du personnels",
    to: "/configuration/domaines_options",
    fontIcon: "fas fa-graduation-cap",
  },
];
