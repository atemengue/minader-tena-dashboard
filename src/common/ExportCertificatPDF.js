import { CButton } from "@coreui/react";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "moment/locale/fr";
import React from "react";
import { tableStyle } from "../utils/dataTables";
import { buildHeaderSDP } from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");

const ExportCertificatPDF = ({
  fields,
  personnels,
  title,
  subtitle,
  corps,
  docHeaderText,
  textFooter,
}) => {
  var html = htmlToPdfmake(docHeaderText);
  var textFooter = htmlToPdfmake(textFooter);

  const buildTableCertificatCollectif = (data) => {
    let index = 1;
    let body = [];

    let header = [
      { text: "N°", alignment: "center", bold: true, fontSize: 13 },
      { text: "MATRICULE", bold: true, alignment: "center", fontSize: 13 },
      {
        text: "NOMS ET PRENOMS",
        bold: true,
        alignment: "center",
        fontSize: 13,
      },
    ];

    body.push(header);

    for (let key in data) {
      let corps = [
        {
          text: key,
          bold: true,
          colSpan: 3,
          alignment: "center",
          fontSize: 13,
        },
        {},
        { text: "Header 3", style: "tableHeader", alignment: "center" },
      ];
      body = [...body, corps];

      data[key].personnels.map((personnel) => {
        let array = [
          { text: index++ + ".", alignment: "center", fontSize: 13 },
          {
            text: personnel.matricule,
            style: "tableHeader",
            alignment: "center",
            fontSize: 13,
          },
          { text: personnel.nomsPrenoms, style: "tableHeader", fontSize: 13 },
        ];
        body = [...body, array];
      });
    }

    return body;
  };

  var docDefinition = {
    footer: function (currentPage, pageCount) {
      return {
        table: {
          body: [
            [
              {
                text: "Page " + currentPage + "/" + pageCount,
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
      buildHeaderSDP(),

      {
        columns: [
          {
            text: "N°__________/MINADER/SG/DRH/SDP",
            fontSize: 11,
            width: "60%",
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            text: "Yaoundé, le",
            width: "40%",
            fontSize: 11,
          },
        ],
        margin: [0, 10, 0, 15],
      },

      {
        stack: [`${title}`],

        style: "header",
      },
      html,
      {
        stack: [""],
        margin: [0, 20, 0, 0],
      },
      // `\u200B\t`,
      // `\u200B\t${html}`,
      // columns: [
      //   {
      //     fontSize: 14,
      //     lineHeight: 1.5,

      //     alignment: "justify",
      //     margin: [0, 5, 0, 20],

      //     // stack: [
      //     //   {
      //     //     text: `\u200B\t ${docHeaderText}`,
      //     //   },
      //     // ],
      //   },

      // ],

      {
        table: {
          widths: ["auto", 100, "*"],
          headerRows: 1,
          // keepWithHeaderRows: 1,
          body: buildTableCertificatCollectif(personnels),
        },
      },
      textFooter,
      // {
      //   fontSize: 14,
      //   lineHeight: 1.5,
      //   alignment: "justify",
      //   stack: [
      //     {
      //       text: [
      //         { text: "En foi de quoi", marginLeft: 30 },
      //         " la présente de prise de Service est établie ",
      //       ],
      //       marginLeft: 30,
      //     },
      //     "pour servir et valoir ce que de droit. /-",
      //   ],
      //   style: "columnMarge",
      // },
      {
        stack: [
          {
            fontSize: 11,
            text: "Ampliations:",
            width: "auto",
            style: "objetStyle",
          },
          {
            text: "- MINADER/SG/DRH/SDP/SPNF",
            bold: true,
            fontSize: 10,
            marginLeft: 10,
          },
          {
            text: "- Intéressé(e)/Dossier",
            bold: true,
            fontSize: 10,
            marginLeft: 10,
          },
          {
            text: "- Archive/Chrono",
            bold: true,
            fontSize: 10,
            marginLeft: 10,
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
    }
  }

  return (
    <>
      <CButton onClick={pdfDownload} size="md" color="success">
        <FontAwesomeIcon className="mr-2" icon={faCertificate} />
        Imprimer le certificat
      </CButton>
    </>
  );
};

export default ExportCertificatPDF;
