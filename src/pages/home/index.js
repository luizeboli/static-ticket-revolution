import React, { Suspense, memo } from 'react';

import Layout from 'containers/Layout';
import TicketList from 'components/TicketList';

import { useTicketList } from 'context/ticketList';

const HomePage = () => {
  const { loadTicketList } = useTicketList();

  React.useEffect(() => console.log('HomePage rendered'));

  return (
    <Layout>
      <Suspense fallback={<h1>Loading suspense...</h1>}>
        <TicketList resource={loadTicketList} />
      </Suspense>
    </Layout>
  );
};

export default memo(HomePage);
