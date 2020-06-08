import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Menu from '@material-ui/icons/Menu';
import HiLogo from 'assets/HiLogo.svg';

import Button from 'components/Button';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#2B3640',
    borderBottom: '1px solid #354350',
    padding: '0 0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  },
  logoutBtn: {
    marginLeft: 'auto',
  },
});

const Header = ({
  menuOpen,
  setMenuOpen,
  logout,
}) => {
  const classes = useStyles();

  React.useEffect(() => console.log('Header rendered'));

  return (
    <header className={classes.header}>
      <IconButton onClick={() => setMenuOpen(!menuOpen)}>
        <Menu />
      </IconButton>
      <Link to="/home">
        <img src={HiLogo} alt="Hi Logo" />
      </Link>
      <Button className={classes.logoutBtn} variant="contained" color="primary" onClick={() => logout()}>Logout</Button>
    </header>
  );
};

export default memo(Header);
