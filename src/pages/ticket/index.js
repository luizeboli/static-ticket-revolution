import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from 'containers/Layout';

const TicketPage = () => {
  const history = useHistory();

  React.useEffect(() => console.log('TicketPage rendered'));
  return (
    <Layout>
      <button onClick={() => history.push('/home')} type="button">Voltar</button>
      <h1>Oi</h1>
    </Layout>
  );
};

export default memo(TicketPage);
