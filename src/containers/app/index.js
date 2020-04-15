import React from 'react';
import AuthApp from 'containers/app/auth-app';
import UnAuthApp from 'containers/app/unauth-app';
import { useUser } from 'context/user';

import 'global.css';

function App() {
  const userAuthenticated = useUser();

  return userAuthenticated ? <AuthApp /> : <UnAuthApp />;
}

export default App;