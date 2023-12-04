import { CTooltip } from "@coreui/react";
import { faIdCardAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { BUCKET_URL } from "../config";
import { tableStyle } from "../utils/dataTables";
import {
  buildHeader,
  calculateAge,
  calculateAnciennete,
  fetchImage,
  getMouvements,
  getPostes,
} from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PersonnelFiche = ({ personnel }) => {
  const [personnelProfile, setPersonnelProfile] = useState(null);

  const {
    photo,
    personnelIdArchive,
    matricule,
    nomsPrenoms,
    nomJeuneFille,
    sexe,
    telephones,
    dateNaissance,
    prenoms,
    lieuNaissance,
    email,
    region,
    departement,
    arrondissement,
    position,
    dateRecrutement,
    grade,
    anneeRetraite,
    firstGrade,
    dateRetraite,
    echelon,
    classe,
    indice,
    categorieActuelle,
    positionAdministrative,
    postes,
    mouvements,
  } = personnel;

  const urlPhoto = (photo) => {
    if (photo) {
      return `${BUCKET_URL}/personnels/${personnelIdArchive}/${photo}`;
    }
    return `${BUCKET_URL}/default/user.png`;
  };

  useEffect(() => {
    fetchImage(urlPhoto(photo)).then((response) => {
      setPersonnelProfile(response);
    });
  }, []);

  const getNomJeuneFille = (nom) => {
    if (nom) {
      return {
        margin: [0, 5, 0, 5],
        text: [
          { text: "Noms: ", style: "lableStyle" },
          { text: `${nom}`, style: "libelleStyle" },
        ],
      };
    }
  };

  const docDefinition = {
    footer: function (currentPage, pageCount) {
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
    },
    content: [
      buildHeader(),
      {
        stack: ["FICHE D'UN PERSONNEL"],
        style: "subheader",
      },
      {
        table: {
          widths: ["40%", "*"],
          body: [
            [
              {
                text: "INFORMATIONS PRINCIPALES",
                colSpan: 2,
                alignment: "center",
                margin: [0, 5, 0, 5],
              },
              {},
            ],
            [
              {
                style: "imageProfile",
                image: personnelProfile,
                width: 120,
              },
              {
                columns: [
                  {
                    stack: [
                      {
                        margin: [0, 2, 0, 2],
                        text: [
                          { text: "Matricule: ", style: "lableStyle" },
                          { text: `${matricule}`, style: "libelleStyle" },
                        ],
                      },
                      {
                        margin: [0, 5, 0, 5],
                        text: [
                          { text: "Noms: ", style: "lableStyle" },
                          { text: `${nomsPrenoms}`, style: "libelleStyle" },
                        ],
                      },
                      getNomJeuneFille(nomJeuneFille),

                      {
                        margin: [0, 5, 0, 5],
                        text: [
                          { text: "Prénoms: ", style: "lableStyle" },
                          { text: `${prenoms}`, style: "libelleStyle" },
                        ],
                      },
                      {
                        text: [
                          { text: "Sexe: ", style: "lableStyle" },
                          {
                            text: `${sexe === "1" ? "M" : "F"}`,
                            style: "libelleStyle",
                          },
                        ],
                      },
                      {
                        margin: [0, 5, 0, 5],
                        text: [
                          { text: "Telephones: ", style: "lableStyle" },
                          { text: `${telephones}`, style: "libelleStyle" },
                        ],
                      },
                      {
                        margin: [0, 5, 0, 5],
                        text: [
                          { text: "Email: ", style: "lableStyle" },
                          { text: `${email}`, style: "libelleStyle" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: ["*", "*", "*"],
          body: [
            [
              {
                text: "INFORMATIONS SECONDAIRES",
                colSpan: 3,
                margin: [0, 5, 0, 5],
                alignment: "center",
              },
              {},
              {},
            ],
            [
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Date de Naissance: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${dateNaissance}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Lieu: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${lieuNaissance}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Age Actuel: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${calculateAge(dateNaissance)}`,
                    style: "libelleStyle",
                  },
                ],
              },
            ],
            [
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Region: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${region.libelleRegion}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Departement: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${departement.libelleDepartement}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Arrondissement: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${arrondissement.libelleArrondissement}`,
                    style: "libelleStyle",
                  },
                ],
              },
            ],
          ],
        },
      },

      {
        table: {
          widths: ["*", "*"],
          body: [
            [
              {
                text: "INFORMATIONS DE CARRIERE",
                alignment: "center",
                colSpan: 2,
                margin: [0, 2, 0, 2],
              },
              {},
            ],
            [
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Position d'Activite: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${position.libelle}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Date de Recrutement: ",
                    style: "lableStyle",
                  },
                  { text: `${dateRecrutement}`, style: "libelleStyle" },
                ],
              },
            ],
            [
              {
                margin: [0, 5, 0, 5],
                text: [
                  { text: "Garde Recrutement  : ", style: "lableStyle" },
                  {
                    text: `${firstGrade ? firstGrade.libelleGrade : ""}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Date de Retraite  : ",
                    style: "lableStyle",
                  },
                  { text: `${dateRetraite}`, style: "libelleStyle" },
                ],
              },
            ],
            [
              {
                margin: [0, 5, 0, 5],
                text: [
                  { text: "Grade de Actuel: ", style: "lableStyle" },
                  {
                    text: `${grade.libelleGrade}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  { text: "Annee de Retraite: ", style: "lableStyle" },
                  {
                    text: `${anneeRetraite}`,
                    style: "libelleStyle",
                  },
                ],
              },
            ],
            [
              {
                margin: [0, 5, 0, 5],
                text: [
                  { text: "Statut: ", style: "lableStyle" },
                  {
                    text: `${
                      positionAdministrative
                        ? positionAdministrative.libelle
                        : ""
                    }`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  { text: "Anciennete: ", style: "lableStyle" },
                  {
                    text: `${calculateAnciennete(dateRecrutement)} ans`,
                    style: "libelleStyle",
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        table: {
          widths: ["*", "*", "*", "*"],
          body: [
            [
              {
                text: "CATEGORIE, GRADES ET INDICES",
                colSpan: 4,
                margin: [0, 2, 0, 2],
                alignment: "center",
              },
              {},
              {},
              {},
            ],
            [
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Categorie: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${categorieActuelle}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Indice: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${indice}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Classe: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${classe}`,
                    style: "libelleStyle",
                  },
                ],
              },
              {
                margin: [0, 5, 0, 5],
                text: [
                  {
                    text: "Echelon: ",
                    style: "lableStyle",
                  },
                  {
                    text: `${echelon}`,
                    style: "libelleStyle",
                  },
                ],
              },
            ],
          ],
        },
      },
      getPostes(postes),
      getMouvements(mouvements),
    ],
    images: {
      minaderLogo: logoMinaderImage,
    },
    defaultStyle: {
      margin: [0, 0, 0, 0],
    },
    styles: tableStyle,
  };

  function pdfDownload() {
    try {
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <CTooltip content="Afficher le CV">
      <FontAwesomeIcon
        onClick={pdfDownload}
        cursor="pointer"
        icon={faIdCardAlt}
        size="2x"
      />
    </CTooltip>
  );
};

export default PersonnelFiche;
