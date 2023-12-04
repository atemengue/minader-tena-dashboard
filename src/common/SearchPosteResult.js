import { CBadge, CButton, CDataTable, CImg, CLink } from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BUCKET_URL } from "../config";
import { fieldsPosteResearch, getBadge } from "../utils/dataTables";

const SearchPosteResult = ({ postes }) => {
  return (
    <CDataTable
      fields={fieldsPosteResearch}
      itemsPerPage={50}
      items={postes}
      pagination
      itemsPerPageSelect
      hover
      sorter
      tableFilter
      columnFilter
      clickableRows
      bordered
      onRowClick={(item) => <CLink to={`/postes/details/${item?.idPoste}`} />}
      scopedSlots={{
        Numero: (item, index) => <td>{index}</td>,
        matricule: (item, index) => {
          return item.occupant !== " " ? (
            <td key={index}>{item.matricule}</td>
          ) : (
            <td key={index}>{<CBadge color="danger">Poste vacant</CBadge>}</td>
          );
        },
        picture: (item, index) => (
          <div
            className="c-avatar d-flex justify-content-center
          align-items-center
          "
          >
            <CImg
              src={
                item?.photo
                  ? `${BUCKET_URL}/personnels/${item.personnelIdArchive}/${item.photo}`
                  : `${BUCKET_URL}/default/user.png`
              }
              alt="photo de profil"
              className="c-avatar-img"
            />
          </div>
        ),
        Voir: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                to={`postes/details/${item.idPoste}`}
              >
                Voir
              </CButton>
            </td>
          );
        },
      }}
    />
  );
};

export default SearchPosteResult;
