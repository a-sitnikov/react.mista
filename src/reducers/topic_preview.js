//@flow
import type { TopicPreviewAction } from 'src/actions/topic_preview'
import type { ResponseMessage } from 'src/api'

export type TopicPreviewState = {
    items: {[string]: ResponseMessage | null}
};

export const defaultTopicPreviewState: TopicPreviewState = {
    items: {}
};

const topicPreview = (state: TopicPreviewState = defaultTopicPreviewState, action: TopicPreviewAction): TopicPreviewState => {

    let previewItem;

    switch (action.type) {
         case 'SHOW_PREVIEW':

            previewItem = state[action.topicId];
            if (previewItem === undefined)
                state.items[action.topicId] = {
                    n: '0',
                    id: action.topicId,
                    text: '',
                    user: '',
                    userId: '',
                    utime: '0',
                    vote: 0
                };    
            return {
                ...state,
            }
         case 'CLOSE_PREVIEW': {
            delete state.items[action.topicId];
            return {
                ...state
            }
         }
        case 'RECEIVE_PREVIEW_TEXT':

            previewItem = state.items[action.topicId];
            if (previewItem === undefined)
                return state;
            else
                state.items[action.topicId] = action.message;        
            
            return {
                ...state,
            }
        default:
            return state
    }
}

export default topicPreview;