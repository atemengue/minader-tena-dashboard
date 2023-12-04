import React, { createRef } from "react";
import { logoMinaderImage } from "../../utils/logoBase";
import { buildTableSocle, buildHeader } from "../../utils/functions";
import * as moment from "moment";
import TheExtractButton from "../../containers/TheExtractButton";
import { CSVLink } from "react-csv";
import { tableStyle } from "../../utils/dataTables";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const SoclePDF = (props) => {
  const csvLink = createRef();
  const headers = [
    { label: "Categorie", key: "categorie" },
    { label: "Effectif PAIE(Antillope)", key: "effectifPAIE" },
    { label: "Effecti RH", key: "effectifRH" },
  ];

  const ExcelFileName = "EFFECTIS PERSONNEL PAR CATEGORIE";

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
        stack: ["EFFECTIFS DU PERSONNEL PAR CATEGORIE"],

        style: "header",
      },
      buildTableSocle(props.socle, [
        "N°",
        "categorie",
        "effectifPAIE",
        "effectifRH",
      ]),
    ],
    images: {
      minaderLogo: logoMinaderImage,
    },
    defaultStyle: {
      margin: [0, 0, 0, 0],
    },
    styles: tableStyle,
  };

  function excelDownload() {
    return csvLink.current.link.click();
  }

  function pdfDownload() {
    try {
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <CSVLink
        headers={headers}
        data={props.socle}
        filename={ExcelFileName}
        className="hidden"
        ref={csvLink}
        target="_blank"
      />
      <TheExtractButton
        pdfDownload={pdfDownload}
        excelDownload={excelDownload}
      />
    </>
  );
};

export default SoclePDF;
