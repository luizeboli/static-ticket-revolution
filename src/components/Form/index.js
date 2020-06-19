import React, { useRef, createContext } from 'react';

export const FormContext = createContext();

const Form = ({ children, onSubmit }) => {
  const fields = useRef([]);

  const refToData = () => {
    const data = {};
    fields.current.forEach((field) => { data[field.name] = field.value; });
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputsData = refToData();
    onSubmit(inputsData);
  };

  return (
    <FormContext.Provider value={{ fields }}>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
