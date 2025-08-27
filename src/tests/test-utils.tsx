import { configureStore } from "@reduxjs/toolkit";
import { render, type RenderOptions } from "@testing-library/react";
import React, { type PropsWithChildren } from "react";
import { Provider } from "react-redux";

//import type { PreloadedState } from '@reduxjs/toolkit' - doesn't work

import { type RootState, reducer } from "src/store";

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer,
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
