import {ActionTypes, UserInfo, Contacts, UpdateAuthAction, LoadUserInfoAction, UpdateLoginErrorAction, ShowPopupAction, LoadContactsAction} from "../types";

const ActionType = {
  UPDATE_AUTH: "UPDATE_AUTH",
  LOAD_USER_INFO: "LOAD_USER_INFO",
  UPDATE_LOGIN_ERROR: "UPDATE_LOGIN_ERROR",
  SHOW_POPUP: "SHOW_POPUP",
  REDIRECT_TO_ROUTE: "@@ui/REDIRECT_TO_ROUTE",
  LOAD_CONTACTS: "LOAD_CONTACTS",
};

const ActionCreator = {
  updateAuth: (authStatus: boolean): UpdateAuthAction => ({
    type: ActionTypes.UPDATE_AUTH,
    payload: authStatus
  }),
  loadUserInfo: (userInfo: UserInfo): LoadUserInfoAction => ({
    type: ActionTypes.LOAD_USER_INFO,
    payload: userInfo
  }),
  updateLoginError: (loginError: string | null): UpdateLoginErrorAction => ({
    type: ActionTypes.UPDATE_LOGIN_ERROR,
    payload: loginError
  }),
  showPopup: (popup: string): ShowPopupAction => ({
    type: ActionTypes.SHOW_POPUP,
    payload: popup
  }),
  loadContacts: (contacts: Contacts): LoadContactsAction => ({
    type: ActionTypes.LOAD_CONTACTS,
    payload: contacts
  })
};

export {ActionCreator, ActionType};