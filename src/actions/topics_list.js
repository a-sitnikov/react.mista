export const requestTopicsList = () => ({
    type: 'REQUEST_TOPICS_LIST'
})

export const receiveTopicsList = (json) => ({
    type: 'RECEIVE_TOPICS_LIST',
    items: json,
    receivedAt: Date.now()
})

const fetchTopicsList = (page) => dispatch => {

    dispatch(requestTopicsList())

    return fetch(`https://www.mista.ru/api/topic.php`)
        .then(response => response.json())
        .then(json => dispatch(receiveTopicsList(json)))
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

export const fetchTopicsListIfNeeded = (page) => (dispatch, getState) => {
    if (shouldFetchTopicsList(getState())) {
      return dispatch(fetchTopicsList(page))
    }
  }