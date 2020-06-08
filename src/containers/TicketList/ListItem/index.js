import React, { memo } from 'react';

const ListItem = ({ item, itemHeight }) => (
  <div style={{ height: itemHeight }}>
    {item.header ? (
      <span>{item.label}</span>
    )
      : (
        <span>{item.Name}</span>
      )}
  </div>
);

export default ListItem;
