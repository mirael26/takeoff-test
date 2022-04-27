import { ActionType } from "../action";

const initialState = {
  contacts: []
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_CONTACTS:
      return {...state, contacts: action.payload};
    default:
      return state;
  }
};

export {dataReducer};