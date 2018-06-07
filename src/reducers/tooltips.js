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
    let items;
    let tooltip;
    switch (action.type) {
        case 'CREATE_TOOLTIP':

            items = state.items.slice();

            hash = JSON.stringify(action.keys);
            tooltip = items.find(val => val.hash === hash);
            if (!tooltip)
                items.push({
                    i: 0,
                    keys: action.keys,
                    hash,
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
        case 'CHANGE_TOOLTIP_DATA':
            
            items = state.items.slice();
            hash = JSON.stringify(action.keys);
            let i = items.findIndex(val => val.hash === hash);
            if (i !== -1) {
                tooltip = Object.assign({}, items[i]);
                tooltip.keys.number = action.number;
                tooltip.hash = JSON.stringify(tooltip.keys);
                tooltip.data = action.data;
                items[i] = tooltip;
            }
            
            return {
                ...state,
                items
            }

        default:
            return state
    }
}

export default tooltips;