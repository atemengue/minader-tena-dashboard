import { CBadge, CCol, CDataTable, CImg, CLink, CTooltip } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { BUCKET_URL } from "../config";
import { fieldsPersonnelResearch, getBadge } from "../utils/dataTables";

const CardResultPersonnel = ({ personnel }) => {
  return (
    <div className="result">
      <div className=" d-flex align-items-center">
        <CCol
          md="2"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="c-avatar d-flex justify-content-center align-items-center">
            <div className="image_inner_container2">
              <CImg
                src={
                  personnel?.photo
                    ? `${BUCKET_URL}/personnels/${personnel.personnelIdArchive}/${personnel.photo}`
                    : `${BUCKET_URL}/default/user.png`
                }
                alt="photo de profil"
                id="img"
              />
            </div>
          </div>
        </CCol>

        <div className="result-detail">
          <div>
            <CTooltip content="Voir le profil du personnel">
              <CLink to={`/personnels/${personnel?.matricule}`}>
                {personnel?.nomsPrenoms} {personnel?.matricule}
              </CLink>
            </CTooltip>
          </div>

          <div>
            <span class="link" href="#">
              {personnel.grade}
            </span>
          </div>
          <div>
            <CTooltip content="Voir le poste">
              <CLink to={`postes/details/${personnel.idPoste}`}>
                {personnel?.poste}
              </CLink>
            </CTooltip>
          </div>
          <div>
            <CBadge color={getBadge(personnel.idPosition)}>
              {personnel.position}
            </CBadge>
          </div>
          <div>
            <CTooltip content="Voir le structure">
              <CLink to={`structures/${personnel.idStructure}`}>
                {personnel?.structure}
              </CLink>
            </CTooltip>
          </div>
          <div>
            <span>Contacts: {personnel.telephones}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResultPersonnel;
