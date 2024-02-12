import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import AuthContext from "../context/Auth";

function PrivateRoute({ children, ...rest }) {
  const auth = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={
        auth.user || localStorage.getItem("user") ? (
          <Navigate to="/dashboard" replace />
        ) : (
          children
        )
      }
    />
  );
}

export default PrivateRoute;
