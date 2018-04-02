import * as API from '../api'
import { encodeText } from '../utils';

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

const postNewMessage = (params) => async dispatch => {

    dispatch({
        type: 'POST_NEW_MESSAGE_START'
    });

    let fetchParams = {
        message_text: encodeText(params.text),
        action: "new",
        topic_id: params.topicId,
        user_name: encodeURIComponent(params.userName),
        rnd: Math.round(Math.random() * 10000000)    
    };

    if (params.voting_select)
        fetchParams.voting_select = params.voting_select;

    try {
        await API.postNewMessage(fetchParams);

        dispatch({
            type: 'POST_NEW_MESSAGE_COMPLETE'
        });

        if (params.onSuccess)
            params.onSuccess();

    } catch (err) {
        console.error("Faild post new message: " + err);
    }
}