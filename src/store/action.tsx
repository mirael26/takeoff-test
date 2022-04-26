const ActionType = {
  UPDATE_AUTH: "UPDATE_AUTH",
  LOAD_USER_INFO: "LOAD_USER_INFO",
  UPDATE_LOGIN_ERROR: "UPDATE_LOGIN_ERROR",
  SHOW_POPUP: "SHOW_POPUP",
  REDIRECT_TO_ROUTE: "@@ui/REDIRECT_TO_ROUTE",
};

const ActionCreator = {
  updateAuth: (authStatus) => ({
    type: ActionType.UPDATE_AUTH,
    payload: authStatus
  }),
  loadUserInfo: (userInfo) => ({
    type: ActionType.LOAD_USER_INFO,
    payload: userInfo
  }),
  updateLoginError: (loginError) => ({
    type: ActionType.UPDATE_LOGIN_ERROR,
    payload: loginError
  }),
  showPopup: (popup) => ({
    type: ActionType.SHOW_POPUP,
    payload: popup
  }),
};

export {ActionCreator, ActionType};