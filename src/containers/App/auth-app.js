import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ErrorPage from 'pages/error';
import HomePage from 'pages/home';

const AuthApp = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/home" />
    </Route>
    <Route exact path="/home" component={HomePage} />
    <Route component={ErrorPage} />
  </Switch>
);

export default AuthApp;
