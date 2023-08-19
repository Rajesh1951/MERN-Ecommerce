import axios from 'axios'
import { backend } from '../constants.js'
import React, { useEffect, createContext } from 'react'

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = React.useState(null);

  const loggedIn = async () => {
    const token = sessionStorage.getItem('jwtToken')
    const result = await axios.get(`${backend}/loggedIn`, { headers: { Authorization: `Bearer ${token}` } });
    console.log('logeind', result)
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