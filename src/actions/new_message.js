export const shouldPostNewMessage = (state) => {
    const newMessage = state.newMessage;
    if (!newMessage) {
        return false
    }
    if (newMessage.isFetching) {
        return false
    }
    return true
}

export const postNewMessageIfNeeded = (params) => (dispatch, getState) => {
    if (shouldPostNewMessage(getState())) {
        return dispatch(postNewMessage(params));
    }
}

const postNewMessage = (params) => dispatch => {

    dispatch({
        type: 'POST_NEW_MESSAGE_START'
    });
    //
    setTimeout(() => {
    dispatch({
        type: 'POST_NEW_MESSAGE_COMPLETE'
    })
},
    2000)

}