import * as moment from "moment";
import "moment/locale/fr";
import React, { createRef } from "react";
import { CSVLink } from "react-csv";
import TheExtractButton from "../containers/TheExtractButton";
import { tableStyle } from "../utils/dataTables";
import { buildHeader, buildTableRang } from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// renomer en position export
const ExportPoste = (props) => {
  const csvLink = createRef();

  const headers = [
    { label: "Matricule", key: "Matricule" },
    // { label: "Matricule Sans Tiret", key: "matriculeSansTiret" },
    { label: "Noms et Prenoms", key: "Occupant" },
    { label: "Noms", key: "noms" },
    { label: "Prenoms", key: "prenoms" },
    { label: "Categorie", key: "Categorie" },
    { label: "Grade", key: "Grade" },
    { label: "Rang Poste", key: "Rang Poste" },
    { label: "NaturePoste", key: "Nature Poste" },
    {
      label: "Designation Administrative",
      key: "Structure",
    },
    { label: "Poste ", key: "libellePoste" },
    { label: "idPoste ", key: "idPoste" },
    { label: "Nature du Poste ", key: "naturePoste.libelleNaturePoste" },
    { lable: "Rang du Poste", key: "naturePoste.rangPoste.libelleRangPoste" },
  ];

  const ExcelFileName = `Personnel-${props.statut}.csv`; // modifier ici

  var docDefinition = {
    pageOrientation: "landscape",

    footer: function (currentPage, pageCount) {
      return {
        table: {
          widths: ["*", "*", "*"],
          body: [
            [
              {
                text: "Page " + currentPage,
                alignment: "left",
                style: "footer",
              },
              {
                text: "SOURCE | Ressources Humaines RHFile",
                alignment: "center",

                style: "footer",
              },
              {
                text: "édité le: " + moment().locale("fr").format("LL"),
                style: "footer",
                alignment: "right",
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
        stack: [
          `${props.statut}`,
          [
            {
              stack: ["Listes des Responsables"],
              style: "subheader",
            },
          ],
        ],

        style: "header",
      },

      buildTableRang(props.postes, [
        "N°",
        "libellePoste",
        "Structure",
        "Occupant",
        "Matricule",
        "Position",
        "Nature Poste",
        "Rang Poste",
      ]),
      // {
      //   stack: [`${props.structure}:  ${props.personnels.length}`],
      //   style: "total",
      // },
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

  function excelDownload() {
    return csvLink.current.link.click();
  }

  return (
    <>
      <CSVLink
        headers={headers}
        data={props.postes}
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

export default ExportPoste;
