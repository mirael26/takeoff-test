import { ActionType } from "../action";

interface stateState {
  loginError: boolean | string
}

const initialState = {  
  loginError: false,
};

const stateReducer = (state:stateState = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_LOGIN_ERROR:
      return {...state, loginError: action.payload};

    default:
      return state;
  }
};

export {stateReducer};