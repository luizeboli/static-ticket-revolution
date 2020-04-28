import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './auth';
import { UserProvider } from './user';

const AppProviders = ({ children }) => (
  <Router>
    <AuthProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthProvider>
  </Router>
);

AppProviders.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProviders;
