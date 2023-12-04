import { CDataTable, CImg } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { fieldsActeResearch } from "../utils/dataTables";

const SearchActeResult = ({ actes }) => {
  return (
    <CDataTable
      fields={fieldsActeResearch}
      itemsPerPage={50}
      items={actes}
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
      }}
    />
  );
};

export default SearchActeResult;
