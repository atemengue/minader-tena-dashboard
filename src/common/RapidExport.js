import * as moment from "moment";
import "moment/locale/fr";
import React, { createRef } from "react";
import { CSVLink } from "react-csv";
import TheExtractButton from "../containers/TheExtractButton";
import { tableStyle } from "../utils/dataTables";
import { buildHeader, buildTableRapideExportData } from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const RapidExport = (props) => {
  const csvLink = createRef();

  const headers = [
    { label: "Matricule", key: "matricule" },
    { label: "Noms et Prenoms", key: "nomsPrenoms" },
    { label: "Noms", key: "noms" },
    { label: "Prenoms", key: "prenoms" },
    { label: "Date de Recrutement", key: "dateRecrutement" },
    { label: "Date de Naissance", key: "dateNaissance" },
    { label: "Age", key: "age" },
    { label: "Lieu de Naissance", key: "lieuNaissance" },
    { label: "Annee de Retraite", key: "anneeRetraite" },
    { label: "date de Retraite", key: "dateRetraite" },
    { label: "Categorie", key: "categorie" },
    { label: "Grade", key: "grade.libelleGrade" },
    { label: "Position", key: "position.libelle" },
    {
      label: "Designation Administrative",
      key: "structure.designationAdministrative",
    },
    { label: "Poste ", key: "postes[0].libellePoste" },
  ];

  const ExcelFileName = `${props.title}.csv`;

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
                text: "DRH MINADER",
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
        stack: [`${props.title}`],
        style: "header",
      },
      {
        stack: [`${props?.subtitle}`],
        style: "subheader",
      },
      buildTableRapideExportData(props.personnels, ["N°", ...props.fields]),
      {
        stack: [`Total:  ${props.personnels.length}`],
        style: "total",
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
      <TheExtractButton
        pdfDownload={pdfDownload}
        excelDownload={excelDownload}
      />
    </>
  );
};

export default RapidExport;
