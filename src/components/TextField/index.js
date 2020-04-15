/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import TextField from '@material-ui/core/TextField';

const TextInput = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const {
    fieldName, defaultValue = '', registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <TextField inputRef={inputRef} defaultValue={defaultValue} helperText={error} error={error} {...rest} />
    </>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextInput;
