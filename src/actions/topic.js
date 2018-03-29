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
        info: typeof(json[0]) === "string" ? parseJSON(json[0]) : json[0],
        items: items,
        receivedAt: Date.now()
    }
}


export const fetchTopic = (params) => dispatch => {

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


    let last = page*100 - 1;
    queries.push(`${API.topicMessages}?id=${params.id}&from=${first}&to=${last}`);

    Promise.all(queries.map(url => fetchJsonp(url)))
        .then(response => {
            const responseJson = response.map(singleResponse => singleResponse.json())
            return Promise.all(responseJson);
        })
        .then(json => dispatch(receiveTopic(json)));
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


export const fetchNewMessages = (params) => (dispatch) => {

    dispatch({
        type: 'REQUEST_NEW_MESSAGES'
    });

    fetch(`${API.topicMessages}?id=${params.id}&from=${params.last + 1}&to=1002`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: 'RECEIVE_NEW_MESSAGES',
                items: json,
                receivedAt: Date.now()
            });
        });
}

export const fetchNewMessagesIfNeeded = (params) => (dispatch, getState) => {
    if (shouldFetch(getState())) {
        return dispatch(fetchNewMessages(params));
    }
}