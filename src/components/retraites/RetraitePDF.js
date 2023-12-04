import * as moment from "moment";
import React, { createRef } from "react";
import { CSVLink } from "react-csv";
import TheExtractButton from "../../containers/TheExtractButton";
import { getMonthName, tableStyle } from "../../utils/dataTables";
import { buildHeader, buildTable } from "../../utils/functions";
import { logoMinaderImage } from "../../utils/logoBase";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const RetraitePDF = (props) => {
  const csvLink = createRef();
  const headers = [
    { label: "Matricule", key: "matricule" },
    { label: "Matricule Sans Tiret", key: "matriculeSansTiret" },
    { label: "Noms et Prenoms", key: "nomsPrenoms" },
    { label: "Noms", key: "noms" },
    { label: "Prenoms", key: "prenoms" },
    { label: "Date de Naissance", key: "dateNaissance" },
    { label: "Lieu de Naissance", key: "lieuNaissance" },
    { label: "Annee de Retraite", key: "anneeRetraite" },
    { label: "date de Retraite", key: "dateRetraite" },
    { label: "Categorie", key: "categorieIdCategorie" },
    { label: "Grade", key: "grade.libelleGrade" },
    { label: "Position", key: "position.libelle" },
    { label: "Designation Administrative", key: "Structure" },
    { label: "Poste ", key: "Poste" },
  ];

  const ExcelFileName = `Personnel-Retraite${props.annee}.csv`;
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
        stack: [`LISTE DU PERSONNEL EN RETRAITE: ${props.annee}`],
        style: "header",
      },
      {
        stack: [
          `${
            props.mois !== "0"
              ? `MOIS DE ${getMonthName(props.mois).toLocaleUpperCase()}`
              : ""
          }`,
        ],
        style: "subheader",
      },

      buildTable(props.retraites, [
        "N°",
        "matricule",
        "nomsPrenoms",
        "dateNaissance",
        "lieuNaissance",
        "anneeRetraite",
        "dateRetraite",
        "categorieIdCategorie",
      ]),
      {
        stack: [`TOTAL ANNEE: ${props.annee}:  ${props.retraites.length}`],
        style: "total",
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

  function excelDownload() {
    return csvLink.current.link.click();
  }

  return (
    <>
      <CSVLink
        headers={headers}
        data={props.retraites}
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

export default RetraitePDF;
