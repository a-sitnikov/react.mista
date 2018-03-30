import fetchJsonp from 'fetch-jsonp'
import API from '../api'
import { parseJSON } from '../utils'

export const requestTopic = () => ({
    type: 'REQUEST_TOPIC'
})

export const receiveTopic = (info, item0, items) => {

    return {
        type: 'RECEIVE_TOPIC',
        info: typeof (info) === "string" ? parseJSON(info) : info,
        item0,
        items,
        receivedAt: Date.now()
    }
}


export const fetchTopic = (params, item0) => async dispatch => {

    dispatch(requestTopic())

    let page = params.page || 1;
    let queries = [];

    if (page === 'last20') {

        let response = await fetchJsonp(`${API.topicInfo}?id=${params.id}`, {
            mode: 'no-cors',
            credentials: 'include'
        });
        let info = await response.json();
        info = typeof (info) === 'string' ? JSON.parse(info) : info;

        if (info.answers_count > 21) {

            if (!item0)
                queries.push(`${API.topicMessages}?id=${params.id}&from=0&to=1`);

            let first = info.answers_count - 20;
            queries.push(`${API.topicMessages}?id=${params.id}&from=${first}&to=1010`);

        } else {
            queries.push(`${API.topicMessages}?id=${params.id}&from=0&to=1010`);
        }

    } else {

        page = +page;
        let first = 0;

        queries.push(`${API.topicInfo}?id=${params.id}`);

        if (page > 1) {

            first = (page - 1) * 100 + 1;
            if (!item0)
                queries.push(`${API.topicMessages}?id=${params.id}&from=0&to=1`);

        } else {
            if (item0)
                first = 1;
            else
                first = 0;
        }

        let last = page * 100 - 1;
        queries.push(`${API.topicMessages}?id=${params.id}&from=${first}&to=${last}`);
    }
    
    try {
        const responseArr = await Promise.all(queries.map(url => fetchJsonp(url)))
        const jsonArr = await Promise.all(responseArr.map(singleResponse => singleResponse.json()))

        let info = jsonArr[0];
        let _item0, _items;
        if (item0) {
            _item0 = item0;
            _items = jsonArr[1];
        } else {
            _item0 = jsonArr[1][0];
            _items = jsonArr[1].slice(1);
        }
        dispatch(receiveTopic(info, _item0, _items));
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

export const fetchTopicIfNeeded = (params, item0) => (dispatch, getState) => {
    if (shouldFetch(getState())) {
        return dispatch(fetchTopic(params, item0));
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