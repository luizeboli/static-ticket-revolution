import React from 'react';
import { useAuth } from 'context/auth';

import AuthApp from './auth-app';
import UnAuthApp from './unauth-app';

import 'styles/global.css';

function App() {
  const { currentUser: { Token } } = useAuth();

  return Token ? <AuthApp /> : <UnAuthApp />;
}

export default App;
