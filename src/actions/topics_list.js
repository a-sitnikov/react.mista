//@flow
import * as API from '../api'
import type { RequestTopicsList, ResponseTopicsList } from 'src/api'
import type { State } from 'src/reducers'

export type REQUEST_TOPICS_LIST = {
    type: 'REQUEST_TOPICS_LIST'
}

export type RECEIVE_TOPICS_LIST = {
    type: 'RECEIVE_TOPICS_LIST',
    items: ResponseTopicsList,
    receivedAt: Date
}

export type RECEIVE_TOPICS_LIST_FAILED = {
    type: 'RECEIVE_TOPICS_LIST_FAILED',
    error: string,
    receivedAt: Date
}

export type TOGGLE_PREVIEW = {
    type: 'TOGGLE_PREVIEW',
    topicId: string
}

export type TopicsListAction = REQUEST_TOPICS_LIST | RECEIVE_TOPICS_LIST | RECEIVE_TOPICS_LIST_FAILED | TOGGLE_PREVIEW;

export const requestTopicsList = (): REQUEST_TOPICS_LIST => ({
    type: 'REQUEST_TOPICS_LIST'
})

export const receiveTopicsList = (data: ResponseTopicsList): RECEIVE_TOPICS_LIST => ({
    type: 'RECEIVE_TOPICS_LIST',
    items: data,
    receivedAt: new Date()
})

const fetchTopicsList = (params: any) => async (dispatch: any, getState: any) => {

    dispatch(requestTopicsList())

    const page = params.page || 1;
    let reqestParams: RequestTopicsList = {};

    let topicsPerPage = +getState().options.items.topicsPerPage;
    if (topicsPerPage > 99) topicsPerPage = 99;

    let topicsCount = page * topicsPerPage;
    reqestParams.topics = topicsCount;

    if (params.section)
        reqestParams.section_short_name = params.section;

    if (params.forum)
        reqestParams.forum = params.forum;

    if (params.user_id)
        reqestParams.user_id = params.user_id;

    if (params.mytopics)
        reqestParams.mytopics = params.mytopics;

    try {
        const json = await API.getTopicsList(reqestParams);

        let data = json.slice(-topicsPerPage);
        dispatch(receiveTopicsList(data));
    } catch(e) {
        
        let action: RECEIVE_TOPICS_LIST_FAILED = {
            type: 'RECEIVE_TOPICS_LIST_FAILED',
            error: e.message,
            receivedAt: new Date()            
        }
        dispatch(action);
        console.error(e);
    }   

}

const shouldFetchTopicsList = (state: State) => {
    const topicsList = state.topicsList;
    if (!topicsList) {
        return true
    }
    if (topicsList.isFetching) {
        return false
    }
    return true
}

export const fetchTopicsListIfNeeded = (params: any) => (dispatch: any, getState: any) => {
    if (shouldFetchTopicsList(getState())) {
        return dispatch(fetchTopicsList(params));
    }
}
