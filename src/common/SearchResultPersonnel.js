import { CBadge, CCol, CDataTable, CImg, CLink, CTooltip } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { BUCKET_URL } from "../config";
import { fieldsPersonnelResearch, getBadge } from "../utils/dataTables";
import CardResultPersonnel from "./CardResultPersonnel";

const SearchResultPersonnel = ({ personnels }) => {
  return (
    <CDataTable
      fields={fieldsPersonnelResearch}
      itemsPerPage={5}
      items={personnels}
      pagination
      itemsPerPageSelect
      hover
      sorter
      tableFilter
      columnFilter
      clickableRows
      bordered
      scopedSlots={{
        Numero: (item, index) => <td>{index}</td>,
        Personnel: (item, index) => <CardResultPersonnel personnel={item} />,
      }}
    />
  );
};

export default SearchResultPersonnel;
