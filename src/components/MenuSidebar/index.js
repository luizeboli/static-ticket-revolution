import React, { useState, createRef, memo } from 'react';
import cx from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import NewReleasesIcon from '@material-ui/icons/NewReleasesOutlined';
import StarIcon from '@material-ui/icons/StarBorder';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import Button from 'components/Button';
import { useModal } from 'context/modal';

const useStyles = makeStyles((theme) => ({
  closed: {},
  root: {},
  selected: {},
  wrapper: {
    paddingRight: '0.5rem',
    position: 'relative',
  },
  sidebarDrawer: {
    position: 'fixed',
    height: '100%',
    paddingRight: '0.5rem',
    background: '#2B3640',
    boxShadow: theme.shadows[20],
  },
  newTckBtn: {
    height: '3.5rem',
    borderRadius: '100px',
    padding: '1rem 1.5rem 1rem 1.35rem',
    marginLeft: '0.5rem',
    marginBottom: '0.5rem',
    minWidth: 0,
    width: '11.56rem',
    transition: 'all 200ms ease-in-out',

    '&$closed': {
      width: '3.5rem',
      padding: 0,
    },
  },
  listItemRoot: {
    borderRadius: '0 2rem 2rem 0',
    height: '2.25rem',
    padding: '11px 0px 11px 24px',
    color: theme.palette.text.secondary,

    width: '14.5rem',
    transition: 'all 200ms ease-in-out',

    '&$closed': {
      width: '4.2rem',
    },
    '&:hover': {
      backgroundColor: 'rgba(145, 156, 167, 0.12)',
    },
    '&$selected, &$selected:hover': {
      backgroundColor: 'rgba(0, 174, 239, .11)',
      '& p, svg': {
        color: theme.palette.primary.main,
      },
    },
  },
  listItemText: {
    fontSize: '0.875rem',
    fontWeight: 400,
    margin: 0,
    marginRight: '1.5rem',
  },
  link: {
    textDecoration: 'none',
    '&.disabled': {
      pointerEvents: 'none',
    },
  },
}));

let sidebarTimeout = null;

const pagesToRender = [
  {
    id: 1,
    title: 'Caixa de entrada',
    link: '/home',
    icon: InboxIcon,
  },
  {
    id: 2,
    title: 'Com novas interações',
    link: '/newinteractions',
    icon: NewReleasesIcon,
  },
  {
    id: 3,
    title: 'Com estrela',
    link: '/starred',
    icon: StarIcon,
  },
  {
    id: 4,
    title: 'Finalizados',
    link: '/done',
    icon: CheckIcon,
  },
  {
    id: 5,
    title: 'Reabertos',
    link: '/reopen',
    icon: ReplayIcon,
  },
  {
    id: 6,
    title: 'Lixeira',
    link: '/trash',
    icon: DeleteIcon,
  },
];

const MenuSidebar = ({ open }) => {
  const [internalOpen, setInternalOpen] = useState(!open);
  const location = useLocation();
  const navRef = createRef(null);
  const classes = useStyles();
  const { setModal } = useModal();

  React.useEffect(() => console.log('Menu rendered'));

  React.useEffect(() => {
    navRef.current.style.width = 'auto';
  }, [open]);

  const handleMouseEnter = () => {
    if (open) return;
    sidebarTimeout = setTimeout(() => {
      navRef.current.style.width = `${navRef.current.clientWidth}px`;
      setInternalOpen(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (open) return;
    clearTimeout(sidebarTimeout);
    setInternalOpen(false);
  };

  const renderListItems = ({
    id, title, link, icon: Icon,
  }) => {
    const selected = location.pathname === link;

    return (
      <Link key={id} to={link} className={classes.link}>
        <ListItem
          selected={selected}
          className={(!open && !internalOpen) ? classes.closed : null}
          classes={{
            root: classes.listItemRoot,
            selected: classes.selected,
          }}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          {(open || internalOpen)
            && (
            <ListItemText
              className={classes.listItemText}
              primary={<Typography variant="body2">{title}</Typography>}
            />
            ) }
        </ListItem>
      </Link>
    );
  };

  return (
    <nav
      className={cx(classes.wrapper)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={navRef}
    >
      <div className={internalOpen ? classes.sidebarDrawer : null} style={{ paddingTop: '1rem' }}>
        <Button
          className={cx(classes.newTckBtn, { [classes.closed]: !open && !internalOpen })}
          variant="contained"
          color="primary"
          onClick={() => setModal('NewTck')}
        >
          <AddCircleIcon style={{ color: '#FFF' }} />
          {(open || internalOpen) && (
          <span style={{
            marginLeft: '0.75rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden',
          }}
          >
            Novo Ticket
          </span>
          )}
        </Button>
        <List>
          {pagesToRender.map(renderListItems)}
        </List>
        <Divider />
      </div>
    </nav>
  );
};

MenuSidebar.whyDidYouRender = false;

export default memo(MenuSidebar);
