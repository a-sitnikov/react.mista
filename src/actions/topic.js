import fetchJsonp from 'fetch-jsonp'
import API from '../api'
import { parseJSON } from '../utils'

export const requestTopic = () => ({
    type: 'REQUEST_TOPIC'
})

export const receiveTopic = (json) => {

    let items;
    if (json.length === 2)
        items = json[1]
    else
        // post 0 and others
        items = json[1].slice(0, 1).concat(json[2]);

    return {
        type: 'RECEIVE_TOPIC',
        info: typeof (json[0]) === "string" ? parseJSON(json[0]) : json[0],
        items: items,
        receivedAt: Date.now()
    }
}


export const fetchTopic = (params) => async dispatch => {

    dispatch(requestTopic())

    const page = params.page;
    let first = 0;

    let queries = [
        `${API.topicInfo}?id=${params.id}`
    ];

    if (page > 1) {
        first = (page - 1) * 100 + 1;
        queries.push(`${API.topicMessages}?id=${params.id}&from=0&to=1`);
    }

    let last = page * 100 - 1;
    queries.push(`${API.topicMessages}?id=${params.id}&from=${first}&to=${last}`);

    try {
        const responseArr = await Promise.all(queries.map(url => fetchJsonp(url)));
        const jsonArr = await Promise.all(responseArr.map(singleResponse => singleResponse.json()));

        dispatch(receiveTopic(jsonArr));
    } catch (error) {
        
        console.error('Failed to fetch topic:', error);

        dispatch({
            type: 'RECEIVE_TOPIC_FAILED',
            error,
            receivedAt: Date.now()
        });

    }
}

const shouldFetch = (state) => {
    const topic = state.topic;
    if (!topic) {
        return true
    }
    if (topic.isFetching) {
        return false
    }
    return true
}

export const fetchTopicIfNeeded = (params) => (dispatch, getState) => {
    if (shouldFetch(getState())) {
        return dispatch(fetchTopic(params));
    }
}


export const fetchNewMessages = (params) => async (dispatch) => {

    dispatch({
        type: 'REQUEST_NEW_MESSAGES'
    });

    try {
        const response = await fetch(`${API.topicMessages}?id=${params.id}&from=${params.last + 1}&to=1002`);
        const json = await response.json();

        dispatch({
            type: 'RECEIVE_NEW_MESSAGES',
            items: json,
            receivedAt: Date.now()
        });

    } catch (error) {
        console.error('Failed to fetch new messages:', error);

        dispatch({
            type: 'RECEIVE_NEW_MESSAGES_FAILED',
            error,
            receivedAt: Date.now()
        });
    }

}

export const fetchNewMessagesIfNeeded = (params) => (dispatch, getState) => {
    if (shouldFetch(getState())) {
        return dispatch(fetchNewMessages(params));
    }
}