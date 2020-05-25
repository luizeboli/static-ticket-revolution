/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { doLogin } from 'services/api';
import client from 'services/client';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const ls = JSON.parse(localStorage.getItem('hi'));
        if (ls) {
          await client('/check-token');
          setCurrentUser(ls);
        }
      } catch (error) {
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = async (us, pw) => {
    const response = await doLogin(us, pw);
    setCurrentUser(response);
    localStorage.setItem('hi', JSON.stringify(response));
  };

  const logout = () => {
    localStorage.removeItem('hi');
    setCurrentUser({});
    return history.push('/');
  };

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
