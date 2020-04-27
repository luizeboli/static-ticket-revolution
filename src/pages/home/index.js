import React, {
  useCallback, useEffect, useState, Suspense,
} from 'react';
import { useAuth } from 'context/auth';


import Button from 'components/Button';
import TicketList from 'components/TicketList';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { getTickets } from 'services/api';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'grid',
    gridTemplateAreas: `
      "header header"
      "sidebar main"`,
    gridTemplateColumns: '200px auto',
    gridTemplateRows: '64px auto',
    gridRowGap: '0.5rem',
    height: '100%',

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '0 auto',
    },
  },
  header: {
    gridArea: 'header',
    backgroundColor: '#2B3640',
    borderBottom: '1px solid #354350',
    padding: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sidebar: {
    gridArea: 'sidebar',

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  content: {
    gridArea: 'main',
    overflowY: 'scroll',
  },
}));

const HomePage = () => {
  const [resource, setResource] = useState(null);
  const [count, setCount] = useState(0);
  const { logout } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    setResource(getTickets);
  }, []);

  const loadTickets = useCallback(() => setResource(getTickets), []);

  return (
    <main className={classes.wrapper}>
      <header className={classes.header}>
        Header
        <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
      </header>
      <nav className={classes.sidebar}>
        <Button variant="contained" color="primary" onClick={loadTickets}>Get Tickets</Button>
        <h2>{count}</h2>
        <button type="button" onClick={() => setCount(count + 1)}>Render Test</button>
      </nav>
      <section className={classes.content}>
        <Suspense fallback={<h1>Loading suspense...</h1>}>
          <TicketList resource={resource} />
        </Suspense>
      </section>
    </main>
  );
};

export default HomePage;
