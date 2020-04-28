import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorPage from 'pages/error';
import LoginPage from 'pages/login';

const UnAuthApp = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route component={ErrorPage} />
  </Switch>
);
export default UnAuthApp;
