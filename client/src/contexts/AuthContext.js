import axios from 'axios'
import React, { useEffect, createContext } from 'react'

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = React.useState(null);

  const loggedIn = async () => {
    const result = await axios.get('https://mern-ecommerce-3vx2.onrender.com/loggedIn');
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