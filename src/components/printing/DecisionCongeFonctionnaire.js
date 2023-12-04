import { CButton } from "@coreui/react";
import {
  faCertificate,
  faPrint,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "moment/locale/fr";
import React from "react";
import { tableStyle } from "../../utils/dataTables";
import { buildHeaderBaco } from "../../utils/functions";
import { logoMinaderImage } from "../../utils/logoBase";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");

const DecisionCongeFonctionnaire = ({
  textFooter,
  textHeader,
  fields,
  personnels,
  structure,
  disabled,
}) => {
  var textHeader = htmlToPdfmake(textHeader);
  var textFooter = htmlToPdfmake(textFooter);

  //

  const buildDecisionCongeFonctionnaire = (data) => {
    let index = 1;
    let body = [];

    let header = [
      { text: "N°", alignment: "center", bold: true },
      {
        text: "NOMS ET PRENOMS",
        bold: true,
        alignment: "center",
      },
      { text: "MATRICULE", bold: true, alignment: "center" },
      { text: "GRADE", bold: true, alignment: "center" },
      { text: "FONCTION", bold: true, alignment: "center" },
      { text: "LIEU DE JOUISSANCE", bold: true, alignment: "center" },
    ];

    body.push(header);

    personnels.map((personnel) => {
      let array = [
        { text: index++ + ".", alignment: "center" },
        { text: personnel.nomsPrenoms, style: "tableHeader" },
        {
          text: personnel.matricule,
          style: "tableHeader",
          alignment: "center",
        },
        {
          text: personnel?.grade,
          style: "tableHeader",
          alignment: "center",
        },
        {
          text: personnel?.fonction,

          style: "tableHeader",
          alignment: "center",
        },
        {
          text: personnel?.lieudejouissance,
          style: "tableHeader",
          alignment: "center",
        },
      ];
      body = [...body, array];
    });

    return body;
  };

  var docDefinition = {
    footer: function (currentPage, pageCount) {
      return {
        table: {
          body: [
            [
              {
                text: currentPage + "/" + pageCount,
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
      buildHeaderBaco(),

      {
        columns: [
          {
            text: "DECISION N°__________________/D/MINADER/SG/DRH/SDP/SDF/BACo",
            fontSize: 12,
            width: "80%",
            bold: true,
          },
        ],
        margin: [0, 10, 0, 0],
      },
      {
        text: `Accordant des congés annuels de trente (30) jours consécutifs aux fonctionnaires en service au Ministère de L'Agriculture et du Développement Rural (${structure})`,
      },

      {
        stack: ["LE MINISTÈRE DE L'AGRICULTURE ET DU DÉVELOPPEMENT RURAL"],
        fontSize: 14,
        bold: true,
        alignment: "center",
        margin: [0, 10, 0, 0],
        lineHeight: 1.5,
      },
      textHeader, // TEXT HEADER

      {
        stack: [`DÉCIDE`],
        fontSize: 14,
        bold: true,
        alignment: "center",
        margin: [0, 5, 0, 5],
        decoration: "underline",
      },

      {
        stack: [
          {
            stack: [
              {
                stack: [
                  {
                    text: [
                      { text: "Article 1 ", style: "articleStyle" },
                      { text: ": " },
                      {
                        text: `Les congés annuels de trente (30) jours consécutifs au titre de l'exercice 2023 sont, pour compter de la date de notification de la présente décision, accordés aux fonctionnaire de la ${structure} conformément au tableau ci-après:`,
                      },
                    ],
                  },
                ],
                margin: [0, 0, 0, 10],
              },
            ],
          },
        ],
      },

      {
        table: {
          widths: [20, 150, 60, 60, 80, 100],
          headerRows: 1,
          keepWithHeaderRows: 1,
          body: buildDecisionCongeFonctionnaire(personnels),
        },
      },
      textFooter,
      {
        stack: [
          {
            columns: [
              {
                stack: [
                  {
                    fontSize: 9,
                    text: "AMPLIATIONS:",
                    width: "auto",
                    style: "objetStyle",
                  },
                  {
                    text: "- MINADER/SG/DRH/SDP/SPF/BACo",
                    bold: true,
                    fontSize: 8,
                    marginLeft: 10,
                  },
                  {
                    text: "- MINFI/DGB/CF/MINADER",
                    bold: true,
                    fontSize: 8,
                    marginLeft: 10,
                  },
                  {
                    text: "- Intéressé(e)/Dossier",
                    bold: true,
                    fontSize: 8,
                    marginLeft: 10,
                  },
                  {
                    text: "- Archive/Chrono",
                    bold: true,
                    fontSize: 8,
                    marginLeft: 10,
                  },
                ],
              },
              {
                // star-sized columns fill the remaining space
                // if there's more than one star-column, available width is divided equally
                text: "Yaoundé, le",
                width: "40%",
                fontSize: 10,
              },
            ],
          },
        ],
      },
    ],
    images: {
      minaderLogo: logoMinaderImage,
    },
    defaultStyle: {
      margin: [0, 0, 0, 0],
      fontSize: 10,
    },
    styles: tableStyle,
  };

  function pdfDownload() {
    try {
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      alert(error);
      // gestion des erreurs
    }
  }

  return (
    <div>
      <CButton
        onClick={pdfDownload}
        className="mr-2"
        size="sm"
        color="success"
        style={{ color: "white" }}
        disabled={disabled}
      >
        <FontAwesomeIcon icon={faPrint} className="mr-2" />
        Decision des Congés Fonctionnaire
      </CButton>
    </div>
  );
};

export default DecisionCongeFonctionnaire;
