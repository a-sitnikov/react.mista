import { configureStore  } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import topicsList from './topicslist/reducer'
import topic from './topic/reducer'
import sections from './sections/reducer'
import options from './options/reducer'
import login from './login/reducer'
import tooltips from './tooltips/reducer'
import newTopic from './newtopic/reducer'
import newMessage from './newmessage/reducer'

const reducer = {
  topicsList,
  topic,
  sections,
  options,
  login,
  tooltips,
  newTopic,
  newMessage
}

const store = configureStore({
  reducer,
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store