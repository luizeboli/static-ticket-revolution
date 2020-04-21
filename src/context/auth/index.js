/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { doLogin } from 'services/api';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = React.useState({});

  const login = async (us, pw) => {
    const response = await doLogin(us, pw);
    setCurrentUser(response.data);
  };

  const logout = () => setCurrentUser({});

  return (
    <AuthContext.Provider
      value={{
        currentUser, login, logout,
      }}
      {...props}
    />
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
