import { configureStore  } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger' // eslint-disable-line @typescript-eslint/no-unused-vars

import { topicsList } from './topics_list'
import { topic } from './topic'
import { sections } from './sections'
import { options } from './options'
import { login } from './login'
import { tooltips } from './tooltips'
import { newTopic } from './new_topic'
import newMessage from '../data/newmessage/reducer'

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