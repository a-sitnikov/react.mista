import API from '../api'
import { join } from '../utils'

export const showTooltip = (params, coords, data) => async (dispatch) => {

    if (params.type === 'TOPIC') {

        if (!data) {
            const response = await fetch(`${API.topicMessages}?id=${params.topicId}&from=${params.number}&to=${+params.number + 1}`);
            const json = await response.json();
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