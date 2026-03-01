import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi, userSlice } from "entity/user";

const rootReducer = {
  userSlice,
  [userApi.reducerPath]: userApi.reducer,
};

const mainReducer = combineReducers(rootReducer);

export type RootState = ReturnType<typeof mainReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
