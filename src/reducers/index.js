//@flow
import { combineReducers } from 'redux'

import topicsList from './topics_list'
import type { TopicsListState } from './topics_list'

import topic from './topic'
import type { TopicState } from './topic'

import login from './login'
import type { LoginState } from './login'

import sections from './sections'
import type { SectionsState } from './sections'

import bookmark from './bookmark'
import type { BookmarkState } from './bookmark'

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
  bookmark,
  newTopic,
  newMessage,
  tooltips,
  topicPreview,
  options
})

export default (rootReducer: any);