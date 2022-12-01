import { Navigate } from "react-router-dom";
import React, { useContext } from 'react';
import { AuthContext } from '../../App';


export function CanNavigate({ children }) {
  const { auth } = useContext(AuthContext);

  if (auth?.accessToken) {
    return (children);
  } else {
    return <Navigate to="/login" replace={true} />;
  }
}
