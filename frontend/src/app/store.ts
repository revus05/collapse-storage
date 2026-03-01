import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fileApi } from "entity/file";
import { productApi } from "entity/product";
import { userApi, userSlice } from "entity/user";

const rootReducer = {
  userSlice,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
};

const mainReducer = combineReducers(rootReducer);

export type RootState = ReturnType<typeof mainReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(productApi.middleware)
        .concat(fileApi.middleware),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
