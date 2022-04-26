import { ActionType } from "../action";

const initialState = {  
  authStatus: false,
  userInfo: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_AUTH:
      return {...state, authStatus: action.payload};
    case ActionType.LOAD_USER_INFO: 
      return {...state, userInfo: action.payload};
    default:
      return state;
  }
};

export {userReducer};