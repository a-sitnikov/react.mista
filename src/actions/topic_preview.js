//@flow
import * as API from '../api'
import type { ResponseMessage } from '../api'

export type PreviewTextParams = {
    topicId: string,
    n: number
}

export type SHOW_PREVIEW = {
    type: 'SHOW_PREVIEW',
    topicId: string
}

export type CLOSE_PREVIEW = {
    type: 'CLOSE_PREVIEW',
    topicId: string
}

export type REQUEST_PREVIEW_TEXT = {
    type: 'REQUEST_PREVIEW_TEXT',
    topicId: string
}

export type RECEIVE_PREVIEW_TEXT = {
    type: 'RECEIVE_PREVIEW_TEXT',
    topicId: string,
    message: ResponseMessage,
    receivedAt: Date
}

export type TopicPreviewAction = SHOW_PREVIEW | CLOSE_PREVIEW | REQUEST_PREVIEW_TEXT | RECEIVE_PREVIEW_TEXT;

export const fetchTopicPreviewText = (params: PreviewTextParams) => async (dispatch: any) => {

    dispatch({
        type: 'REQUEST_PREVIEW_TEXT',
        topicId: params.topicId
    });


    const json = await API.getTopicMessages({
        id: params.topicId,
        from: params.n,
        to: params.n+1
        });

    if (json.length > 0)
        dispatch({
            type: 'RECEIVE_PREVIEW_TEXT',
            topicId: params.topicId,
            message: json[0],
            receivedAt: new Date()
        });    
}    