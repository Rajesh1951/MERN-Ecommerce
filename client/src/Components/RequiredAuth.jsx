import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import MyContext from '../contexts/AuthContext';
const RequireAuth = ({ children }) => {
  const { loggedInStatus, loggedIn } = useContext(MyContext);
  loggedIn()
  if (loggedInStatus === false) {
    return <Navigate to='/login' />
  }
  return children;
}

export default RequireAuth