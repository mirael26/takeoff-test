const ActionType = {
  UPDATE_AUTH: "UPDATE_AUTH",
};

const ActionCreator = {
  updateAuth: (authStatus) => ({
    type: ActionType.UPDATE_AUTH,
    payload: authStatus
  }),
};

export {ActionCreator, ActionType};