import {ActionCreator} from "./action";

const HttpCode = {
  UNAUTHORIZED: 401,
  SUCCESS: 201,
};

const register = (userData:{email: string, password: string}) => (dispatch, _getState, api) => (
  api.post("/register", userData)
    .then((response) => console.log(response))
    .then(() => dispatch(ActionCreator.updateLoginError(false)))
    .catch((error) => {
      if (error.response.status !== HttpCode.SUCCESS) {
        dispatch(ActionCreator.updateLoginError(error.response.data));
        console.log(error.response.data);
      }
    })


);

export {register};
