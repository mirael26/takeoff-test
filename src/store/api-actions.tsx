import {ActionCreator} from "./action";
import {Popup} from "./../const";

const HttpCode = {
  UNAUTHORIZED: 401,
  SUCCESS: 201,
};

const register = (userData:{email: string, password: string}) => (dispatch, _getState, api) => (
  api.post("/register", userData)
    .then(() => dispatch(ActionCreator.updateLoginError(null)))
    .then(() => dispatch(ActionCreator.showPopup(Popup.REGISTRATION_SUCCESSFUL)))
    .catch((error) => {
      if (error.response.status !== HttpCode.SUCCESS) {
        dispatch(ActionCreator.updateLoginError(error.response.data));
      }
    })


);

export {register};
