import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

import dark from 'styles/dark';
import { AuthProvider } from './auth';

const AppProviders = ({ children }) => (
  <MuiThemeProvider theme={dark}>
    <Router>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Router>
  </MuiThemeProvider>
);

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
