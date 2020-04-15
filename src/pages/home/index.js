import React from 'react';
import { useAuth } from 'context/auth';

const HomePage = () => {
  const { logout } = useAuth();

  return (
    <>
      <h2>Home</h2>
      <button type="button" onClick={() => logout()}>Logout</button>
    </>
  );
};

export default HomePage;
