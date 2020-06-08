import React, {
  useRef, useState, Suspense, memo,
} from 'react';
import { useQuery } from 'react-query';

import ListItem from 'containers/TicketList/ListItem';
import VirtualizedList from 'components/VirtualizedList';
import { useTicketList } from 'context/ticketList';
import { fetchTicketList } from 'services/queries';

const getItemsToRender = (index, amountToRender, data) => {
  const items = [];

  const startIndex = Math.max(0, index);
  const endIndex = Math.min(index + amountToRender, data.length);

  for (let i = startIndex; i < endIndex; i += 1) {
    items.push(data[i]);
  }

  return items;
};

const TicketList = () => {
  const [, dispatch] = useTicketList();
  const containerRef = useRef(null);
  const [ticketItems, setTicketItems] = useState([]);

  React.useEffect(() => {
    console.log('TicketList Rendered');
  });

  const dispatchAndFetch = async () => {
    dispatch({ type: 'TICKET_LIST_REQUEST' });
    return fetchTicketList();
  };

  const normalizeTicketList = (data) => {
    const normalizedList = data.Items.reduce((acc, curr, idx) => {
      acc.push({ label: curr.Label, header: true, Id: `${curr.Label}-${idx}` });
      acc.push(...curr.Items);

      return acc;
    }, []);

    setTicketItems(normalizedList);
  };


  const { isFetching } = useQuery('ticket-list', dispatchAndFetch, {
    onSuccess: (ticketListData) => normalizeTicketList(ticketListData),
  });

  if (isFetching) return <h1>Fetching...</h1>;

  return (
    <div id="" ref={containerRef} style={{ height: '100%' }}>
      <VirtualizedList
        array={ticketItems}
        totalItems={ticketItems.length}
        itemHeight={25}
        overscan={10}
        getItemsToRender={getItemsToRender}
        renderItem={(item) => <ListItem key={item.Id} item={item} itemHeight={25} />}
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

export default memo(TicketListContainer);
