import { CButton } from "@coreui/react";
import { faCertificate, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "moment/locale/fr";
import React from "react";
import { tableStyle } from "../utils/dataTables";
import { buildHeaderSDP, buildTableRapideExportData } from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ExportDecisionAffectationPDF = ({
  fields,
  personnels,
  title,
  subtitle,
  corps,
  docHeaderText,
}) => {
  // const buildTableDecisionAffectation = (data) => {
  //   let index = 1;
  //   let body = [];

  //   let header = [
  //     { text: "N°", alignment: "center", bold: true },
  //     { text: "Matricule", bold: true, alignment: "center" },
  //     { text: "Noms et Prénoms", bold: true, alignment: "center" },
  //     // { text: "Grade", bold: true, alignment: "center" },
  //     // { text: "Motif", bold: true, alignment: "center" },
  //     // { text: "Ancien Poste d'affectation", bold: true, alignment: "center" },
  //     // { text: "Poste d'affectation", bold: true, alignment: "center" },
  //   ];

  //   body.push(header);

  //   for (let key in data) {
  //     let corps = [
  //       {
  //         text: key,
  //         bold: true,
  //         colSpan: 3,
  //         alignment: "center",
  //       },
  //       {},
  //       { text: "Header 3", style: "tableHeader", alignment: "center" },
  //       { text: "Header 3", style: "tableHeader", alignment: "center" },
  //     ];
  //     body = [...body, corps];

  //     data[key].personnels.map((personnel) => {
  //       let array = [
  //         { text: index++ + ".", alignment: "center" },
  //         {
  //           text: personnel.matricule,
  //           style: "tableHeader",
  //           alignment: "center",
  //         },
  //         { text: personnel.nomsPrenoms, style: "tableHeader" },
  //         { text: personnel.nomsPrenoms, style: "tableHeader" },
  //       ];
  //       body = [...body, array];
  //     });
  //   }

  //   return body;
  // };

  const buildHeader = (fields, key) => {
    let incr = 1;
    let header = [
      {
        text: key,
        bold: true,
        colSpan: fields.length,
        alignment: "center",
      },
    ];
    while (incr < fields.length) {
      header = [
        ...header,
        { text: "Header 3", style: "tableHeader", alignment: "center" },
      ];
      incr++;
    }

    console.log(header, "THE HEADER");
    return header;
  };

  const buildDecisionAffectation = (data, fields) => {
    let index = 1;
    var body = [];
    body.push(fields);

    for (let key in data) {
      let header = buildHeader(fields, key);

      body = [...body, header];

      data[key].personnels.map(function (row, index) {
        var dataRow = [];
        row["N°"] = index + 1;
        let nomsPrenoms = row !== null ? row.nomsPrenoms : "";
        row["Noms & Prenoms"] = nomsPrenoms;
        let matricule = row !== null ? row.matricule : "";
        row["Matricule"] = matricule;
        let grade = row.grade !== null ? row.grade.libelleGrade : " ";
        row["Grade"] = grade;
        let motif = row.motif !== null ? row.motif : " ";
        row["Motif"] = motif;

        let AncienPosteAffectation =
          row.AncienPosteAffectation !== null
            ? row.AncienPosteAffectation
            : " ";
        row["Ancien poste d'affectation"] = AncienPosteAffectation;

        let NouveauPosteAffectation =
          row.NouveauPosteAffectation !== null
            ? row.NouveauPosteAffectation
            : " ";
        row["Nouveau poste d'affectation"] = NouveauPosteAffectation;

        fields.map(function (column, index) {
          dataRow.push({
            text: row[column].toString(),
            alignment: "left",
          });
        });
        body.push(dataRow);
      });
    }

    return body;
  };

  const buildTableDecisionAffectation = (data, fields) => {
    return {
      table: {
        headerRows: 1,
        body: buildDecisionAffectation(data, fields),
      },
    };
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
        stack: [`${title}`],

        style: "header",
      },
      buildTableDecisionAffectation(personnels, ["N°", ...fields]),
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
      {/* <CButton onClick={pdfDownload} size="md" color="info">
        <FontAwesomeIcon className="mr-2" icon={faSave} />
        Sauvegarde la décision
      </CButton> */}
      <CButton onClick={pdfDownload} size="md" color="success">
        <FontAwesomeIcon className="mr-2" icon={faCertificate} />
        Imprimer la décision
      </CButton>
    </>
  );
};

export default ExportDecisionAffectationPDF;
