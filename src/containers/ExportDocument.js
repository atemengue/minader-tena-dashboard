import React, { createRef } from "react";
import { logoMinaderImage } from "../utils/logoBase";
import { buildFooter, buildHeader, buildTable } from "../utils/functions";
import * as moment from "moment";
import TheExtractButton from "./TheExtractButton";
import { tableStyle } from "../utils/dataTables";
import { CSVLink } from "react-csv";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ExportDocument = (props) => {
  const csvLink = createRef();

  function pdfDownload() {
    try {
      pdfMake.createPdf(docDefinition).open();
    } catch (error) {
      alert(error); // gerer l'erreur ici
    }
  }

  function excelDownload() {
    return csvLink.current.link.click();
  }

  return (
    <>
      <CSVLink
        headers={props.headers}
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

export default ExportDocument;
