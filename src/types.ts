enum ActionTypes {
  UPDATE_AUTH = "UPDATE_AUTH",
  LOAD_USER_INFO = "LOAD_USER_INFO",
  UPDATE_LOGIN_ERROR = "UPDATE_LOGIN_ERROR",
  SHOW_POPUP = "SHOW_POPUP",
  LOAD_CONTACTS = "LOAD_CONTACTS",
};

interface Contact {
  id: string,
  name: string,
  context: string,
  phone: string,
}

type Contacts = [] | Contact[];

interface UserInfo {
  email: string,
  password: string,
}

interface UserInfoFromServer extends UserInfo {
  id: number,
}

interface UpdateAuthAction {
  type: ActionTypes.UPDATE_AUTH,
  payload: boolean
}

interface LoadUserInfoAction {
  type: ActionTypes.LOAD_USER_INFO,
  payload: UserInfo
}

interface UpdateLoginErrorAction {
  type: ActionTypes.UPDATE_LOGIN_ERROR,
  payload: string | null
}

interface ShowPopupAction {
  type: ActionTypes.SHOW_POPUP,
  payload: string
}

interface LoadContactsAction {
  type: ActionTypes.LOAD_CONTACTS,
  payload: Contacts
}


export {Contact, Contacts, UserInfo, UserInfoFromServer, UpdateAuthAction, LoadUserInfoAction, UpdateLoginErrorAction, ShowPopupAction, LoadContactsAction, ActionTypes};
export type UserAction = UpdateAuthAction | LoadUserInfoAction;
export type StateAction = UpdateLoginErrorAction | ShowPopupAction;
export type DataAction = LoadContactsAction;
export type Action = UserAction | StateAction | DataAction;