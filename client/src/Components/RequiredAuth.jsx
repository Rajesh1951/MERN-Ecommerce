import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import MyContext from '../contexts/AuthContext';
const RequireAuth = ({ children }) => {
  const {loggedInStatus,loggedIn} = useContext(MyContext);
  console.log('before' ,loggedInStatus)
  loggedIn()
  console.log('after' ,loggedInStatus)
  if (loggedInStatus === false) {
    return <Navigate to='/login' />
  }
  return children;
}

export default RequireAuth