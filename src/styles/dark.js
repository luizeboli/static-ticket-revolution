import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import shadows from '@material-ui/core/styles/shadows';

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

    border: '#354350',
    type: 'dark',
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
    MuiTypography: {
      body2: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#354350',
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#2B3640',
        border: '1px solid #354350',
      },
    },
  },
});
