import * as moment from "moment";

export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function setRow(row, column) {
  if (row[column] === undefined) {
    return "";
  }
  if (row[column] !== null) {
    return row[column].toString();
  }
  return "";
}
// adapter la function au type de format
function buildTableBody(data, columns) {
  // Optimiser la function pour des cas particuliers switch
  var body = [];

  body.push(columns);

  data.map(function (row, index) {
    var dataRow = [];
    row["N°"] = index + 1;

    let nomsPrenoms = row !== null ? row.nomsPrenoms : "";
    row["Noms & Premons"] = nomsPrenoms;

    let dateNaissance = row !== null ? row.dateNaissance : "";
    row["date de Naissance"] = dateNaissance;

    let Categorie = row !== null ? row.categorieIdCategorie : "";
    row["Categorie"] = Categorie;

    let grade = row.grade !== null ? row.grade.libelleGrade : " ";
    row["Grade"] = grade;

    let structure =
      row.structure !== null ? row.structure?.designationAdministrative : "";
    row["Structure"] = structure;

    let telephones = row?.telephones !== null ? row.telephones : "";
    row["Telephones"] = telephones;

    // let poste = row.personnel !== null ? row.personnel.postes : "";
    // row["poste"] = poste;

    columns.map(function (column, index) {
      dataRow.push({
        text: setRow(row, column),
        alignment: "left",
      });
    });
    body.push(dataRow);
  });

  return body;
}

function buildTableBodyPersonnel(data, columns) {
  var body = [];
  body.push(columns);

  data.map(function (row, index) {
    var dataRow = [];
    row["N°"] = index + 1;

    let nomsPrenoms = row !== null ? row.nomsPrenoms : "";
    row["Noms & Premons"] = nomsPrenoms;

    let dateNaissance = row !== null ? row.dateNaissance : "";
    row["date de Naissance"] = dateNaissance;

    let Categorie = row !== null ? row.categorieIdCategorie : "";
    row["Categorie"] = Categorie;

    let grade = row.grade !== null ? row.grade.libelleGrade : " ";
    row["Grade"] = grade;

    let poste =
      row.postes !== null && row.postes.length >= 1
        ? row.postes[0].libellePoste
        : " ";
    row["Poste"] = poste;

    let structure = row.structure === undefined ? row.administration : "";

    row["Structure"] = structure;

    let telephones = row.telephones !== null ? row.telephones : "";
    row["Telephones"] = telephones;

    // let poste = row.personnel !== null ? row.personnel.postes : "";
    // row["poste"] = poste;

    columns.map(function (column, index) {
      dataRow.push({
        text: setRow(row, column),
        alignment: "left",
      });
    });
    body.push(dataRow);
  });

  return body;
}

function buildTableCertificat(data, columns) {
  var body = [];
  body.push(columns);

  data.map(function (row, index) {
    var dataRow = [];
    row["N°"] = index + 1;

    let nomsPrenoms = row !== null ? row.nomsPrenoms : "";
    row["Noms & Prenoms"] = nomsPrenoms;
    let matricule = row !== null ? row.matricule : "";
    row["Matricule"] = matricule;

    let dateNaissance = row !== null ? row.dateNaissance : "";
    row["Date de Naissance"] = dateNaissance;

    let lieuNaissance = row !== null ? row.lieuNaissance : "";
    row["Lieu de Naissance"] = lieuNaissance;

    let grade = row.grade !== null ? row.grade.libelleGrade : " ";
    row["Grade"] = grade;

    columns.map(function (column, index) {
      dataRow.push({
        text: setRow(row, column),
        alignment: "left",
      });
    });
    body.push(dataRow);
  });

  return body;
}

