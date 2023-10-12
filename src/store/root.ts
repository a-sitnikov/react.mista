import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  topicsList,
  topic,
  sections,
  options,
  login,
  tooltips,
  newTopic,
  newMessage,
} from "./slices";

const persistConfig = {
  key: "options",
  storage,
};

export const reducer = combineReducers({
  topicsList,
  topic,
  sections,
  options: persistReducer(persistConfig, options),
  login,
  tooltips,
  newTopic,
  newMessage,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
