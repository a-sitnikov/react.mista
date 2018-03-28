import API from '../api'

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

    let fetchParams = [];
    fetchParams.push("message_text=" + encodeURIComponent(params.text));
    fetchParams.push("action=new");
    fetchParams.push("topic_id=" + params.topicId);
    fetchParams.push("user_name=" + encodeURIComponent(params.userName));
    fetchParams.push("rnd=" + Math.round(Math.random() * 10000000));

    if (params.voting_select) {
        fetchParams.push("voting_select=" + params.voting_select);
    }
    
    fetch(API.postNewMessage, {
        method: 'POST',
        body: fetchParams.join('&'),
        mode: 'no-cors',
        credentials: 'include'
    })
    .then(response => {
        dispatch({
            type: 'POST_NEW_MESSAGE_COMPLETE'
        });
        
        params.onSuccess();
    
    });
}