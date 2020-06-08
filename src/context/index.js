import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';

import dark from 'styles/dark';

import ModalProvider from './modal';
import { AuthProvider } from './auth';

const AppProviders = ({ children }) => (
  <MuiThemeProvider theme={dark}>
    <Router>
      <AuthProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </AuthProvider>
    </Router>
  </MuiThemeProvider>
);

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
