import API from '../api'

export const addBookmark = (params) => dispatch => {

    dispatch({
        type: "ADD_BOOKMARK_START"
    });

    fetch(API.addBookmark, {
        method: 'POST',
        body: JSON.stringify({ topic_id: params.id }),
        mode: 'cors',
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok)
                throw Error(`${response.status}: ${response.statusText}`);

            dispatch({
                type: "ADD_BOOKMARK_COMPLETE"
            });
        })
        .catch(error => {
            console.log('Error adding bookmark:', error);
            dispatch({
                type: "ADD_BOOKMARK_FAIL"
            });
        })

}   
