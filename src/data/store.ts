import { configureStore  } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger' // eslint-disable-line @typescript-eslint/no-unused-vars

import topicsList from './topicslist/reducer'
import topic from './topic/reducer'
import sections from './sections/reducer'
import options from './options/reducer'
import login from './login/reducer'
import tooltips from './tooltips/reducer'
import newTopic from './newtopic/reducer'
import newMessage from './newmessage/reducer'

const reducer = {
  topicsList: topicsList.reducer,
  topic,
  sections: sections.reducer,
  options,
  login,
  tooltips: tooltips.reducer,
  newTopic,
  newMessage
}

const store = configureStore({
  reducer,
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //   immutableCheck: { warnAfter: 128 },
  //   serializableCheck: { warnAfter: 128 },
  // })
  // .concat(logger)
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store