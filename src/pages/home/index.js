import React, { Suspense, memo } from 'react';

import Layout from 'containers/Layout';
import TicketList from 'containers/TicketList';

const HomePage = () => {
  React.useEffect(() => console.log('HomePage rendered'));

  return (
    <Layout>
      <Suspense fallback={<h1>Loading suspense...</h1>}>
        <TicketList />
      </Suspense>
    </Layout>
  );
};

HomePage.whyDidYouRender = true;

export default memo(HomePage);
