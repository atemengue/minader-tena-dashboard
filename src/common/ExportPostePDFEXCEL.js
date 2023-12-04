import * as moment from "moment";
import "moment/locale/fr";
import React, { createRef, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";

import TheExtractButton from "../containers/TheExtractButton";
import { tableStyle } from "../utils/dataTables";
import {
  buildHeader,
  buildTableExportPoste,
  buildTablePoste,
  buildTableRapideExportData,
} from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ExportPostePDFEXCEL = ({ fields, postes, title, subtitle, selected }) => {
  const [dataFormExcel, setDataFormExcel] = useState(postes);

  useEffect(() => {
    FormatData();
  }, [postes]);

  const checkMatricule = (matricule) => {
    if (
      /^[0-9][0-9][0-9][0-9][0-9][0-9]-[A-Z]$/.test(matricule) ||
      /^[A-Z]-[0-9][0-9][0-9][0-9][0-9][0-9]$/.test(matricule)
    ) {
      return matricule;
    } else {
      return "ECI";
    }
  };

  const getMatriculeSansTiret = (matricule) => {
    if (matricule && matricule.includes("-")) {
      const splitData = matricule.split("-");
      matricule =
        splitData.length > 1 ? `${splitData[0]}${splitData[1]}` : splitData[0];
    }
    return matricule;
  };

  const FormatData = () => {
    let data = [];
    postes.map((personnel) => {
      data.push({
        Matricule: checkMatricule(personnel?.Matricule),
        "Matricule Sans Tiret": getMatriculeSansTiret(
          checkMatricule(personnel?.Matricule)
        ),
        MatriculeRH: personnel?.Matricule,
        "Noms et Prenoms": personnel["Noms & Prenoms"],
        "Date de Naissance": personnel.personnel?.dateNaissance,
        "Lieu de Naissance": personnel?.personnel?.lieuNaissance,
        sexe: personnel?.personnel?.ssexe,
        "Annee de Retraite": personnel?.personnel?.anneeRetraite,
        "date de Retraite": personnel?.personnel?.dateRetraite,
        Categorie: personnel?.Categorie,
        Grade: personnel?.Grade,
        Position: personnel?.Position,
        "Designation Administrative": personnel?.Structure,
        Poste: personnel?.libellePoste,
      });
    });
    //   setDataFormExcel(data);
  };
  const ExcelFileName = `${title}-${subtitle}.xlsx`;

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
        stack: [`${title}`],
        style: "header",
      },
      {
        stack: [`${subtitle}`],
        style: "subheader",
      },

      buildTablePoste(postes, ["N°", ...fields]),
      {
        stack: [`Total:  ${postes.length}`],
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
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(dataFormExcel);
    XLSX.utils.book_append_sheet(wb, ws, "page1");
    XLSX.writeFile(wb, ExcelFileName);
  }

  return (
    <>
      <TheExtractButton
        pdfDownload={pdfDownload}
        excelDownload={excelDownload}
      />
    </>
  );
};

export default ExportPostePDFEXCEL;
