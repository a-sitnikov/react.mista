import fetchJsonp from 'fetch-jsonp'

export const requestTopic = () => ({
    type: 'REQUEST_TOPIC'
})

export const receiveTopic = (json) => {

    let items;
    if (json.length === 2) 
        items = json[1]
    else
        // post 0 and others
        items = json[1].slice(0, 1).concat(json[2]);   

    return {
        type: 'RECEIVE_TOPIC',
        info: typeof(json[0]) === "string" ? JSON.parse(json[0]) : json[0],
        items: items,
        receivedAt: Date.now()
    }
}


export const fetchTopic = (params) => dispatch => {

    dispatch(requestTopic())

    const page = params.page;
    let first = 0;
    
    let queries = [
        `https://www.mista.ru/ajax_gettopic.php?id=${params.id}`
    ];

    if (page > 1) {
        first = (page - 1) * 100 + 1;
        queries.push(`https://www.mista.ru/api/message.php?id=${params.id}&from=0&to=1`);
    }

    const last = page*100 - 1;
    queries.push(`https://www.mista.ru/api/message.php?id=${params.id}&from=${first}&to=${last}`);

    Promise.all(queries.map(url => fetchJsonp(url)))
        .then(response => {
            const responseJson = response.map(singleResponse => singleResponse.json())
            return Promise.all(responseJson);
        })
        .then(json => dispatch(receiveTopic(json)));
}

const shouldFetchTopic = (state) => {
    const topic = state.topic;
    if (!topic) {
        return true
    }
    if (topic.isFetching) {
        return false
    }
    return true
}

export const fetchTopicIfNeeded = (params) => (dispatch, getState) => {
    if (shouldFetchTopic(getState())) {
        return dispatch(fetchTopic(params))
    }
}