import React, {
  useState, useEffect, memo, useMemo,
} from 'react';
import VirtualizedList from 'components/VirtualizedList';

const arrayz = ['primeiro', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', 'ultimo'];

const getItemsToRender = (index, amountToRender) => {
  const items = [];

  const startIndex = Math.max(0, index);
  const endIndex = Math.min(index + amountToRender, arrayz.length);

  for (let i = startIndex; i < endIndex; i += 1) {
    items.push({ index: i, text: arrayz[i] });
  }

  return items;
};

const renderItem = (item) => <div key={item.index} style={{ height: 25 }}>{item.text}</div>;

const TicketList = ({ resource }) => (
  <VirtualizedList
    totalItems={arrayz.length}
    itemHeight={25}
    amount={15}
    overscan={5}
    getItemsToRender={getItemsToRender}
    renderItem={renderItem}
  />
);
export default memo(TicketList);
