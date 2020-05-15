import React, {
  useEffect, useReducer, memo, useRef,
} from 'react';
import debounce from 'lodash.debounce';

const VirtualizedList = ({
  itemHeight,
  getItemsToRender,
  overscan,
  renderItem,
  totalItems,
  parentRef,
}) => {
  const containerRef = useRef();
  const [state, dispatch] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    {
      amountToRender: 0,
      innerHeight: totalItems * itemHeight,
      topContainerHeight: 0,
      bottomContainerHeight: 0,
      itemsToRender: [],
      previousIndex: 0,
    },
  );

  const onScroll = ({ target: { scrollTop } }) => {
    const {
      innerHeight,
    } = state;

    const amountToRender = Math.round(parentRef.current.clientHeight / itemHeight + 2 * overscan);
    const startIndex = Math.max(0, Math.floor((scrollTop / itemHeight)) - overscan);

    if (amountToRender === state.amountToRender && state.previousIndex === startIndex) return;

    const itemsToRender = getItemsToRender(startIndex, amountToRender);
    const topContainerHeight = Math.max(startIndex * itemHeight, 0);
    const bottomContainerHeight = Math.max(
      innerHeight - topContainerHeight - amountToRender * itemHeight,
      0,
    );

    dispatch({
      amountToRender,
      previousIndex: startIndex,
      itemsToRender,
      topContainerHeight,
      bottomContainerHeight,
      windowHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    onScroll({ target: { scrollTop: containerRef.current.scrollTop } });
  }, []);

  useEffect(() => {
    const debouncedScroll = debounce(
      () => onScroll({ target: { scrollTop: containerRef.current.scrollTop } }), 200,
    );

    const resizeListener = () => {
      if (state.windowHeight !== window.innerHeight) {
        debouncedScroll();
      }
    };

    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [state.windowHeight]);

  useEffect(() => console.log('Virtual Rendered'));

  return (
    <div onScroll={onScroll} style={{ height: parentRef?.current?.clientHeight, overflowY: 'scroll' }} ref={containerRef}>
      <div style={{ height: state.topContainerHeight }} />
      {state.itemsToRender?.map(renderItem)}
      <div style={{ height: state.bottomContainerHeight }} />
    </div>
  );
};

export default memo(VirtualizedList);
