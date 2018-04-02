import * as API from '../api'

export const addBookmark = (params) => async dispatch => {

    dispatch({
        type: "ADD_BOOKMARK_START"
    });

    try {
        await fetch(API.urlAddBookmark, {
            method: 'POST',
            body: JSON.stringify({ topic_id: params.id }),
            mode: 'no-cors',
            credentials: 'include'
        });
        
        dispatch({
            type: "ADD_BOOKMARK_COMPLETE"
        });

    } catch (err) {
        console.error('Error adding bookmark:', err);
        dispatch({
            type: "ADD_BOOKMARK_FAIL"
        });
    }

}   
