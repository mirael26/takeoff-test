const ActionType = {
  UPDATE_AUTH: "UPDATE_AUTH",
  UPDATE_LOGIN_ERROR: "UPDATE_LOGIN_ERROR",
};

const ActionCreator = {
  updateAuth: (authStatus) => ({
    type: ActionType.UPDATE_AUTH,
    payload: authStatus
  }),
  updateLoginError: (loginError) => ({
    type: ActionType.UPDATE_LOGIN_ERROR,
    payload: loginError
  }),
};

export {ActionCreator, ActionType};