function buildTableRapidExportPostes(data, columns) {
  var body = [];
  body.push(columns);

  data.map(function (row, index) {
    var dataRow = [];
    row["N°"] = index + 1;

    let nomsPrenoms = row !== null ? row.nomsPrenoms : "";
    row["Noms & Prenoms"] = nomsPrenoms;
    let matricule = row !== null ? row.matricule : "";
    row["Matricule"] = matricule;

    let dateNaissance = row !== null ? row.dateNaissance : "";
    row["Date de Naissance"] = dateNaissance;

    let lieuNaissance = row !== null ? row.lieuNaissance : "";
    row["Lieu de Naissance"] = lieuNaissance;

    let age = row !== null ? row.age : "";
    row["Age"] = age;

    let dateRecrutement = row !== null ? row.dateRecrutement : "";
    row["Date de Recrutement"] = dateRecrutement;

    let dateRetraite = row !== null ? row.dateRetraite : "";
    row["Date de Retraite"] = dateRetraite;

    let telephones = row !== null ? row.telephones : "";
    row["Telephones"] = telephones;

    let categorie = row !== null ? row?.grade.categorieIdCategorie : "";
    row["Categorie"] = categorie;

    let grade = row.grade !== null ? row.grade.libelleGrade : " ";
    row["Grade"] = grade;

    let position = row.position !== null ? row.position.libelle : "";
    row["Position"] = position;

    let structure =
      row.structure !== null ? row.structure?.designationAdministrative : "";
    row["Structure"] = structure;

    let region =
      row.structure !== null ? row.structure?.region?.libelleRegion : "";
    row["Region"] = region;

    let departement =
      row.structure !== null
        ? row.structure?.departement?.libelleDepartement
        : "";
    row["Departement"] = departement;

    let arrondissement =
      row.structure !== null
        ? row.structure?.arrondissement?.libelleArrondissement
        : "";
    row["Arrondissement"] = arrondissement;

    let poste =
      row.postes !== null && row.postes.length >= 1
        ? row.postes[0].libellePoste
        : " ";
    row["Poste"] = poste;

    columns.map(function (column, index) {
      dataRow.push({
        text: setRow(row, column),
        alignment: "left",
      });
    });
    body.push(dataRow);
  });

  return body;
}

function buildTableRapidExportStage(data, columns) {
  var body = [];
  body.push(columns);

  data.map(function (row, index) {
    var dataRow = [];
    row["N°"] = index + 1;

    let nomsPrenoms = row !== null ? row.nomsPrenoms : "";
    row["Noms & Prenoms"] = nomsPrenoms;
    let matricule = row !== null ? row?.personnel?.matricule : "";
    row["Matricule"] = matricule;

    let age = row !== null ? row.personnel?.age : "";
    row["Age"] = age;

    let dateRecrutement = row !== null ? row.personnel?.dateRecrutement : "";
    row["Date de Recrutement"] = dateRecrutement;

    let anneeDebutStage = row !== null ? row?.anneeDebutStage : "";
    row["date début de Stage"] = anneeDebutStage;

    let dateDebut = row !== null ? row?.dateDebut : "";
    row["dateDebut"] = dateDebut;

    let dateFin = row !== null ? row?.dateFin : "";
    row["dateFin"] = dateFin;

    let anneeFinStage = row !== null ? row?.anneeFinStage : "";
    row["date de Fin de Stage"] = anneeFinStage;

    let lieuStage = row.localStage
      ? row.structure !== null
        ? row?.structure?.designationAdministrative
        : ""
      : row?.lieu;
    row["Lieu du Stage"] = lieuStage;

    let dateRetraite = row !== null ? row.personnel?.dateRetraite : "";
    row["Date de Retraite"] = dateRetraite;

    let telephones = row !== null ? row.personnel?.telephones : "";
    row["Telephones"] = telephones;

    let categorie =
      row !== null ? row?.personnel?.grade?.categorieIdCategorie : "";
    row["Categorie"] = categorie;

    let grade =
      row.personnel?.grade !== null ? row.personnel?.grade?.libelleGrade : " ";
    row["Grade"] = grade;

    let structure =
      row.structure !== null ? row?.structure?.designationAdministrative : "";
    row["Structure"] = structure;

    let region =
      row.structure !== null ? row.structure?.region?.libelleRegion : "";
    row["Region"] = region;

    let departement =
      row.structure !== null
        ? row.structure?.departement?.libelleDepartement
        : "";
    row["Departement"] = departement;

    let arrondissement =
      row.structure !== null
        ? row.structure?.arrondissement?.libelleArrondissement
        : "";
    row["Arrondissement"] = arrondissement;

    let poste =
      row.personnel.postes !== null && row.personnel.postes?.length >= 1
        ? row.personnel.postes[0]?.libellePoste
        : " ";
    row["Poste"] = poste;

    columns.map(function (column, index) {
      dataRow.push({
        text: setRow(row, column),
        alignment: "left",
      });
    });
    body.push(dataRow);
  });

  return body;
}

