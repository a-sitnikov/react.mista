//@flow 
import type { ResponseSections } from 'src/api'
import type { SectionsAction } from 'src/actions/sections'

import { groupBy } from 'src/utils'

export type SectionsState = {
  isFetching: boolean;
  items: ResponseSections,
  tree: {[string]: any},
  map: {[string]: any},
  lastUpdated?: Date,
  error?: ?string
};

export const defaultSectionsState = {
    isFetching: false,
    items: [],
    tree: {},
    map: {}
}

const sections = (state: SectionsState = defaultSectionsState, action: SectionsAction) => {
    switch (action.type) {
        case 'REQUEST_SECTIONS':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_SECTIONS':

            let map = {};
            action.items.forEach(val => {
                map[val.shortn] = val.fulln
            });

            return {
                ...state,
                isFetching: false,
                items: action.items,
                tree: groupBy(action.items, 'forum'),
                map,
                lastUpdated: action.receivedAt
            }
        default:
            return state
    }
}

export default sections;