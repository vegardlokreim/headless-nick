import { configureStore, AnyAction, EnhancedStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "@/state/slices/cartSlice";
import { MakeStore, createWrapper, HYDRATE } from "next-redux-wrapper";
import { useMemo } from "react";
import { Persistor } from "redux-persist";

interface AppState {
  cart: ReturnType<typeof cartReducer>;
}

export type RootState = ReturnType<typeof combinedReducers>;

interface ExtendedStore extends EnhancedStore {
  __persistor: Persistor;
}

const persistConfig = {
  key: "root",
  storage,
};

const combinedReducers = combineReducers<AppState>({
  cart: cartReducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction): RootState => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    } as RootState;
    return nextState;
  } else {
    return combinedReducers(state, action);
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = (): ExtendedStore => {
  const store = configureStore({
    reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
          // Add this line to ignore the actions from RTK Query as well
          ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        },
      })
  });
  const persistor = persistStore(store);

  (store as ExtendedStore).__persistor = persistor;

  return store as ExtendedStore;
};

export const wrapper = createWrapper(makeStore);

export const useStore = (initialState: RootState | undefined) => {
  const store = useMemo(() => makeStore(), []);
  return store;
};
