import React, {
  useEffect, useReducer, memo,
} from 'react';

const VirtualizedList = ({
  amount,
  itemHeight,
  getItemsToRender,
  overscan,
  renderItem,
  totalItems,
}) => {
  const [state, dispatch] = useReducer(
    (prevState, nextState) => ({ ...prevState, ...nextState }),
    {
      amountToRender: amount + 2 * overscan,
      innerHeight: totalItems * itemHeight,
      outerHeight: amount * itemHeight,
      overscanHeight: overscan * itemHeight,
      topContainerHeight: 0,
      bottomContainerHeight: 0,
      itemsToRender: [],
    },
  );

  const onScroll = ({ target: { scrollTop } }) => {
    const {
      innerHeight,
      overscanHeight,
      amountToRender,
    } = state;

    const startIndex = Math.max(0, Math.floor((scrollTop - overscanHeight) / itemHeight));
    const itemsToRender = getItemsToRender(startIndex, amountToRender);

    const topContainerHeight = Math.max(startIndex * itemHeight, 0);
    const bottomContainerHeight = Math.max(
      innerHeight - topContainerHeight - itemsToRender.length * itemHeight,
      0,
    );

    dispatch({ itemsToRender, topContainerHeight, bottomContainerHeight });
  };

  useEffect(() => { onScroll({ target: { scrollTop: 0 } }); }, []);

  return (
    <div onScroll={onScroll} style={{ height: state.outerHeight, overflowY: 'scroll' }}>
      <div style={{ height: state.topContainerHeight }} />
      {state.itemsToRender?.map(renderItem)}
      <div style={{ height: state.bottomContainerHeight }} />
    </div>
  );
};

export default memo(VirtualizedList);
