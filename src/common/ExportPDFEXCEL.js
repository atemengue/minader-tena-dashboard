import * as moment from "moment";
import "moment/locale/fr";
import React, { createRef, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import TheExtractButton from "../containers/TheExtractButton";
import { tableStyle } from "../utils/dataTables";
import { buildHeader, buildTableRapideExportData } from "../utils/functions";
import { logoMinaderImage } from "../utils/logoBase";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ExportPDFEXCEL = ({ fields, personnels, title, subtitle, selected }) => {
  const [dataFormExcel, setDataFormExcel] = useState(personnels);

  useEffect(() => {
    FormatData();
  }, [personnels]);

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
    personnels.map((personnel) => {
      data.push({
        Matricule: checkMatricule(personnel?.matricule),
        "Matricule Sans Tiret": getMatriculeSansTiret(
          checkMatricule(personnel?.matricule)
        ),
        MatriculeRH: personnel?.matricule,
        "Noms et Prenoms": personnel?.nomsPrenoms,
        Noms: personnel?.noms,
        Prenoms: personnel?.prenoms,
        "Date de Recrutement": personnel?.dateRecrutement,
        "Date de Naissance": personnel?.dateNaissance,
        Age: personnel?.age,
        "Lieu de Naissance": personnel?.lieuNaissance,
        corps: personnel?.grade?.corp?.libelleCorps,
        "Annee de Retraite": personnel?.anneeRetraite,
        "date de Retraite": personnel?.dateRetraite,
        echelon: personnel?.echelon,
        indice: personnel?.indice,
        Categorie: personnel?.grade.categorieIdCategorie,
        Grade: personnel?.grade.libelleGrade,
        Position: personnel?.position.libelle,
        "Designation Administrative": personnel?.Structure,
        Poste: personnel?.postes[0]?.libellePoste,
        sexe: personnel?.sexe
      });
    });
    setDataFormExcel(data);
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

      buildTableRapideExportData(personnels, ["N°", ...fields]),
      {
        stack: [`Total:  ${personnels.length}`],
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
    <TheExtractButton pdfDownload={pdfDownload} excelDownload={excelDownload} />
  );
};

export default ExportPDFEXCEL;
