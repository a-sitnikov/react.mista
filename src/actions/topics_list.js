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

export type TopicsListAction = REQUEST_TOPICS_LIST | RECEIVE_TOPICS_LIST;

export const requestTopicsList = (): REQUEST_TOPICS_LIST => ({
    type: 'REQUEST_TOPICS_LIST'
})

export const receiveTopicsList = (data: ResponseTopicsList): RECEIVE_TOPICS_LIST => ({
    type: 'RECEIVE_TOPICS_LIST',
    items: data,
    receivedAt: new Date()
})

const fetchTopicsList = (params: any) => async (dispatch: any) => {

    dispatch(requestTopicsList())

    const page = params.page || 1;
    let reqestParams: RequestTopicsList = {};

    let topicsCount = page * 20;
    reqestParams.topics = topicsCount;

    if (params.section)
        reqestParams.section_short_name = params.section;

    if (params.forum)
        reqestParams.forum = params.forum;

    if (params.user_id)
        reqestParams.user_id = params.user_id;

    if (params.mytopics)
        reqestParams.mytopics = params.mytopics;

    const json = await API.getTopicsList(reqestParams);

    let data = json.slice(-20);
    dispatch(receiveTopicsList(data));

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
