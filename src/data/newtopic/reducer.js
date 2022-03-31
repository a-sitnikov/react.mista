//@flow
import { createReducer } from '@reduxjs/toolkit'

import { postNewTopicStart, postNewTopicComplete, postNewTopicError, newTopicText, 
  newTopicClear, newTopicSubject, newTopicSection, newTopicShowVoting} from './actions'
import type { NewTopicAction } from './actions/new_topic'
import type { ResponseSection } from 'src/api'

export type NewTopicState = {
  isFetching: boolean,
  section: ?ResponseSection,
  text: string,
  subject: string,
  forum: string,
  isVoting: boolean,
  error?: ?string
};

export const defaultNewTopicState: NewTopicState = {
  isFetching: false,
  section: null,
  text: '',
  subject: '',
  forum: '1C',
  isVoting: false
}

const reducer = createReducer(defaultNewTopicState, (builder) => {
  builder
    .addCase(postNewTopicStart, (state) => {
      state.isFetching = true;
      delete state.error;
    })
    .addCase(postNewTopicComplete, (state) => {
      state.isFetching = false;
    })
    .addCase(postNewTopicError, (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    })
    .addCase(newTopicText, (state, action) => {
      state.text = action.payload.text;
    })    
    .addCase(newTopicClear, (state) => {
      state.text = '';
      state.subject = '';
      state.isVoting = false;
    })    
    .addCase(newTopicSubject, (state, action) => {
      state.subject = action.payload.text;
    })    
    .addCase(newTopicShowVoting, (state, action) => {
      state.isVoting = action.payload.show;
    })   
    .addCase(newTopicSection, (state, action) => {
      state.section = action.payload.section;
      state.forum = action.payload.section == null ? '' : action.payload.section.forum.toLowerCase()
    })   
  })

const newTopic = (state: NewTopicState = defaultNewTopicState, action: NewTopicAction): NewTopicState => {
  switch (action.type) {
    case 'POST_NEW_TOPIC_START':
      return {
        ...state,
        isFetching: true,
        error: undefined
      }
    case 'POST_NEW_TOPIC_COMPLETE':
      return {
        ...state,
        isFetching: false
      }
    case 'POST_NEW_TOPIC_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case 'NEW_TOPIC_SECTION':
      return {
        ...state,
        section: action.section,
        forum: action.section == null ? '' : action.section.forum.toLowerCase()
      }
    case 'NEW_TOPIC_TEXT':
      return {
        ...state,
        text: action.text
      }
    case 'NEW_TOPIC_SUBJECT':
      return {
        ...state,
        subject: action.text
      }
    case 'NEW_TOPIC_CLEAR':
      return {
        ...state,
        text: '',
        subject: '',
        isVoting: false
      }
    case 'SHOW_VOTING':
      return {
        ...state,
        isVoting: action.data
      }
    default:
      return state
  }
}

export default reducer;