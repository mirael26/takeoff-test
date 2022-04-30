import {ActionTypes, UserAction, UserState} from "../../types";

const initialState: UserState = {  
  authStatus: false,
  userInfo: {},
};

const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case ActionTypes.UPDATE_AUTH:
      return {...state, authStatus: action.payload};
    case ActionTypes.LOAD_USER_INFO: 
      return {...state, userInfo: action.payload};
    default:
      return state;
  }
};

export {userReducer};