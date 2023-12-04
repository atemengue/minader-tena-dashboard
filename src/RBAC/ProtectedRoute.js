import React from "react";
import { Redirect, Route } from "react-router-dom";
import Can from "./Can";

const ProtectedRoute = ({ Component, role, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        <Can
          role={role}
          yes={() => <Component />}
          no={() => <Redirect to={{ pathname: "/" }} />}
        />;
      }}
    />
  );
};

export default ProtectedRoute;
