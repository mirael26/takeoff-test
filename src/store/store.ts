import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import {dataReducer} from "./reducers/data-reducer";
import {userReducer} from "./reducers/user-reducer";
import {stateReducer} from "./reducers/state-reducer";
import {createAPI} from "../api/api";
import {ActionCreator} from "./action";

const saveToLocalStorage = (state: Reducer) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem('state');
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const persistedStore = loadFromLocalStorage();

const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  state: stateReducer,
});

type Reducer = ReturnType<typeof rootReducer>;

const api = createAPI(
  () => store.dispatch(ActionCreator.updateAuth(false))
);

type Api = ReturnType<typeof api>;

const store = createStore(
  rootReducer,
  persistedStore,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
  )
);


store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
export {Reducer};