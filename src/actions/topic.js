import fetchJsonp from 'fetch-jsonp'

export const requestTopic = () => ({
    type: 'REQUEST_TOPIC'
})

export const receiveTopic = (json) => ({
    type: 'RECEIVE_TOPIC',
    items: json,
    receivedAt: Date.now()
})

const fetchTopic = (topicId) => dispatch => {

    dispatch(requestTopic())

    return fetchJsonp(`https://www.mista.ru/api/message.php?id=${topicId}`)
        .then(response => response.json())
        .then(json => dispatch(receiveTopic(json)))
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

export const fetchTopicIfNeeded = (topicId) => (dispatch, getState) => {
    if (shouldFetchTopic(getState())) {
      return dispatch(fetchTopic(topicId))
    }
  }