import { CButton, CImg, CTooltip } from "@coreui/react";
import React from "react";
import { getLettre, tableStyle } from "../../utils/dataTables";
import { buildHeaderBaco } from "../../utils/functions";
import { logoMinaderImage } from "../../utils/logoBase";
var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PresenceEffective = ({ personnel }) => {
  const {
    sexe,
    nomsPrenoms,
    grade,
    matricule,
    categorieIdCategorie,
    positionAdministrative,
    postes,
    structure,
  } = personnel;

  const docDefinition = {
    content: [
      buildHeaderBaco(),
      {
        columns: [
          {
            text: "N°__________/APES/MINADER/SG/DRH/SDP/SPNF/BACO",
            fontSize: 11,
            width: "60%",
          },
          {
            // star-sized columns fill the remaining space
            // if there's more than one star-column, available width is divided equally
            text: "Yaoundé, le",
            width: "40%",
            fontSize: 11,
          },
        ],
        margin: [0, 30, 0, 30],
      },
      {
        columns: [
          {
            stack: [
              {
                text: "ATTESTATION DE PRESENCE EFFECTIVE",
              },
              {
                text: "AU SERVICE",
              },
            ],
            style: "apesTitle",
          },
        ],
      },
      {
        fontSize: 14,
        lineHeight: 2,

        alignment: "justify",
        stack: [
          {
            text: [
              {
                text:
                  "Le Ministre de l'Agriculture et du Developpement Rural, soussigné atteste que ",
              },
            ],
            marginLeft: 30,
          },
          {
            text: [
              `${sexe === "1" ? "Monsieur " : "Madame "}`,
              { text: `${nomsPrenoms}, `, bold: true },
              `${
                parseInt(categorieIdCategorie) >= 1 &&
                parseInt(categorieIdCategorie) <= 12
                  ? ""
                  : `${grade?.libelleGrade}`
              }(Mle ${matricule}), ${
                postes.length > 0
                  ? postes[0].libellePoste
                  : positionAdministrative
                  ? positionAdministrative.libelle
                  : ""
              } ${getLettre(structure?.natureStructureIdNatureStructure)} ${
                structure?.designationAdministrative
              }, est effectivement présent au service.`,
            ],
          },
        ],
      },

      {
        fontSize: 14,
        lineHeight: 2,
        alignment: "justify",
        stack: [
          {
            text: [
              { text: "En foi de quoi", marginLeft: 30 },
              " la présente Attestation de Présence Effective est établie ",
            ],
            marginLeft: 30,
          },
          "pour servir et valoir ce que de droit. /-",
        ],
        style: "columnMarge",
      },
      {
        stack: [
          {
            fontSize: 11,
            text: "Ampliations:",
            width: "auto",
            style: "objetStyle",
          },
          {
            text: "- MINADER/SG/DRH/SDP/SPNF",
            bold: true,
            fontSize: 10,
            marginLeft: 10,
          },
          {
            text: "- Intéressé(e)/Dossier",
            bold: true,
            fontSize: 10,
            marginLeft: 10,
          },
          {
            text: "- Archive/Chrono",
            bold: true,
            fontSize: 10,
            marginLeft: 10,
          },
        ],
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

  return (
    <CTooltip placement="bottom" content={"Afficher la presence effective"}>
      <CButton onClick={pdfDownload}>
        <CImg fluid width="50" height="50" src="icons/presence.svg" />
        <div className="m-1">
          <h6>Presence Effective</h6>
        </div>
      </CButton>
    </CTooltip>
  );
};

export default PresenceEffective;
