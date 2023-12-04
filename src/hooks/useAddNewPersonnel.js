import React, { useState } from "react";

const useAddNewPersonnel = () => {
  const [userField, setUserField] = useState({});

  const onChangeInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setUserField({
      ...userField,
      [name]: value,
    });
  };

  return {
    userField,
    onChangeInput,
    setUserField,
  };
};

export default useAddNewPersonnel;
