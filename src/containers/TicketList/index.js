import React, {
  useRef, useState, Suspense,
} from 'react';
import { useQuery } from 'react-query';

import VirtualizedList from 'components/VirtualizedList';
import { useTicketList } from 'context/ticketList';
import { fetchTicketList } from 'services/queries';
import { Link } from 'react-router-dom';

const renderItem = (item) => <div key={item.index} style={{ height: 25 }}><Link to={`/ticket/${item.index}`}>{item.text}</Link></div>;

const getItemsToRender = (index, amountToRender, data) => {
  const items = [];

  const startIndex = Math.max(0, index);
  const endIndex = Math.min(index + amountToRender, data.Items[2].Items.length);

  for (let i = startIndex; i < endIndex; i += 1) {
    items.push({ index: i, text: data.Items[2].Items[i].Name });
  }

  return items;
};

const TicketList = () => {
  const [, dispatch] = useTicketList();
  const containerRef = useRef(null);

  React.useEffect(() => {
    console.log('TicketList Rendered');
  });


  const dispatchAndFetch = async () => {
    dispatch({ type: 'TICKET_LIST_REQUEST' });
    return fetchTicketList();
  };

  const { data, isFetching } = useQuery('ticket-list', dispatchAndFetch, {
    onSuccess: () => dispatch({ type: 'TICKET_LIST_SUCCESS' }),
  });

  if (isFetching) return <h1>Fetching...</h1>;

  return (
    <div id="" ref={containerRef} style={{ height: '100%' }}>
      <VirtualizedList
        array={data}
        totalItems={data.Items[2].Items.length}
        itemHeight={25}
        overscan={5}
        getItemsToRender={getItemsToRender}
        renderItem={renderItem}
        parentRef={containerRef}
      />
    </div>
  );
};

const TicketListContainer = () => (
  <Suspense fallback="Loading list...">
    <TicketList />
  </Suspense>
);

TicketListContainer.whyDidYouRender = true;

export default TicketListContainer;
