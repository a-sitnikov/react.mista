import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import type { RenderOptions } from '@testing-library/react'
//import type { PreloadedState } from '@reduxjs/toolkit' - doesn't work

import type { RootState } from 'src/store'
import { reducer } from 'src/store'


export type PartialState<S> = {
  [K in keyof S]?: S[K]
}

export const setupStore = (preloadedState?: PartialState<RootState>) => {
  return configureStore({
    reducer,
    preloadedState
  })
}

export type AppStore = ReturnType<typeof setupStore>

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PartialState<RootState>
  store?: AppStore
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
    return <Provider store={store}>{children}</Provider>
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}