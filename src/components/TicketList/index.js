import React, { memo } from 'react';

const TicketList = ({ resource }) => {
  const items = resource?.fetch.read();

  return (
    <div>
      {items?.Items?.map((item) => item.Items.map((tck, i) => <h5 key={i}>{tck.Name}</h5>))}
    </div>
  );
};

export default memo(TicketList);