function buildTableBodySocle(data, columns) {
  var body = [];

  body.push(columns);

  data.map(function (row, index) {
    var dataRow = [];
    row["N°"] = index + 1;
    columns.map(function (column, index) {
      dataRow.push({
        text: row[column].toString(),
        alignment: "center",
      });
    });

    body.push(dataRow);
  });

  return body;
}

function buildTableRapidExport(data, columns) {
  var body = [];
  body.push(columns);

  data.map(function (row, index) {
    var dataRow = [];
    row["N°"] = index + 1;

    let nomsPrenoms = row !== null ? row.nomsPrenoms : "";
    row["Noms & Prenoms"] = nomsPrenoms;
    let matricule = row !== null ? row.matricule : "";
    row["Matricule"] = matricule;

    let dateNaissance = row !== null ? row.dateNaissance : "";
    row["Date de Naissance"] = dateNaissance;

    let RegionOrigine = row !== null ? row?.region?.libelleRegion : "";
    row["Region d'origine"] = RegionOrigine;

    let DepartementOrigine =
      row !== null ? row?.departement?.libelleDepartement : "";
    row["Departement d'origine"] = DepartementOrigine;

    let ArrondissementOrigine =
      row !== null ? row.arrondissement?.libelleArrondissement : "";
    row["Arrondissement d'origine"] = ArrondissementOrigine;

    let lieuNaissance = row !== null ? row.lieuNaissance : "";
    row["Lieu de Naissance"] = lieuNaissance;

    let age = row !== null ? row.age : "";
    row["Age"] = age;

    let dateRecrutement = row !== null ? row.dateRecrutement : "";
    row["Date de Recrutement"] = dateRecrutement;

    let dateRetraite = row !== null ? row.dateRetraite : "";
    row["Date de Retraite"] = dateRetraite;

    let telephones = row !== null ? row.telephones : "";
    row["Telephones"] = telephones;

    let categorie = row !== null ? row?.grade?.categorieIdCategorie : "";
    row["Categorie"] = categorie;

    let grade = row.grade !== null ? row.grade?.libelleGrade : " ";
    row["Grade"] = grade;

    let position = row.position !== null ? row?.position?.libelle : "";
    row["Position"] = position;

    let structure =
      row.structure !== null ? row?.structure?.designationAdministrative : "";
    row["Structure"] = structure;

    let region =
      row.structure !== null ? row.structure?.region?.libelleRegion : "";
    row["Region de Travail"] = region;

    let departement =
      row.structure !== null
        ? row.structure?.departement?.libelleDepartement
        : "";
    row["Departement de Travail"] = departement;

    let arrondissement =
      row.structure !== null
        ? row.structure?.arrondissement?.libelleArrondissement
        : "";
    row["Arrondissement de Travail"] = arrondissement;

    let poste =
      row.postes !== null && row.postes?.length >= 1
        ? row.postes[0]?.libellePoste
        : " ";
    row["Poste"] = poste;

    columns.map(function (column, index) {
      dataRow.push({
        text: setRow(row, column),
        alignment: "left",
      });
    });
    body.push(dataRow);
  });

  return body;
}

const showGradeName = (array) => array.map((corps) => corps);

const showGradeValue = (data) => {
  for (const key in data) {
    const grades = Object.keys(data);
    return grades.map((value) => data[value]);
  }
};

export function buildBobyGrille(grille, total) {
  let body = [[{ text: "Corps" }, { text: "Grade" }, { text: "Total" }]];
  let dataRow = [];

  if (grille.length > 0) {
    grille.map((value, index) => {
      let corps = Object.keys(value)[0];
      let row = [
        corps,
        showGradeName(Object.keys(value[corps])),
        showGradeValue(value[corps]),
      ];
      body = [...body, row];
    });
    let footer = [
      {
        colSpan: 2,
        text: "TOTAL",
      },
      "",
      { text: total },
    ];
    body = [...body, footer];
  }
  return body;
}

export function buildTableGrille(grille) {
  return {
    table: {
      widths: ["40%", "50%", "10%"],
      headerRows: 1,
    },
    // body: buildBobyGrille(grille, columns),
    // body: [
    //   [
    //     { text: "Corps", style: "tableHeader", alignment: "center" },
    //     { text: "Grade", style: "tableHeader", alignment: "center" },
    //     { text: "Total", style: "tableHeader", alignment: "center" },
    //   ],
    //   [{ text: "Contractuels" }, "adsasd", "adad"],
    //   ["Contractuels", "adsasd", "adad"],
    //   ["Contractuels", "adsasd", "adad"],
    //   ["Contractuels", "adsasd", "adad"],
    //   ["Contractuels", "adsasd", "adad"],
    //   ["Contractuels", "adsasd", "adad3"],
    //   ["", "TOTAL", "1248"],
    // ],
  };
}

