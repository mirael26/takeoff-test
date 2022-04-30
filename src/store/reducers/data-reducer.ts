import {ActionTypes, DataAction, DataState} from "../../types";

const initialState: DataState = {
  contacts: [],
};

const dataReducer = (state = initialState, action: DataAction): DataState => {
  switch (action.type) {
    case ActionTypes.LOAD_CONTACTS:
      return {...state, contacts: action.payload};
    default:
      return state;
  }
};

export {dataReducer};