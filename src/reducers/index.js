//@flow
import { combineReducers } from 'redux'

import topicsList from 'src/data/topicslist/reducer'
import type { TopicsListState } from 'src/data/topicslist/reducer'

import topic from 'src/data/topic/reducer'
import type { TopicState } from 'src/data/topic/reducer'

import login from '../data/login/reducer'
import type { LoginState } from '../data/login/reducer'

import sections from 'src/data/sections/reducer'
import type { SectionsState } from 'src/data/sections/reducer'

import newTopic from './new_topic'
import type { NewTopicState } from './new_topic'

import newMessage from './new_message'
import type { NewMessageState } from './new_message'

import tooltips from './tooltips'
import type { TooltipsState } from './tooltips'

import topicPreview from './topic_preview'
import type { TopicPreviewState } from './topic_preview'

import options from './options'
import type { OptionsState } from './options'

export type State = {
  topicsList: TopicsListState,
  sections: SectionsState,
  topic: TopicState,
  login: LoginState,
  bookmark: BookmarkState,
  newTopic: NewTopicState,
  newMessage: NewMessageState,
  tooltips: TooltipsState,
  topicPreview: TopicPreviewState,
  options: OptionsState
}

const rootReducer = combineReducers({
  topicsList,
  sections,
  topic,
  login,
  newTopic,
  newMessage,
  tooltips,
  topicPreview,
  options
})

export default (rootReducer: any);