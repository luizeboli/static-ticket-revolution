import React, { memo } from 'react';

import Button from 'components/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { useAuth } from 'context/auth';
import { useTicketList } from 'context/ticketList';
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


const Layout = ({ children }) => {
  const classes = useStyles();
  const { logout } = useAuth();
  const [state, dispatch] = useTicketList();

  React.useEffect(() => console.log('Layout rendered'));

  return (
    <main className={classes.wrapper}>
      <header className={classes.header}>
        Header
        <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
      </header>
      <nav className={classes.sidebar}>
        <Button variant="contained" color="primary" onClick={() => dispatch({ type: 'UPDATE_TICKET_LIST', payload: getTickets() })}>Get Tickets</Button>
        <h2>{state.counter}</h2>
        <button type="button" onClick={() => dispatch({ type: 'UPDATE_COUNTER' })}>Render Test</button>
      </nav>
      <section className={classes.content}>
        {children}
      </section>
    </main>
  );
};

export default memo(Layout);
