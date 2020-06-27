import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PUBLIC_URL } from "../constants";

function AuthenticatedRoutes({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} exact={true} />
        ) : (
          <Redirect
            to={{
              pathname: `${PUBLIC_URL}login`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default AuthenticatedRoutes;
