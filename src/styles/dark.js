import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#00AEEF',
      contrastText: '#FFF',
    },
    text: {
      main: '#F12AC9',
      secondary: '#95A5B2',
    },
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        color: '#95A5B2',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 0,
        marginRight: '1rem',
      },
    },
  },
});
