import API from '../api'

export const requestTopicsList = () => ({
    type: 'REQUEST_TOPICS_LIST'
})

export const receiveTopicsList = (data) => ({
    type: 'RECEIVE_TOPICS_LIST',
    items: data,
    receivedAt: Date.now()
})

const fetchTopicsList = (params) => dispatch => {

    dispatch(requestTopicsList())

    const page = params.page || 1;

    let topicsCount = page * 20;
    let url = [`${API.topicsList}?topics=${topicsCount}`]
    if (params.section)
        url.push(`&section_short_name=${params.section}`)

    if (params.forum)
        url.push(`&forum=${params.forum}`)

    if (params.user_id)
        url.push(`&user_id=${params.user_id}`)

    if (params.mytopics)
        url.push(`&mytopics=${params.mytopics}`)

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

export const fetchTopicsListIfNeeded = (params) => (dispatch, getState) => {
    if (shouldFetchTopicsList(getState())) {
        return dispatch(fetchTopicsList(params));
    }
}
