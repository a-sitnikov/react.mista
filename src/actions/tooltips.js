import * as API from '../api'
import { join } from '../utils'

export const showTooltip = (params, coords, data) => async (dispatch) => {

    if (params.type === 'TOPIC') {

        if (!data) {
            const json = await API.getTopicMessages({
                id: params.topicId,
                from: +params.number,
                to: +params.number + 1
            });
            if (json.length > 0)
                data = json[0];
            else
                data = {};
        }

        dispatch({
            type: 'CREATE_TOOLTIP',
            keys: params,
            hash: join(params, '#'),
            coords: coords,
            data
        })

    }
}

export const clearTooltipsIfNeeded = (params) => (dispatch, getState) => {
    const state = getState(); 
    if (state.tooltips.items.length > 0)
        dispatch({
            type: 'CLEAR_TOOLTIPS'
        })
}