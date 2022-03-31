import type { TopicsListState } from 'src/data/topicslist/reducer'
import type { TopicState } from 'src/data/topic/reducer'
import type { LoginState } from '../data/login/reducer'
import type { SectionsState } from 'src/data/sections/reducer'
import type { NewTopicState } from './new_topic'
import type { NewMessageState } from '../data/newmessage/reducer'
import type { TooltipsState } from '../data/tooltips/reducer'
import type { TopicPreviewState } from '../data/topic_preview/reducer'
import type { OptionsState } from '../data/options/reducer'

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
