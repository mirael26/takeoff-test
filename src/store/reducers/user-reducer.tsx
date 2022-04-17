import { ActionType } from "../action";

const initialState = {  
  authStatus: false,
  authInfo: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTH:
      return {...state, authStatus: action.payload};
    default:
      return state;
  }
};

export {userReducer};