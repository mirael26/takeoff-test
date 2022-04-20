import { ActionType } from "../action";

interface stateState {
  loginError: null | string,
  popup: null | string,
}

const initialState = {  
  loginError: null,
  popup: null,
};

const stateReducer = (state:stateState = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_LOGIN_ERROR:
      return {...state, loginError: action.payload};
    case ActionType.SHOW_POPUP:
      return {...state, popup: action.payload}
    default:
      return state;
  }
};

export {stateReducer};