export function buildHeader() {
  const header = {
    columns: [
      {
        stack: [
          // second column consists of paragraphs
          "REPUBLIQUE DU CAMEROUN",
          "Paix - Travail - Patrie",
          "     ***********         ",
          "MINISTERE DE L'AGRICULTURE",
          "ET DU DEVELOPPEMENT RURAL",
          "     ***********         ",
          "SECRETARIAT GENERAL",
          "     ***********         ",
          "DIRECTION DES RESSOURCES HUMAINES",
        ],
      },
      {
        image: "minaderLogo",
        style: "logo",
        width: 100,
      },
      {
        stack: [
          // secfetchPositionsond column consists of paragraphs
          "REPUBLIC OF CAMEROUN",
          "Peace  -Work - Fatherland",
          "     ***********         ",
          "MINISTERY OF AGRICULTURE",
          "AND RURAL DEVELOPMENT",
          "     ***********         ",
          "GENERAL SECRETARIAT",
          "     ***********         ",
          "DEPARTMENT OF HUMAN RESSOURCES",
        ],
      },
    ],

    fontSize: 8,
    bold: true,
    alignment: "center",
  };

  return header;
}

export function buildHeaderCabinet() {
  const header = {
    columns: [
      {
        stack: [
          // second column consists of paragraphs
          "REPUBLIQUE DU CAMEROUN",
          "Paix - Travail - Patrie",
          "     ***********         ",
          "MINISTERE DE L'AGRICULTURE",
          "ET DU DEVELOPPEMENT RURAL",
          "     ***********         ",
          "CABINET DU MINISTRE",
          "     ***********         ",
        ],
      },
      {
        image: "minaderLogo",
        style: "logo",
        width: 100,
      },
      {
        stack: [
          // secfetchPositionsond column consists of paragraphs
          "REPUBLIC OF CAMEROUN",
          "Peace  -Work - Fatherland",
          "     ***********         ",
          "MINISTERY OF AGRICULTURE",
          "AND RURAL DEVELOPMENT",
          "     ***********         ",
          "MINISTER'S OFFICE",
          "     ***********         ",
        ],
      },
    ],

    fontSize: 8,
    bold: true,
    alignment: "center",
  };

  return header;
}

export function buildHeaderBaco() {
  const header = {
    columns: [
      {
        stack: [
          // second column consists of paragraphs
          "REPUBLIQUE DU CAMEROUN",
          "Paix - Travail - Patrie",
          "     ***********         ",
          "MINISTÈRE DE L'AGRICULTURE",
          "ET DU DÉVELOPPEMENT RURAL",
          "     ***********         ",
          "SECRÉTARIAT DU GENERAL",
          "     ***********         ",
          "DIRECTION DES RESSOURCES HUMAINES",
          "     ***********         ",
          "SOUS DIRECTION DES PERSONNELS",
          "     ***********         ",
          "SERVICE DU PERSONNEL NON FONCTIONNAIRE",
          "     ***********         ",
          "BUREAU DES ACTES COURANTS",
          "     ***********         ",
        ],
      },
      {
        image: "minaderLogo",
        style: "logo",
        width: 100,
      },
      {
        stack: [
          // secfetchPositionsond column consists of paragraphs
          "REPUBLIC OF CAMEROUN",
          "Peace  -Work - Fatherland",
          "     ***********         ",
          "MINISTERY OF AGRICULTURE",
          "AND RURAL DEVELOPMENT",
          "     ***********         ",
          "GENERAL SECRETARIAT",
          "     ***********         ",
          "DEPARTMENT OF HUMAN RESOURCES",
          "     ***********         ",
          "SUB DEPARTMENT OF PERSONNEL",
          "     ***********         ",
          "NON SERVICE OF CIVIL SERVANTS",
          "     ***********         ",
          "ROUTINE ACTIVITIES BUREAU",
          "     ***********         ",
        ],
      },
    ],

    fontSize: 8,
    bold: true,
    alignment: "center",
  };

  return header;
}

