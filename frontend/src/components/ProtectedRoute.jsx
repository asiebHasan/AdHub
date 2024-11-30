import React from 'react';
import { Route, Navigate } from 'react-router-dom';  // Use Navigate instead of Redirect
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/login" />  // Use Navigate to redirect
        )
      }
    />
  );
};

export default ProtectedRoute;
