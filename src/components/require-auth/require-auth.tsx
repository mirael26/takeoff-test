import * as React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const RequireAuth = ({children, redirectTo, authStatus}) => {
  return authStatus
    ? children
    : <Navigate to={redirectTo} />;
}

const mapStateToProps = ({user}) => ({
  authStatus: user.authStatus,
});

export {RequireAuth};
export default connect(mapStateToProps)(RequireAuth);