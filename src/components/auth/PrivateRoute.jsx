import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthUtils from "./AuthUtils";

const Auth = new AuthUtils();

const PrivateRoute = ({ component: Component, accountType, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props =>
        Auth.loggedIn() ? (
          <Component {...props} />
        ) : accountType == "admin" ? (
          <Redirect to="/admin/login" />
        ) : (
          <Redirect to="/customer/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
