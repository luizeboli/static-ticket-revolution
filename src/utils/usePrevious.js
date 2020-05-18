import { useRef, useEffect } from 'react';

export default function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    console.log(value, 'valor');
    ref.current = value;
  });
  return ref.current;
}