export function buildHeaderSDP() {
  const header = {
    columns: [
      {
        stack: [
          // second column consists of paragraphs
          "REPUBLIQUE DU CAMEROUN",
          "Paix - Travail - Patrie",
          "     ***********         ",
          "MINISTÈRE DE L'AGRICULTURE",
          "ET DU DÉVELOPPEMENT RURAL",
          "     ***********         ",
          "SECRÉTARIAT DU GENERAL",
          "     ***********         ",
          "DIRECTION DES RESSOURCES HUMAINES",
          "     ***********         ",
          "SOUS DIRECTION DES PERSONNELS",
        ],
      },
      {
        image: "minaderLogo",
        style: "logo",
        width: 100,
      },
      {
        stack: [
          // secfetchPositionsond column consists of paragraphs
          "REPUBLIC OF CAMEROUN",
          "Peace  -Work - Fatherland",
          "     ***********         ",
          "MINISTERY OF AGRICULTURE",
          "AND RURAL DEVELOPMENT",
          "     ***********         ",
          "GENERAL SECRETARIAT",
          "     ***********         ",
          "DEPARTMENT OF HUMAN RESOURCES",
          "     ***********         ",
          "SUB DEPARTMENT OF PERSONNEL",
        ],
      },
    ],

    fontSize: 8,
    bold: true,
    alignment: "center",
  };

  return header;
}

export function buildFooter(currentPage, pageCount) {
  return {
    table: {
      widths: ["*", "*"],
      body: [
        [
          {
            text: "Page " + currentPage,
            alignment: "left",
            style: "footer",
          },
          {
            text: "édité le: " + moment().locale("fr").format("LL"),
            alignment: "right",
            style: "footer",
          },
        ],
      ],
    },
    layout: "noBorders",
  };
}

export function buildTable(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: ["auto", "10%", "auto", "auto", "auto", "auto", "auto", "auto"],

      body: buildTableBody(data, columns),
    },
  };
}

export function buildTablePersonnel(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: [25, 60, 150, "auto", "auto", "auto", 100],
      body: buildTableBodyPersonnel(data, columns),
    },
  };
}

function setWithColums(columns) {
  let widths = [];
  columns.forEach((column) => {
    switch (column) {
      case "N°":
        widths = [...widths, 25];
        break;
      case "Matricule":
        widths = [...widths, 60];
        break;
      case "Noms & Prenoms":
        widths = [...widths, 150];
        break;
      default:
        widths = [...widths, "auto"];
    }
  });

  return widths;
}

export function buildTableRapideExportData(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: setWithColums(columns),
      body: buildTableRapidExport(data, columns),
    },
  };
}

export function buildTableRapidExportStageData(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: setWithColums(columns),
      body: buildTableRapidExportStage(data, columns),
    },
  };
}

export function buildTableCertificatCollectif(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: setWithColums(columns),
      body: buildTableCertificat(data, columns),
    },
  };
}

// optimiser par un switch
export function buildTableBodyPoste(data, columns) {
  // Optimiser la function pour des cas particuliers switch
  var body = [];

  body.push(columns);

  data.map(function (row, index) {
    let dataRow = [];
    row["N°"] = index + 1;

    let structure =
      row.structure !== null ? row.structure.designationAdministrative : "";
    row["Structure"] = structure;

    let region =
      row.structure.region !== null ? row.structure?.region?.libelleRegion : "";
    row["_region"] = region;

    let departement =
      row.structure?.departement !== null
        ? row.structure?.departement?.libelleDepartement
        : "";
    row["_departement"] = departement;

    let sexe = row.personnel?.sexe != null ? row.personnel?.sexe : "";
    row["_sexe"] = sexe;

    let arrondissement =
      row.structure?.arrondissement !== null
        ? row.structure?.arrondissement.libelleArrondissement
        : "";
    row["_arrondissement"] = arrondissement;

    let nomsPrenoms = row.personnel !== null ? row.personnel.nomsPrenoms : "";
    row["Noms & Prenoms"] = nomsPrenoms;

    let dateNaissance =
      row.personnel !== null ? row.personnel.dateNaissance : "";
    row["Date de Naissance"] = dateNaissance;

    let lieuNaissance =
      row.personnel !== null ? row.personnel.lieuNaissance : "";
    row["Lieu de Naissance"] = lieuNaissance;

    let dateRetraite = row.personnel !== null ? row.personnel.dateRetraite : "";
    row["Date de Retraite"] = dateRetraite;

    let categorie =
      row.personnel !== null ? row.personnel?.grade?.categorieIdCategorie : "";
    row["Categorie"] = categorie;

    let grade = row.personnel !== null ? row.personnel.grade.libelleGrade : "";
    row["Grade"] = grade;

    let matricule = row.personnel !== null ? row.personnel.matricule : "";
    row["Matricule"] = matricule;

    let position = row.personnel !== null ? row.personnel.position.libelle : "";
    row["Position"] = position;

    let poste = row !== null ? row.libellePoste : "";
    row["Poste"] = poste;

    let telephones = row.personnel !== null ? row.personnel.telephones : "";
    row["Telephones"] = telephones;

    let naturePoste =
      row.naturePoste !== null ? row.naturePoste.libelleNaturePoste : "";
    row["_naturePoste"] = naturePoste;

    //   let structure =
    //   row.structure !== null ? row.structure.designationAdministrative : "";
    // row["Structure"] = structure;

    let rangPoste =
      row.naturePoste !== null
        ? row.naturePoste.rangPoste.libelleRangPoste
        : "";
    row["rangPoste"] = rangPoste;

    columns.map(function (column, index) {
      dataRow.push({
        text: row[column],
        alignment: "left",
      });
    });
    body.push(dataRow);
  });

  return body;
}

