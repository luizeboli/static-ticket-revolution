import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { TicketListProvider } from 'context/ticketList';
import ErrorPage from 'pages/error';
import HomePage from 'pages/home';

const AuthApp = () => (
  <TicketListProvider>
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={HomePage} />
      <Route component={ErrorPage} />
    </Switch>
  </TicketListProvider>
);

export default AuthApp;
