//@flow
import * as API from '../api'
import type { RequestNewTopic } from '../api'
import type { State } from '../reducers'

import { encodeText } from '../utils';
    
export type postNewTopicParams = {
    subject: string,
    text: string,
    section: number,
    forum: string,
    isVoting: boolean,
    votingItems?: Array<string>
};

export type POST_NEW_TOPIC_START = {
    type: 'POST_NEW_TOPIC_START'
}

export type POST_NEW_TOPIC_COMPLETE = {
    type: 'POST_NEW_TOPIC_COMPLETE'
}

export type POST_NEW_TOPIC_ERROR = {
    type: 'POST_NEW_TOPIC_ERROR',
    error: string
}

export type NEW_TOPIC_TEXT = {
    type: 'NEW_TOPIC_TEXT',
    text: string
}

export type NEW_TOPIC_SHOW_VOTING = {
    type: 'SHOW_VOTING',
    data: boolean
}

export type NEW_TOPIC_FORUM = {
    type: 'NEW_TOPIC_FORUM',
    data: string
}

export type NewTopicAction = POST_NEW_TOPIC_START | POST_NEW_TOPIC_COMPLETE | POST_NEW_TOPIC_ERROR | NEW_TOPIC_TEXT | NEW_TOPIC_SHOW_VOTING | NEW_TOPIC_FORUM;

export const shouldPostNewTopic = (state: State): boolean => {
    const newTopic = state.newTopic;
    if (!newTopic) {
        return false
    }
    if (newTopic.isFetching) {
        return false
    }
    return true
}

export const postNewTopicIfNeeded = (params: postNewTopicParams) => (dispatch: any, getState: any) => {
    if (shouldPostNewTopic(getState())) {
        return dispatch(postNewTopic(params));
    }
}

const postNewTopic = (params: postNewTopicParams) => async (dispatch: any) => {

    dispatch({
        type: 'POST_NEW_TOPIC_START'
    });

    let fetchParams: RequestNewTopic = {
        message_text: encodeText(params.text),
        topic_text: encodeText(params.subject),
        target_section: String(params.section),
        target_forum: params.forum,
        action: 'new',
        rnd: Math.round(Math.random() * 10000000),
        voting: params.isVoting ? 1 : 0
    };

    if (params.isVoting && params.votingItems) 
        for (let i=0; i<params.votingItems.length; i++) {
            fetchParams[`section${i+1}`] = params.votingItems[i];
        }
    /*
    await API.postNewTopic(fetchParams);
    */
    setTimeout(() => {
    dispatch({
        type: 'POST_NEW_TOPIC_COMPLETE'
    })
},
    2000)

}