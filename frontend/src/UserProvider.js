import React, { useState } from 'react';
import Routes from './Routes';
import UserContext from './userContext';

function UserProvider() {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser)
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <Routes />
    </UserContext.Provider>
  );
};

export default UserProvider;