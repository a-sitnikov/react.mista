export const shouldPostNewTopic = (state) => {
    const newTopic = state.newTopic;
    if (!newTopic) {
        return false
    }
    if (newTopic.isFetching) {
        return false
    }
    return true
}

export const postNewTopicIfNeeded = (params) => (dispatch, getState) => {
    if (shouldPostNewTopic(getState())) {
        return dispatch(postNewTopic(params));
    }
}

const postNewTopic = (params) => dispatch => {

    dispatch({
        type: 'POST_NEW_TOPIC_START'
    });

    //
    setTimeout(() => {
    dispatch({
        type: 'POST_NEW_TOPIC_COMPLETE'
    })
},
    2000)

}