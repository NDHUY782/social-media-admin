import { combineReducers } from "redux";

import { thunk } from "redux-thunk";
import accountReducer from "./accounts/reducers";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { setAuthToken } from "../helpers";
import { PersistPartial } from "redux-persist/lib/persistReducer";
import { usersReducer } from "./users/reducers";
import { alertReducer } from "./alert/reducers";
import { notificationReducer } from "./notifications/reducers";

// Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

const rootReducer = combineReducers({
  account: accountReducer,
  users: usersReducer,
  alert: alertReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// export type AppState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof rootReducer> & PersistPartial;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(thunk),
});

// export default function createStore() {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//         },
//       }),
//   });
// }

let currentState = store.getState() as AppState;
store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState() as AppState;

  if (
    previousState &&
    currentState &&
    "account" in previousState &&
    "account" in currentState &&
    previousState.account &&
    currentState.account
  ) {
    // if the token changes set the value in localStorage and axios headers
    if (previousState.account.token !== currentState.account.token) {
      const token = currentState.account.token;
      if (token) {
        setAuthToken(token);
      }
    }
  }
});
export const persistor = persistStore(store);
