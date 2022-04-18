import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {dataReducer} from "./reducers/data-reducer";
import {userReducer} from "./reducers/user-reducer";
import {stateReducer} from "./reducers/state-reducer";
import { createAPI } from "./../api/api";
import { ActionCreator } from "./action";

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  state: stateReducer,
});

const api = createAPI(
  () => store.dispatch(ActionCreator.updateAuth(false))
);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
  )
);

export default store;