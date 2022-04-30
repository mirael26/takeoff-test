import {ActionType} from "../action";
import {UserInfo, UserAction} from "../../types";

interface UserState {
  authStatus: boolean,
  userInfo: {} | UserInfo,
}

const initialState: UserState = {  
  authStatus: false,
  userInfo: {},
};

const userReducer = (state = initialState, action: any): UserState => {
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