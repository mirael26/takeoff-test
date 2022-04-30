import {dispatch as busDispatch}  from 'use-bus';
import {ThunkAction} from 'redux-thunk';
import {Axios, AxiosResponse} from 'axios';

import {ActionType, ActionCreator} from "./action";
import {Reducer} from "./store";
import {Popup} from "../const";
import {Action, UserInfo, ShowPopupAction, UpdateLoginErrorAction, LoadContactsAction, Contacts} from '../types';

const HttpCode = {
  UNAUTHORIZED: 401,
  REGISTER_SUCCESS: 201,
  LOGIN_SUCCESS: 200,
};

const register = (userData: UserInfo): ThunkAction<Promise<ShowPopupAction | UpdateLoginErrorAction | void>, Reducer, Axios, Action> => (dispatch, _getState, api) => (
  api.post("/register", userData)
    .then(({data}) => dispatch(registerContacts(data.user.id)))
    .then(() => dispatch(ActionCreator.updateLoginError(null)))
    .then(() => dispatch(ActionCreator.showPopup(Popup.REGISTRATION_SUCCESSFUL)))
    .catch((error) => {
      if (error.response.status !== HttpCode.REGISTER_SUCCESS) {
        dispatch(ActionCreator.updateLoginError(error.response.data));
      }
    })
);

const registerContacts = (userId: number): ThunkAction<Promise<AxiosResponse<void | Error>>, Reducer, Axios, Action> => (dispatch, _getState, api) => (
  api.post("/userContacts", {id: userId, contacts: []})
    .catch((error) => {
      throw error;
    })
);

const login = (userData: UserInfo): ThunkAction<Promise<UpdateLoginErrorAction | void>, Reducer, Axios, Action> => (dispatch, _getState, api) => (
  api.post("/login", userData)
    .then((response) => dispatch(ActionCreator.loadUserInfo(response.data.user)))
    .then(() => dispatch(ActionCreator.updateLoginError(null)))
    .then(() => dispatch(ActionCreator.updateAuth(true)))
    .then(() => busDispatch({ type: ActionType.REDIRECT_TO_ROUTE, payload: "/contacts"}))
    .catch((error) => {
      if (error.response.status !== HttpCode.LOGIN_SUCCESS) {
        dispatch(ActionCreator.updateLoginError(error.response.data));
      }
    })
);

const fetchContacts = (userId: number): ThunkAction<Promise<LoadContactsAction | Error>, Reducer, Axios, Action> => (dispatch, _getState, api) => (
  api.get(`/userContacts/${userId}`)
    .then(({data}) => dispatch(ActionCreator.loadContacts(data.contacts)))
    .catch((error) => {
      throw error;
    })
);

const postContacts = (userId: number, contacts: Contacts): ThunkAction<Promise<LoadContactsAction | Error>, Reducer, Axios, Action> => (dispatch, _getState, api) => (
  api.put(`/userContacts/${userId}`, {contacts: contacts})
    .then(({data}) => dispatch(ActionCreator.loadContacts(data.contacts)))
    .catch((error) => {
      throw error;
    })

);

export {register, login, fetchContacts, postContacts};
