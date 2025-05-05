import React, { createContext, useState, useEffect } from 'react';

export const UserDataContext = createContext();

function UserContext({ children }) {
  const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null; 
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); 
    } else {
      localStorage.removeItem('user'); 
    }
  }, [user]);

  return (
    <UserDataContext.Provider value={{ user, setuser }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
