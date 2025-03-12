import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accounts/reducers";

const rootReducer = combineReducers({
  account: accountReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}
