/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { doLogin } from 'services/api';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const ls = JSON.parse(localStorage.getItem('hi'));
      if (ls) { setCurrentUser(ls); }
    } catch (error) {
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (us, pw) => {
    const response = await doLogin(us, pw);
    setCurrentUser(response);
    localStorage.setItem('hi', JSON.stringify(response));
  };

  const logout = () => { localStorage.removeItem('hi'); return setCurrentUser({}); };

  return (
    !loading && (
    <AuthContext.Provider
      value={{
        currentUser, login, logout,
      }}
      {...props}
    />
    )
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
