import * as moment from "moment";
import React from "react";
import TheExtractButton from "../../containers/TheExtractButton";
import { tableStyle } from "../../utils/dataTables";
import { buildBobyGrille, buildHeader } from "../../utils/functions";
import { logoMinaderImage } from "../../utils/logoBase";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ClassificationPDF = (props) => {
  // const csvLink = createRef();
  // const headers = [
  //   { label: "Categorie", key: "categorie" },
  //   { label: "Effectif PAIE(Antillope)", key: "effectifPAIE" },
  //   { label: "Effecti RH", key: "effectifRH" },
  // ];

  // const ExcelFileName = "EFFECTIS PERSONNEL PAR CATEGORIE";

  const grille = props.grille;
  const total = props.total;

  var docDefinition = {
    pageOrientation: "landscape",

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
        stack: ["CLASSIFICATION DU PERSONNELS ACTIFS PAR CORPS"],

        style: "header",
      },
      {
        color: "#444",
        table: {
          widths: ["35%", "55%", "10%"],
          headerRows: 1,
          // keepWithHeaderRows: 1,
          body: buildBobyGrille(grille, total),
        },
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

  // function excelDownload() {
  //   return csvLink.current.link.click();
  // }

  function pdfDownload() {
    try {
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {/* <CSVLink
        headers={headers}
        data={props.socle}
        filename={ExcelFileName}
        className="hidden"
        ref={csvLink}
        target="_blank"
      /> */}
      <TheExtractButton pdfDownload={pdfDownload} />
    </>
  );
};

export default ClassificationPDF;
