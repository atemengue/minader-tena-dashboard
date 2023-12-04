import * as moment from "moment";
import "moment/locale/fr";
import React, { createRef } from "react";
import { CSVLink } from "react-csv";
import TheExtractButton from "../containers/TheExtractButton";
import { tableStyle } from "../utils/dataTables";
import { buildHeader, buildTablePoste } from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// renomer en position export
const PostePDF = (props) => {
  const csvLink = createRef();

  const headers = [
    { label: "idPoste", key: "idPoste" },
    { label: "Poste ", key: "libellePoste" },
    { label: "Occupant", key: "Occupant" },
    { label: "noms", key: "noms" },
    { label: "Prenoms", key: "prenoms" },
    { label: "Matricule", key: "Matricule" },
    {
      label: "Date de Naissance",
      key: "dateNaissance",
    },
    {
      label: "Lieu de Naissance",
      key: "lieuNaissance",
    },
    {
      label: "date de Retraite",
      key: "dateRetraite",
    },
    {
      label: "Annee de Retraite",
      key: "anneeRetraite",
    },
    {
      label: "Categorie",
      key: "categorie",
    },
    { label: "Position", key: "Position" },
    {
      label: "Grade",
      key: "grade",
    },
    { label: "Designation Administrative", key: "Structure" },
    { label: "Region", key: "_region" },
    { label: "departement", key: "_departement" },
    { label: "arrondissement", key: "_arrondissement" },
    { label: "Nature du Poste ", key: "_naturePoste" },
    { label: "Rang du Poste", key: "_rangPoste" },
  ];

  const ExcelFileName = `Listes_des_responsables ${props.structure}.csv`;

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
          `${props.structure}`,
          [
            {
              stack: ["Listes Responsables"],
              style: "subheader",
            },
          ],
        ],

        style: "header",
      },

      buildTablePoste(props.personnels, [
        "N°",
        "libellePoste",
        "Structure",
        "Occupant",
        "Matricule",
        "Position",
        "rangPoste",
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
        data={props.personnels}
        filename={ExcelFileName}
        className="hidden"
        ref={csvLink}
        target="_blank"
      />

      <TheExtractButton pdfDownload={pdfDownload} excelDownload={excelDownload}>
        {props.children}
      </TheExtractButton>
    </>
  );
};

export default PostePDF;
