import {ActionType} from "../action";
import {StateAction} from "../../types";

interface StateState {
  loginError: null | string,
  popup: null | string,
}

const initialState: StateState = {  
  loginError: null,
  popup: null,
};

const stateReducer = (state = initialState, action: StateAction): StateState => {
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