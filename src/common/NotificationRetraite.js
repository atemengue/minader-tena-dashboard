import { CButton, CTooltip } from "@coreui/react";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { getCategorieNotif, tableStyle } from "../utils/dataTables";
import { buildHeaderCabinet } from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const NotificationRetraite = ({ personnel }) => {
  const {
    sexe,
    nomsPrenoms,
    grade,
    matricule,
    categorieIdCategorie,
    indice,
    echelon,
    dateRetraite,
    dateNaissance,
    dateRecrutement,
  } = personnel;
  const docDefinition = {
    footer: function (currentPage, pageCount) {
      return {
        table: {
          widths: ["*", "*"],
          body: [
            [
              {},
              {
                text: "édité le" + moment().locale("fr").format("LL"),
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
      buildHeaderCabinet(),
      {
        columns: [
          { text: "N______________/CAB/MINADER", bold: true },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            text: "Yaoundé,",
          },
        ],
        margin: [0, 20, 0, 10],
      },
      {
        columns: [
          {},
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            stack: [
              { text: "LE MINISTRE", bold: true, marginBottom: 10 },
              {
                text: [
                  `A ${sexe === "1" ? "Monsieur " : "Madame "}`,
                  { text: `${nomsPrenoms}, `, bold: true },
                  `${
                    parseInt(categorieIdCategorie) >= 1 &&
                    parseInt(categorieIdCategorie) <= 12
                      ? ""
                      : `${grade.libelleGrade}`
                  } matricule ${matricule} ${getCategorieNotif(
                    categorieIdCategorie,
                    echelon,
                    indice
                  )}, ${
                    indice >= 1000 ? "Hors Echelle" : ""
                  } en Service au Ministère de l'Agriculture et du Développement Rural.`,
                ],
              },
            ],
            width: "60%",
            fontSize: 11,
            alignment: "justify",
          },
        ],
        style: "columnMarge",
      },
      {
        columns: [
          {
            text: "Objet:",
            width: "auto",
            style: "objetStyle",
          },
          {
            text: "Notification de votre admission à la retraite.",
            style: "notifStyle",
            width: "50%",
          },
        ],
      },
      {
        fontSize: 11,
        alignment: "justify",
        style: "columnMarge",
        stack: [
          { text: `${sexe === "1" ? "Monsieur," : "Madame,"}`, marginLeft: 30 },
          {
            text: [
              { text: "J'ai l'honneur" },
              ` de vous faire connaître que, né(e) le ${moment(dateNaissance)
                .locale("fr")
                .format("DD MMMM YYYY")}, recruté le ${moment(dateRecrutement)
                .locale("fr")
                .format("DD MMMM YYYY")}`,
            ],
            marginLeft: 30,
          },
          ` et actuellement ${grade.libelleGrade} ${getCategorieNotif(
            categorieIdCategorie,
            echelon,
            indice
          )} de la Fonction Publique de l'Etat, vous avez atteint la limite d'âge réglementaire dans votre cadre le  ${moment(
            dateRetraite
          )
            .locale("fr")
            .format("DD MMMM YYYY")}  à la réglementation en vigeur.`,
          // {
          //   text: [
          //     {
          //       text: `${moment(dateRetraite)
          //         .locale("fr")
          //         .format("DD MMMM YYYY")}`,
          //       bold: true,
          //     },
          //     " à la réglementation en vigeur. ",
          //   ],
          // },
        ],
      },
      {
        fontSize: 11,
        alignment: "justify",
        stack: [
          {
            text: [
              { text: "Au moment " },
              "de l'aboutissement d'une carrière professionnelle, que vous avez brillament passée",
            ],
            marginLeft: 30,
          },
          " au service de l'Etat, j'ai l'honneur de vous addresser au nom du Président de la République, de son Gouvernement ainsi qu'en mon nom propre, mes sincères et vives félicitations pour les éminents et loyaux services rendus durant votre periode d'activité.",
        ],
      },
      {
        fontSize: 11,
        style: "columnMarge",

        stack: [
          {
            text: [
              { text: "Pour permetre ", marginLeft: 30 },
              "aux structures compétentes de faire liquider vos légitimes droits à pension,",
            ],
            marginLeft: 30,
          },
          " je vous saurai gré de bien vouloir me faire parvenir, de toute urgence, un dossier composé des pieces ci-apres enumerées:",
        ],
      },
      {
        fontSize: 11,
        marginLeft: 30,
        stack: [
          "- une demande timbrée;",
          "- une copie d'acte de naissance;",
          "- une copie d'acte de naissance de chaque enfant mineur;",
          "- un certificat de vie collectif des enfants mineurs;",
          "- des certificats de scolarite des enfants âgés de 06 a 20 ans;",
          "- une déclaration d'élection de domicile signée par une autorité compétente;",
          "- un certificat d'individualité eventuellement;",
          "- acte de recrutement(Intégration/Contract/Décision d'engagement);",
          "- le reclassement, l'avancement de grade, le dernier/trois derniers actes(s) d'avancement;",
          "- l'arrête de mise en disponibilité de l'arrête de fin de disponibilité (eventuellement).",
        ],
      },
      {
        fontSize: 11,
        alignment: "justify",
        stack: [
          {
            text: [
              { text: "Les frais", marginLeft: 30 },
              " de transport pour vous-même et votre famille composée d'une épouse légitime et des",
            ],
            marginLeft: 30,
          },
          " enfants mineurs à charge, de votre lieu de travail à votre domicile, sont à la charge de L'Etat.",
        ],
        style: "columnMarge",
      },
      {
        fontSize: 11,
        alignment: "justify",
        stack: [
          `Veuillez agréer, ${
            sexe === "1" ? "Monsieur" : "Madame"
          } l'assurance de ma considération distinguée.`,
        ],
        margin: [30, 0, 0, 10],
      },
      {
        stack: [
          {
            fontSize: 11,
            text: "Ampliations:",
            width: "auto",
            style: "objetStyle",
          },
          {
            text: "- CAB/MINADER",
            bold: true,
            fontSize: 10,
            marginLeft: 10,
          },
          {
            text: " - SG/MINADER",
            bold: true,
            fontSize: 10,
            marginLeft: 15,
          },
          {
            text: "- DRH/MINADER",
            bold: true,
            fontSize: 10,
            marginLeft: 20,
          },
          {
            text: " - DRFP/MINADER",
            bold: true,
            fontSize: 10,
            marginLeft: 25,
          },
          {
            text: "- Intéressé(e)",
            bold: true,
            fontSize: 10,
            marginLeft: 30,
          },
          {
            text: "- Archive/Chrono",
            bold: true,
            fontSize: 10,
            marginLeft: 35,
          },
        ],
      },
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
    <CTooltip content="imprimer la notification en retraite ?">
      <CButton onClick={pdfDownload} color="warning">
        <FontAwesomeIcon className="mr-2" icon={faFile} />
        Notification a la retraite
      </CButton>
    </CTooltip>
  );
};

export default NotificationRetraite;
