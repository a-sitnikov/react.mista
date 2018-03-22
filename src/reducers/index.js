import { combineReducers } from 'redux'
import topic from './topic'
import login from './login'
import sections from './sections'
import bookmark from './bookmark'

const topicsList = (state = {
    isFetching: false,
    items: []
}, action) => {
    switch (action.type) {
        case 'REQUEST_TOPICS_LIST':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_TOPICS_LIST':
            return {
                ...state,
                isFetching: false,
                items: action.items,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const banner = (state = {
    isFetching: false,
    banner: {}
}, action) => {
    switch (action.type) {
        case 'REQUEST_TOPICS_LIST':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_TOPICS_LIST':
            return {
                ...state,
                isFetching: false,
                banner: action.banner,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    topicsList,
    sections,
    topic,
    login,
    banner,
    bookmark
})

export default rootReducer;