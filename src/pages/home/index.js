import React, { Suspense, memo } from 'react';

import Layout from 'containers/Layout';
import TicketList from 'components/TicketList';

import { useTicketList } from 'context/ticketList';
import { getTickets } from 'services/api';

const HomePage = () => {
  const [state, dispatch] = useTicketList();

  React.useEffect(() => console.log('HomePage rendered'));

  // React.useEffect(() => dispatch({ type: 'UPDATE_TICKET_LIST', payload: getTickets() }), []);

  return (
    <Layout>
      <Suspense fallback={<h1>Loading suspense...</h1>}>
        <TicketList resource={state.ticketList} />
      </Suspense>
    </Layout>
  );
};

export default memo(HomePage);
