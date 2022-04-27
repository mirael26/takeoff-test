import { dispatch as busDispatch }  from 'use-bus';

import {ActionType, ActionCreator} from "./action";
import {Popup} from "./../const";

const HttpCode = {
  UNAUTHORIZED: 401,
  REGISTER_SUCCESS: 201,
  LOGIN_SUCCESS: 200,
};

const register = (userData:{email: string, password: string}) => (dispatch, _getState, api) => (
  api.post("/register", userData)
    .then(() => dispatch(ActionCreator.updateLoginError(null)))
    .then(() => dispatch(ActionCreator.showPopup(Popup.REGISTRATION_SUCCESSFUL)))
    .catch((error) => {
      if (error.response.status !== HttpCode.REGISTER_SUCCESS) {
        dispatch(ActionCreator.updateLoginError(error.response.data));
      }
    })
);

const login = (userData) => (dispatch, _getState, api) => (
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

const fetchContacts = (userId) => (dispatch, _getState, api) => (
  api.get(`/userContacts/${userId}`)
    .then(({data}) => dispatch(ActionCreator.loadContacts(data.contacts)))
    .catch((error) => {
      throw error;
    })
);

const postContacts = (userId, contacts) => (dispatch, _getState, api) => (
  api.put(`/userContacts/${userId}`, {contacts: contacts})
    .then(({data}) => dispatch(ActionCreator.loadContacts(data.contacts)))
    .catch((error) => {
      throw error;
    })

);

export {register, login, fetchContacts, postContacts};
