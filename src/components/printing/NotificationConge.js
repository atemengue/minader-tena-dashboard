import { CButton, CImg, CTooltip } from "@coreui/react";
import moment from "moment";
import React from "react";
import { getLettre, tableStyle } from "../../utils/dataTables";
import { buildHeaderBaco } from "../../utils/functions";
import { logoMinaderImage } from "../../utils/logoBase";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const NotificationConge = ({ personnel, conge }) => {
  console.log(conge);
  const {
    sexe,
    nomsPrenoms,
    grade,
    matricule,
    categorieIdCategorie,
    positionAdministrative,
    postes,
    structure,
    grade: { statutAdministratif },
    departement,
    arrondissement,
    region,
  } = personnel;

  const docDefinition = {
    content: [
      buildHeaderBaco(),
      {
        columns: [
          {
            text: "N°__________/NC/MINADER/SG/DRH/SDP/SPNF/BACO",
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
        margin: [0, 10, 0, 10],
      },
      {
        columns: [
          {
            stack: [
              {
                text: "NOTIFICATION DE CONGE",
              },
            ],
            style: "ncTitle",
          },
        ],
      },
      {
        fontSize: 14,
        lineHeight: 1.5,
        alignment: "justify",
        stack: [
          {
            text: [
              {
                text:
                  "Le Ministre de l'Agriculture et du Developpement Rural soussigné, notifie",
              },
            ],
            marginLeft: 40,
          },
          {
            text: [
              `pour compter du ${moment(conge.dateDebut)
                .locale("fr")
                .format("LL")} à `,
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
              }, un conge de ${
                statutAdministratif && statutAdministratif.idStatut === 1
                  ? "trente (30)"
                  : "vingt (20)"
              } jours consecutifs, accorde par Decision n°${
                conge.numeroActePartOne + "/" + conge.numeroActePartTwo
              } du`,
              ` ${moment(conge.dateDecision)
                .locale("fr")
                .format("LL")} en jouir a ${
                arrondissement.libelleArrondissement
              }, Departement  ${departement.libelleDepartement}, Region ${
                region.libelleRegion
              }. `,
            ],
          },
        ],
      },

      {
        fontSize: 14,
        lineHeight: 1.5,
        alignment: "justify",
        stack: [
          {
            text: [
              {
                text:
                  "L'interesse n'ayant pas beneficie de permission d'absence a deduire dudit",
              },
            ],
            marginLeft: 30,
          },
          `conge, reprendra le service le  ${moment(
            conge.dateDebut,
            "YYYY-MM-DD"
          )
            .add(statutAdministratif.idStatut === 1 ? 30 : 20, "days")
            .locale("fr")
            .format("LL")}  a 7heures 30 minutes.`,
        ],
        style: "columnMarge",
      },
      {
        fontSize: 14,
        lineHeight: 1.5,
        alignment: "justify",
        stack: [
          {
            text: [
              { text: "En foi de quoi,", marginLeft: 30 },
              " la présente notificatiom de congé est établie pour servir et ",
            ],
            marginLeft: 30,
          },
          "valoir ce que de droit. /-",
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
    <CTooltip placement="bottom" content={"Afficher Notification en Conge"}>
      <CButton onClick={pdfDownload}>
        <CImg fluid width="50" height="50" src="icons/conge.svg" />
        <div className="m-1">
          <h6>Notification Conge</h6>
        </div>
      </CButton>
    </CTooltip>
  );
};

export default NotificationConge;
