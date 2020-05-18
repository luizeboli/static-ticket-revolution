import React, { memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Link } from 'react-router-dom';
import { queryCache } from 'react-query';

import HiLogo from 'assets/HiLogo.svg';
import Button from 'components/Button';
import { useAuth } from 'context/auth';
import { useTicketList } from 'context/ticketList';

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

    [theme.breakpoints.down('sm')]: {
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
    paddingLeft: '0.5rem',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  content: {
    gridArea: 'main',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
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
        <Link to="/home">
          <img src={HiLogo} alt="Hi Logo" />
        </Link>
        <Button variant="contained" color="primary" onClick={logout}>Logout</Button>
      </header>
      <nav className={classes.sidebar}>
        <Button variant="contained" color="primary" onClick={() => queryCache.refetchQueries('ticket-list')} loading={state.ticketList.loading}>Get Tickets</Button>
        <h2>{state.counter}</h2>
        <button type="button" onClick={() => dispatch({ type: 'UPDATE_COUNTER' })}>Render Test</button>
      </nav>
      <div className={classes.content} onScroll={(e) => e.preventDefault()}>
        {children}
      </div>
    </main>
  );
};

export default memo(Layout);
