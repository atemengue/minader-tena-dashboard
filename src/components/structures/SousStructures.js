import {
  CButton,
  CCol,
  CCollapse,
  CDataTable,
  CRow,
  CTooltip,
} from "@coreui/react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { fieldsSousStructure } from "../../utils/dataTables";
import PersonnelListCollapse from "../personnels/PersonnelListCollapse";

const SousStructure = ({ structures }) => {
  let settingsState = [];

  structures.map((structure) => {
    settingsState = [
      ...settingsState,
      { id: structure.idStructure, open: false },
    ];
  });

  const [settings, setSettings] = useState(settingsState);

  const [personnelList, setPersonnelList] = useState([]);
  const [structureName, setStructureName] = useState("");

  const onEntering = () => {};
  const onEntered = () => {};
  const onExiting = () => {};
  const onExited = () => {};

  // const handleClick = (id) => {
  //   (id);
  //   setSettings(...settings)
  //   // setSettings((state) => ({
  //   //   ...state,
  //   //   settings: settings.map((item) =>
  //   //     item.id === id ? { ...item, open: !item.open } : item
  //   //   ),
  //   // }));
  //   // e.preventDefault();
  // };

  const [details, setDetails] = useState([]);

  const toggleDetails = (data, index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
    setPersonnelList(data.personnels);
    setStructureName(data.designationAdministrative);
  };

  return (
    <>
      <CRow className="mb-3 mt-3">
        <CCol xs="12" md="12" className="d-flex justify-content-between">
          <h4>Total de structure: {structures.length}</h4>
        </CCol>
      </CRow>
      <CDataTable
        fields={fieldsSousStructure}
        itemsPerPage={10}
        itemsPerPageSelect
        items={structures}
        pagination
        hover
        sorter
        tableFilter
        columnFilter
        clickableRows
        striped
        bordered
        scopedSlots={{
          Numero: (item, index) => <td>{index}</td>,
          designationAdministrative: (item, index) => {
            return (
              <td key={index}>
                {item.designationAdministrative}
                <CCollapse
                  key={index}
                  onEntering={onEntering}
                  onEntered={onEntered}
                  onExiting={onExiting}
                  onExited={onExited}
                ></CCollapse>
              </td>
            );
          },
          Voir: (item, index) => {
            return (
              <td className="py-2">
                <CTooltip content="Afficher la liste du personnel">
                  <CButton
                    onClick={() => toggleDetails(item, index)}
                    color="info"
                    shape="square"
                    size="sm"
                  >
                    <FontAwesomeIcon className="mr-2" icon={faEye} />
                    Voir
                  </CButton>
                </CTooltip>
              </td>
            );
          },
          total: (item, index) => {
            return (
              <td key={index} className="py-2">
                {item?.personnels.length}
              </td>
            );
          },
          postes: (item, index) => {
            return (
              <td key={index} className="py-2">
                {item?.postes.length}
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <PersonnelListCollapse
                  structure={structureName}
                  personnels={personnelList}
                />
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default SousStructure;
