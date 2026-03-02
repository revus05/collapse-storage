import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { fileApi } from "entity/file";
import { materialApi } from "entity/material";
import { materialRestockRequestApi } from "entity/material-restock-request";
import { orderApi } from "entity/order";
import { productApi } from "entity/product";
import { userApi, userSlice } from "entity/user";

const rootReducer = {
  userSlice,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [materialApi.reducerPath]: materialApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [materialRestockRequestApi.reducerPath]: materialRestockRequestApi.reducer,
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
        .concat(fileApi.middleware)
        .concat(materialApi.middleware)
        .concat(orderApi.middleware)
        .concat(materialRestockRequestApi.middleware),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
