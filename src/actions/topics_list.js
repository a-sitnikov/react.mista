//@flow
import * as API from '../api'
import type { RequestTopicsList, ResponseTopicsList } from '../api'

export const requestTopicsList = () => ({
    type: 'REQUEST_TOPICS_LIST'
})

export const receiveTopicsList = (data: ResponseTopicsList) => ({
    type: 'RECEIVE_TOPICS_LIST',
    items: data,
    receivedAt: Date.now()
})

const fetchTopicsList = (params) => async (dispatch: any) => {

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

const shouldFetchTopicsList = (state) => {
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
