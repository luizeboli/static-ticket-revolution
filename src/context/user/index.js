/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useAuth } from 'context/auth';

const UserContext = React.createContext();

const UserProvider = (props) => {
  const {
    isAuthenticated,
  } = useAuth();
  return <UserContext.Provider value={isAuthenticated} {...props} />;
};

const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
