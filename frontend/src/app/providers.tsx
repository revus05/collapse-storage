"use client";

import { type AppStore, makeStore } from "app/store";
import type { PreloadedState } from "entity/user";
import { type FC, type ReactNode, useRef } from "react";
import { Provider } from "react-redux";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: PreloadedState;
};

export const Providers: FC<ProvidersProps> = ({ children, preloadedState }) => {
  const storeRef = useRef<AppStore>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(preloadedState);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
