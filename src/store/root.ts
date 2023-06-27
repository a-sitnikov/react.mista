import { configureStore  } from '@reduxjs/toolkit'
import logger from 'redux-logger' // eslint-disable-line @typescript-eslint/no-unused-vars

import { topicsList, topic, sections, options, login, tooltips, newTopic, newMessage } from './slices'

export const reducer = {
  topicsList,
  topic,
  sections,
  options,
  login,
  tooltips,
  newTopic,
  newMessage
}

export const store = configureStore({
  reducer,
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})
