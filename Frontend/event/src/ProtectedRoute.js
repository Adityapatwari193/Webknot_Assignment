
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, ...rest }) => {
  const user = useSelector((state) => state.auth.user); 

  return (
    <Route 
      {...rest} 
      element={user ? element : <Navigate to="/login" />} 
    />
  );
};

export default ProtectedRoute;
