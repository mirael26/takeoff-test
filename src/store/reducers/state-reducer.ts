import {ActionTypes, StateAction, StateState} from "../../types";

const initialState: StateState = {  
  loginError: null,
  popup: null,
};

const stateReducer = (state = initialState, action: StateAction): StateState => {
  switch (action.type) {
    case ActionTypes.UPDATE_LOGIN_ERROR:
      return {...state, loginError: action.payload};
    case ActionTypes.SHOW_POPUP:
      return {...state, popup: action.payload}
    default:
      return state;
  }
};

export {stateReducer};