//@flow
import * as API from '../api'
import type { RequestNewMessage } from 'src/api'

export type POST_NEW_MESSAGE_START = {
    type: 'POST_NEW_MESSAGE_START'
}

export type POST_NEW_MESSAGE_COMPLETE = {
    type: 'POST_NEW_MESSAGE_COMPLETE'
}

export type NEW_MESSAGE_TEXT = {
    type: 'NEW_MESSAGE_TEXT',
    text: string
}

export type ADD_MESSAGE_TEXT = {
    type: 'ADD_MESSAGE_TEXT',
    text: string
}


export type NewMessageAction = POST_NEW_MESSAGE_START | POST_NEW_MESSAGE_COMPLETE | NEW_MESSAGE_TEXT | ADD_MESSAGE_TEXT;

export type PostNewmessageParams = {
    text: string,
    topicId: string, 
    voting_select?: number,
    onSuccess?: () => void    
}

export const postNewMessage = (params: PostNewmessageParams): any => async (dispatch: any) => {

    dispatch({
        type: 'POST_NEW_MESSAGE_START'
    });

    let fetchParams: RequestNewMessage = {
        message_text: encodeURIComponent(params.text),
        action: "new",
        topic_id: params.topicId,
        rnd: Math.round(Math.random() * 10000000000)    
    };

    if (params.voting_select)
        fetchParams.voting_select = params.voting_select;

    try {
            await API.postNewMessage(fetchParams);
            await dispatch({
                type: 'POST_NEW_MESSAGE_COMPLETE'
            });
            if (params.onSuccess)
                params.onSuccess();

    } catch (err) {
        console.error("Failed to post new message: " + err);
    }
}

export const addMessageText = (text: string): any => (dispatch: any) => {
    dispatch({
            type: 'ADD_MESSAGE_TEXT',
            text
        })
}