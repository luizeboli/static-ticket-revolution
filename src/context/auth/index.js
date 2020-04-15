/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated, login, logout,
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
