import React, {
  useEffect, useReducer, memo, useState,
} from 'react';

const VirtualizedList = ({
  itemHeight,
  getItemsToRender,
  overscan,
  renderItem,
  totalItems,
  parentRef,
}) => {
  const [, render] = useState(null);
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

    console.log(amountToRender, 'amount', startIndex, 'start');
    console.log(state.amountToRender, 'amountstate.', state.previousIndex, 'state.start');
    console.log(scrollTop / itemHeight, 'conta');

    if (amountToRender === state.amountToRender && state.previousIndex === startIndex) return;

    const itemsToRender = getItemsToRender(startIndex, amountToRender);
    const topContainerHeight = Math.max(startIndex * itemHeight, 0);
    const bottomContainerHeight = Math.max(
      innerHeight - topContainerHeight - itemsToRender.length * itemHeight,
      0,
    );

    dispatch({
      amountToRender,
      previousIndex: startIndex,
      itemsToRender,
      topContainerHeight,
      bottomContainerHeight,
    });
  };

  useEffect(() => {
    onScroll({ target: { scrollTop: 0 } });
  }, [parentRef?.current?.clientHeight]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log('acionei o resize');
      render({});
    });

    return () => window.removeEventListener('resize');
  }, []);

  useEffect(() => console.log('Virtual Rendered'));

  return (
    <div onScroll={onScroll} style={{ height: parentRef?.current?.clientHeight, overflowY: 'scroll' }}>
      <div style={{ height: state.topContainerHeight }} />
      {state.itemsToRender?.map(renderItem)}
      <div style={{ height: state.bottomContainerHeight }} />
    </div>
  );
};

export default memo(VirtualizedList);
