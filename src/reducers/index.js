import { combineReducers } from 'redux'
import topicsList from './topics_list'
import topic from './topic'
import login from './login'
import sections from './sections'
import bookmark from './bookmark'
import banner from './banner'
import newTopic from './new_topic'

const rootReducer = combineReducers({
    topicsList,
    sections,
    topic,
    login,
    banner,
    bookmark,
    newTopic
})

export default rootReducer;