export function buildTableRangPoste(data, columns) {
  // Optimiser la function pour des cas particuliers switch
  var body = [];
  body.push(columns);

  data.map(function (row, index) {
    let dataRow = [];
    row["N°"] = index + 1;

    let structure =
      row.structure !== null ? row.structure.designationAdministrative : "";
    row["Structure"] = structure;

    let occupant = row.personnel !== null ? row.personnel.nomsPrenoms : "";
    row["Occupant"] = occupant;

    let matricule = row.personnel !== null ? row.personnel.matricule : "";
    row["Matricule"] = matricule;

    let position = row.personnel !== null ? row.personnel.position.libelle : "";
    row["Position"] = position;

    let naturePoste =
      row.naturePoste !== null ? row.naturePoste.libelleNaturePoste : "";
    row["Nature Poste"] = naturePoste;

    let noms = row.personnel !== null ? row.personnel.noms : "";
    row["noms"] = noms;

    let prenoms = row.personnel !== null ? row.personnel.prenoms : "";
    row["prenoms"] = prenoms;

    let categorie =
      row.personnel !== null ? row.personnel.categorie.idCategorie : "";
    row["Categorie"] = categorie;

    let grade = row.personnel !== null ? row.personnel.grade.libelleGrade : "";
    row["Grade"] = grade;

    let rangPoste =
      row.naturePoste !== null
        ? row.naturePoste.rangPoste.libelleRangPoste
        : "";
    row["Rang Poste"] = rangPoste;

    columns.map(function (column, index) {
      dataRow.push({
        text: row[column],
        alignment: "left",
      });
    });

    body.push(dataRow);
  });

  return body;
}

export function buildTableSocle(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: ["auto", "*", "*", "*"],
      body: buildTableBodySocle(data, columns),
    },
  };
}

export function buildTablePoste(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: setWithColums(columns),
      body: buildTableBodyPoste(data, columns),
    },
  };
}

export function buildTableRang(data, columns) {
  return {
    table: {
      headerRows: 1,
      widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto", "auto"],
      body: buildTableRangPoste(data, columns),
    },
  };
}

function CheckDate(d) {
  // Cette fonction vérifie le format JJ/MM/AAAA saisi et la validité de la date.
  // Le séparateur est défini dans la variable separateur
  var amin = 1850; // année mini
  var amax = 2500; // année maxi
  var separateur = "-"; // separateur entre jour/mois/annee
  var a = parseInt(d.substring(0, 4));
  var m = parseInt(d.substring(5, 7));
  var j = parseInt(d.substring(8));
  var ok = 1;

  if ((isNaN(j) || j < 1 || j > 31) && ok === 1) {
    // console.log("Le jour n'est pas correct.");
    ok = 0;
  }
  if ((isNaN(m) || m < 1 || m > 12) && ok === 1) {
    // console.log("Le mois n'est pas correct.");
    ok = 0;
  }
  if ((isNaN(a) || a < amin || a > amax) && ok === 1) {
    // console.log("L'année n'est pas correcte.");
    ok = 0;
  }
  if (
    (d.substring(4, 5) !== separateur || d.substring(7, 8) !== separateur) &&
    ok === 1
  ) {
    // console.log("Les séparateurs doivent être des " + separateur);
    ok = 0;
  }
  if (ok === 1) {
    var d2 = new Date(a, m - 1, j);
    let j2 = d2.getDate();
    let m2 = d2.getMonth() + 1;
    let a2 = d2.getYear();
    if (a2 <= 100) {
      a2 = 1900 + a2;
    }
    if (j !== j2 || m !== m2 || a !== a2) {
      // console.log("La date " + d + " n'existe pas !");
      ok = 0;
    }
    ok = d2;
  }
  return ok;
}

