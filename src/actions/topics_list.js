export const requestTopicsList = () => ({
    type: 'REQUEST_TOPICS_LIST'
})

export const receiveTopicsList = (data) => ({
    type: 'RECEIVE_TOPICS_LIST',
    items: data,
    receivedAt: Date.now()
})

const fetchTopicsList = (page, section) => dispatch => {

    dispatch(requestTopicsList())

    let topicsCount = page*20;
    let url = [`https://www.mista.ru/api/topic.php?topics=${topicsCount}`]
    if (section)
        url.push(`&section=${section}`)

    return fetch(url.join())
        .then(response => response.json())
        .then(json => {
            let data = json.slice(-20);
            return dispatch(receiveTopicsList(data))
        })
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

export const fetchTopicsListIfNeeded = (page, section) => (dispatch, getState) => {
    if (shouldFetchTopicsList(getState())) {
      return dispatch(fetchTopicsList(page, section));
    }
  }