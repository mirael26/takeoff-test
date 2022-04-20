const ActionType = {
  UPDATE_AUTH: "UPDATE_AUTH",
  UPDATE_LOGIN_ERROR: "UPDATE_LOGIN_ERROR",
  SHOW_POPUP: "SHOW_POPUP",
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
  showPopup: (popup) => ({
    type: ActionType.SHOW_POPUP,
    payload: popup
  })
};

export {ActionCreator, ActionType};