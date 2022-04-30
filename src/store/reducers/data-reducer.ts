import {ActionType} from "../action";

import {Contacts, DataAction} from "../../types";

interface DataState {
  contacts: Contacts,
}

const initialState: DataState = {
  contacts: [],
};

const dataReducer = (state = initialState, action: DataAction): DataState => {
  switch (action.type) {
    case ActionType.LOAD_CONTACTS:
      return {...state, contacts: action.payload};
    default:
      return state;
  }
};

export {dataReducer};