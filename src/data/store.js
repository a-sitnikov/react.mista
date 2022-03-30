import { configureStore  } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

import topicsList from './topicslist/reducer'
import topic from './topic/reducer'
import sections from './sections/reducer'
import options from './options/reducer'
import login from './login/reducer'
import tooltips from './tooltips/reducer'

import newTopic from 'src/reducers/new_topic'
import newMessage from 'src/reducers/new_message'
import topicPreview from './topic_preview/reducer'

const reducer = {
  topicsList,
  topic,
  sections,
  options,
  login,
  tooltips,
  newTopic,
  newMessage,
  topicPreview  
}

const store = configureStore({
  reducer,
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production'
})

export const useAppDispatch = () => useDispatch()

export default store