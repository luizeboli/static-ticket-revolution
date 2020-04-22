/* eslint-disable react/jsx-props-no-spreading */
import React, { useTransition, memo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const ButtonTransition = ({
  children, onClick, disabled, ...rest
}) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 5000,
  });

  const disableBtn = disabled || isPending;

  const handleClick = () => {
    startTransition(() => {
      onClick();
    });
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={disableBtn}
        {...rest}
      >
        {isPending ? <CircularProgress size={24} /> : children}
      </Button>
    </>
  );
};

export default memo(ButtonTransition);
