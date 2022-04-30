import * as React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

import {Reducer} from "../../store/store";

interface RequireAuthArgs {
  children: JSX.Element,
  redirectTo: string,
  authStatus: boolean,
}

const RequireAuth = ({children, redirectTo, authStatus}: RequireAuthArgs): JSX.Element => {
  return authStatus
    ? children
    : <Navigate to={redirectTo} />;
}

const mapStateToProps = ({user}: Reducer) => ({
  authStatus: user.authStatus,
});

export {RequireAuth};
export default connect(mapStateToProps)(RequireAuth);