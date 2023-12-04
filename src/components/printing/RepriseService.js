import { CButton, CImg, CTooltip } from "@coreui/react";
import React from "react";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const RepriseServive = ({}) => {
  return (
    <CTooltip placement="bottom" content={"Afficher la reprise de service"}>
      <CButton disabled>
        <CImg fluid width="50" height="50" src="icons/reprise.svg" />
        <div className="m-1">
          <h6>Reprise de service</h6>
        </div>
      </CButton>
    </CTooltip>
  );
};

export default RepriseServive;
