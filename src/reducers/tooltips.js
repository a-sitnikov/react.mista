//@flow
import type { TooltipItem, TooltipsAction } from 'src/actions/tooltips'

export type TooltipItemState = {
    i: number,
    hash: string
} & TooltipItem

export type TooltipsState = {
    items: Array<TooltipItemState>
};

export const defaultTooltipsState = {
    items: []
}

const tooltips = (state: TooltipsState = defaultTooltipsState, action: TooltipsAction) => {
    let hash: string;
    let items: Array<TooltipItemState>;
    let tooltip;
    switch (action.type) {
        case 'CREATE_TOOLTIP':

            items = state.items.slice();

            hash = JSON.stringify(action.keys);
            var ind = items.findIndex(val => val.hash === hash);
            if (ind === - 1)
                items.push({
                    i: 0,
                    keys: action.keys,
                    hash,
                    coords: action.coords
                });
            else {   
                tooltip = Object.assign({}, items[ind]);
                tooltip.coords = action.coords;
                //to reset draggable position
                tooltip.i += 1;
                items[ind] = tooltip;
            }

            return {
                ...state,
                items
            }
        case 'CLOSE_TOOLTIP':
            hash = JSON.stringify(action.keys);
            return {
                ...state,
                items: state.items.filter(val => val.hash !== hash)
            }
        case 'CLEAR_TOOLTIPS':
            if (state.items.length === 0)
                return state
            else     
                return {
                    ...state,
                    items: []
                }

        default:
            return state
    }
}

export default tooltips;