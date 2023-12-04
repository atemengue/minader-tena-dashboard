import { useState } from "react";

// id Corps et grades selectBox

const useFilterByStatus = (personnels = []) => {
  const [idCorps, setIdCorps] = useState(0);
  const [idGrade, setIdGrade] = useState(0);

  return {
    data,
    idCorps,
    idGrade,
  };
};

export default useFilterByStatus;
