import React from 'react';
import { useUser } from 'context/user';

import AuthApp from './auth-app';
import UnAuthApp from './unauth-app';

import 'global.css';

function App() {
  const { Token } = useUser();

  return Token ? <AuthApp /> : <AuthApp />;
}

export default App;
