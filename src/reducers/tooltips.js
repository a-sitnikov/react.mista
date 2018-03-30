
const defaultState = {
    items: []
}

const tooltips = (state = defaultState, action) => {
    switch (action.type) {
        case 'CREATE_TOOLTIP':

            let items = state.items.slice();

            let tooltip = items.find(val => val.hash === action.hash);
            if (!tooltip)
                items.push({
                    i: 0,
                    keys: action.keys,
                    hash: action.hash,
                    coords: action.coords,
                    data: action.data
                });
            else {   
                tooltip.coords = action.coords;
                //to reset draggable position
                tooltip.i += 1;
            }

            return {
                ...state,
                items
            }
        case 'CLOSE_TOOLTIP':
            return {
                ...state,
                items: state.items.filter(val => val.hash !== action.hash)
            }
        case 'CLEAR_TOOLTIPS':
            return {
                ...state,
                items: []
            }

        default:
            return state
    }
}

export default tooltips;