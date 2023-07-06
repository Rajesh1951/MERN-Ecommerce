import axios from 'axios'
import React, { useEffect, createContext, useState } from 'react'

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = React.useState(null);

  const loggedIn = async () => {
    const result = await axios.get('http://localhost:800/loggedIn');
    setLoggedInStatus(result.data);
  };
  useEffect(() => {
    loggedIn();
  }, [])
  return (
    <MyContext.Provider value={{ loggedInStatus, loggedIn }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;