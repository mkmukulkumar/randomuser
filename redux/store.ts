import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./features/auth-slice"
import { TypedUseSelectorHook, useSelector } from "react-redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
  };

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store=configureStore({
    reducer:{
        auth: persistedAuthReducer,
    },
})

export const persistor = persistStore(store);

export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector