import React, { useState, memo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import MenuSidebar from 'components/MenuSidebar';
import Header from 'components/Header';

import { useAuth } from 'context/auth';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  sectionWrapper: {
    display: 'flex',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'hidden',
  },
}));


const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const classes = useStyles();
  const { logout } = useAuth();

  React.useEffect(() => console.log('Layout rendered'));

  return (
    <main className={classes.wrapper}>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        logout={logout}
      />
      <section className={classes.sectionWrapper}>
        <MenuSidebar open={menuOpen} />
        <div className={classes.content} onScroll={(e) => e.preventDefault()}>
          {children}
        </div>
      </section>
    </main>
  );
};

export default memo(Layout);
