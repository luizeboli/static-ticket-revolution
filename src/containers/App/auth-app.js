import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';

import { TicketListProvider } from 'context/ticketList';
import ErrorPage from 'pages/error';
import HomePage from 'pages/home';
import TicketPage from 'pages/ticket';

const queryCfg = {
  suspense: false,
  refetchAllOnWindowFocus: false,
};


const AuthApp = () => (
  <TicketListProvider>
    <ReactQueryConfigProvider config={queryCfg}>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/ticket/:id" component={TicketPage} />
        <Route component={ErrorPage} />
      </Switch>
    </ReactQueryConfigProvider>
  </TicketListProvider>
);

export default AuthApp;
