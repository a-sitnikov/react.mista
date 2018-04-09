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

import banner from './banner'
import newTopic from './new_topic'

import newMessage from './new_message'
import type { NewMessageState } from './new_message'

import tooltips from './tooltips'
import type { TooltipsState } from './tooltips'

export type State = {
    topicsList: TopicsListState,
    sections: SectionsState,
    topic: TopicState,
    login: LoginState,
    banner: any,
    bookmark: BookmarkState,
    newTopic: any,
    newMessage: NewMessageState,
    tooltips: TooltipsState        
}

const rootReducer = combineReducers({
    topicsList,
    sections,
    topic,
    login,
    banner,
    bookmark,
    newTopic,
    newMessage,
    tooltips
})

export default rootReducer;