export function calculateAnciennete(dt1) {
  if (dt1) {
    let diffYear = (new Date().getTime() - new Date(dt1).getTime()) / 1000;
    diffYear /= 60 * 60 * 24;
    return Math.abs(Math.round(diffYear / 365.25));
  }
  return "";
}
export function calculateAge(dt) {
  // Cette fonction retourne une chaîne de type :
  //  "15 ans et 6 mois"
  var d = CheckDate(dt);
  var m = new Date();
  var age = "";
  var age_a = 0;
  var age_m = 0;
  if (d !== 0) {
    if (d.getTime() > m.getTime()) {
      age = "La date de naissance est supérieure à la date du jour !";
      document.formage.dt_naissance.focus();
    }
    age_a = m.getFullYear() - d.getFullYear();
    m.setYear(d.getYear());
    if (d.getTime() > m.getTime() && d.getMonth() - m.getMonth() !== 0) {
      age_a--;
    }
    if (d.getMonth() >= m.getMonth()) {
      age_m = 12 - (d.getMonth() - m.getMonth());
    } else {
      age_m = m.getMonth() - d.getMonth();
    }
    if (age_m === 12) {
      age_m = 0;
    }
    if (age_a === 1) {
      age = age_a + " an";
    }
    if (age_a > 1) {
      age = age_a + " ans";
    }
    if (age_a > 0 && age_m > 0) {
      age += " et ";
    }
    if (age_m > 0) {
      age += age_m + " mois";
    }
    if (age === "") {
      age = "moins de 1 mois";
    }
  }
  return age;
}

export const getLibelleItem = (items, idItem) => {
  let libelleItem = "";
  if (items && items.length > 0) {
    let keys = Object.keys(items[0]);
    let firstKey = keys[0];
    let secondKey = keys[1];
    libelleItem = items.filter(
      (item) => item[firstKey] === parseInt(idItem)
    )[0][secondKey];
    return libelleItem;
  }
  return libelleItem;
};

export const getStatutMatrimonial = (number) => {
  switch (parseInt(number)) {
    case 1:
      return "Celibataire";
    case 2:
      return "Marié(e)";
    case 3:
      return "Divorcé";
    case 4:
      return "Veuf(e)";
    default:
      return "";
  }
};

export const getNatureRecrutement = (number) => {
  switch (parseInt(number)) {
    case 1:
      return "Arreté";
    case 2:
      return "Decret";
    case 3:
      return "Décision";
    case 4:
      return "Note de Service";
    case 5:
      return "Affectation";
    case 6:
      return "Contrat";
    default:
      return "";
  }
};

export const getPositionAdministrative = (number) => {
  switch (parseInt(number)) {
    case 1:
      return "Responsable";
    case 2:
      return "Cadre";
    case 3:
      return "Employe de Bureau";
    case 4:
      return "Chauffeur";
    case 5:
      return "Sécretaire";
    case 6:
      return "Agent d'entretien";
    case 7:
      return "Gardien";
    default:
      return "";
  }
};

export const getNiveauiInstruction = (level) => {
  switch (parseInt(level)) {
    case 1:
      return "CEP / FSLC(First School Leaving Certificate)";
    case 2:
      return "BEPC /GCE Ordinary Level";
    case 3:
      return "PROBATOIRE";
    case 4:
      return "BACCALAUREAT / GCE Advanced Level";
    case 5:
      return "LICENCE  (BACHELOR DEGREE)";
    case 6:
      return "MASTER I";
    case 7:
      return "MASTER II (MASTER DEGREE) ";
    case 8:
      return "DOCTORAT (PHD)";
    case 9:
      return "BACC+1";
    case 10:
      return "BACC+2";
    default:
      return "";
  }
};

