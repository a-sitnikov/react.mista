import fetchJsonp from 'fetch-jsonp'

export const requestTopic = () => ({
    type: 'REQUEST_TOPIC'
})

export const receiveTopic = (json) => ({
    type: 'RECEIVE_TOPIC',
    info: json[0],
    items: json[1],
    receivedAt: Date.now()
})

const fetchTopic = (params) => dispatch => {

    dispatch(requestTopic())

    Promise.all([
        fetchJsonp(`https://www.mista.ru/ajax_gettopic.php?id=${params.id}`), //topic info
        fetchJsonp(`https://www.mista.ru/api/message.php?id=${params.id}`)    //messages
    ])
        .then(response => {
            const responseJson = response.map(singleResponse => singleResponse.json())
            return Promise.all(responseJson);
        })
        .then(json => dispatch(receiveTopic(json)));
}

const shouldFetchTopic = (state) => {
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
    if (shouldFetchTopic(getState())) {
        return dispatch(fetchTopic(params))
    }
}