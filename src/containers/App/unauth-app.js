import React from 'react';
import {
  Route, Switch, useLocation, useHistory,
} from 'react-router-dom';

import LoginPage from 'pages/login';

const UnAuthApp = () => {
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname !== '/') { history.push(`/?redirectTo=${location.pathname.split('/')[1]}`); }
  }, []);

  return (
    <Switch>
      <Route component={LoginPage} />
    </Switch>
  );
};
export default UnAuthApp;
