import { useContext } from 'react';

import { FormContext } from './index';

const useField = () => {
  const { fields } = useContext(FormContext);

  const registerInput = (inputRef) => {
    fields.current.push(inputRef);
  };

  return {
    registerInput,
  };
};

export default useField;