export const getStatusAdmin = (status) => {
  switch (parseInt(status)) {
    case 1:
      return "Fonctionnaire";
    case 2:
      return "Contractuel";
    case 3:
      return "Decisionnaire";
  }
};

export function fetchImage(url) {
  return fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

function buildHeaderSpan(title) {
  return [
    {
      text: `${title}`,
      colSpan: 2,
      margin: [0, 5, 0, 5],
      alignment: "center",
    },
    {},
  ];
}

function buildFicheBodyPoste(title, postes) {
  let body = [];
  const header = [
    {
      text: `${title}`,
      colSpan: 2,
      margin: [0, 5, 0, 5],
      alignment: "center",
    },
    {},
  ];
  body = [...body, header];

  postes.map((poste) => {
    body = [
      ...body,
      [
        {
          margin: [0, 5, 0, 5],
          text: [
            {
              text: "Poste: ",
              style: "lableStyle",
            },
            {
              text: `${poste.libellePoste}`,
              style: "libelleStyle",
            },
          ],
        },
        {
          margin: [0, 5, 0, 5],
          text: [
            {
              text: "Structure: ",
              style: "lableStyle",
            },
            {
              text: `poste.libellePoste`,
              text: `${poste?.libelleStructure}`,
              style: "libelleStyle",
            },
          ],
        },
      ],
    ];
  });

  return body;
}

export function buildFicheMouvement(title, mouvements) {
  let body = [];
  const headerTitle = [
    {
      text: `${title}`,
      colSpan: 6,
      margin: [0, 5, 0, 5],
      alignment: "center",
    },
    {},
    {},
    {},
    {},
    {},
  ];

  const headerColumns = [
    { text: "N°", style: "lableStyle", alignment: "center" },
    { text: "Nature ", style: "lableStyle", alignment: "center" },
    { text: "Numero ", style: "lableStyle", alignment: "center" },
    { text: "Date ", style: "lableStyle", alignment: "center" },
    { text: "Structure ", style: "lableStyle", alignment: "center" },
    { text: "Poste ", style: "lableStyle", alignment: "center" },
  ];
  body = [...body, headerTitle, headerColumns];

  mouvements.map((mouvement, index) => {
    body = [
      ...body,
      [
        {
          text: `${index++}`,
          style: "libelleStyle",
        },
        {
          text: `${mouvement.acte ? mouvement.acte.libelleNatureActe : ""}`,
          style: "libelleStyle",
        },
        {
          text: `${mouvement.acte ? mouvement.acte.numeroActe : ""}`,
          style: "libelleStyle",
        },
        {
          text: `${mouvement.acte ? mouvement.acte.dateSignature : ""}`,
          style: "libelleStyle",
        },
        {
          text: `${
            mouvement.structure
              ? mouvement.structure.designationAdministrative
              : ""
          }`,
          style: "libelleStyle",
        },
        {
          text: `${mouvement.poste ? mouvement.poste.libellePoste : " "}`,
          style: "libelleStyle",
        },
      ],
    ];
  });

  return body;
}

export function getPostes(postes) {
  if (postes.length > 0) {
    return {
      table: {
        widths: ["*", "*"],
        body: buildFicheBodyPoste("POSTE DE RESPONSABILITES", postes),
      },
    };
  }
}

export function getMouvements(mouvements) {
  if (mouvements.length > 0) {
    return {
      table: {
        dontBreakRows: true,
        widths: [15, "*", "*", 50, "*", "*"],
        body: buildFicheMouvement("MOUVEMENTS", mouvements),
      },
    };
  }
}

const clone = (obj) => Object.assign({}, obj);

export const renameKey = (object, key, newKey) => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};

export const certifcatPlaceHolder = `Le Ministère de l'Agriculture et du Développement Rural soussigné, certifie que les personnels dont les noms suivent...`;

function isCharacterALetter(char) {
  return /[a-zA-Z]/.test(char);
}

export let buildMatricule = (value) => {
  let newMatricule = "";
  value.split("").map((char, index) => {
    if (isCharacterALetter(char) && index === 0) {
      newMatricule = newMatricule + char;
      newMatricule = newMatricule + "-";
    } else if (isCharacterALetter(char) && index > 0) {
      newMatricule = newMatricule + "-";
      newMatricule = newMatricule + char;
    } else {
      newMatricule = newMatricule + char;
    }
  });
  return newMatricule;
};
