import { combineReducers, configureStore } from "@reduxjs/toolkit";

import accountReducer from "./accounts/reducers";

const rootReducer = combineReducers({
  account: accountReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}
