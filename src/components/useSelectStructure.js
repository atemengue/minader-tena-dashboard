import { useState } from "react";

function useSelectStructure() {
  const [structureData, setstructureData] = useState({
    idStructure: null,
    designationAdministrative: "Selectionner la structure",
  });

  const [modalStructure, setModalStructure] = useState(false);

  const handleModalListStructure = () => {
    setModalStructure(!modalStructure);
  };

  return {
    structureData,
    setstructureData,
    modalStructure,
    setModalStructure,
    handleModalListStructure,
  };
}

export default useSelectStructure;
