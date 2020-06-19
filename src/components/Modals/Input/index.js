import React, { useRef } from 'react';
import TextField from '@material-ui/core/TextField';

import useField from 'components/Form/useField';

const Input = ({
  name, variant, label, InputLabelProps, placeholder, autoFocus, fullWidth, rows, multiline,
}) => {
  const inputRef = useRef();
  const { registerInput } = useField();

  React.useEffect(() => {
    registerInput(inputRef.current);
  }, []);

  return (
    <TextField
      inputRef={inputRef}
      name={name}
      variant={variant}
      label={label}
      InputLabelProps={InputLabelProps}
      placeholder={placeholder}
      autoFocus={autoFocus}
      fullWidth={fullWidth}
      rows={rows}
      multiline={multiline}
    />
  );
};

export default Input;
