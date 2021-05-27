//@flow
import type { NewMessageAction } from 'src/actions/new_message'

export type NewMessageState = {
    isFetching: boolean;
    text: string
};

export const defaultNewMessageState: NewMessageState = {
    isFetching: false,
    text: ''
}

const newMessage = (state: NewMessageState = defaultNewMessageState, action: NewMessageAction): NewMessageState => {
    switch (action.type) {
        case 'POST_NEW_MESSAGE_START':
            return {
                ...state,
                isFetching: true
            }
        case 'POST_NEW_MESSAGE_COMPLETE':
            return {
                ...state,
                isFetching: false
            }
        case 'NEW_MESSAGE_TEXT':
            return {
                ...state,
                text: action.text
            }
        case 'ADD_MESSAGE_TEXT':
            return {
                ...state,
                text: state.text + action.text
            }
        default:
            return state
    }
}

export default newMessage;