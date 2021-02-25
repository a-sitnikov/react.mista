/**
 * @jest-environment jsdom
*/

import React from 'react'
import renderer from 'react-test-renderer';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { configure , mount, shallow } from 'enzyme'

import * as API from '../../api'
import ConnectedSectionSelect, {SectionSelect} from './section_select'
import rootReducer from '../../reducers'

const data = [
    {
        "forum": "1C",
        "shortn": "v7",
        "fulln": "1С:Предприятие 7.7 и ранее",
        "id": 3
    },
    {
        "forum": "1C",
        "shortn": "v8",
        "fulln": "1С:Предприятие 8 общая",
        "id": 8
    }
];
const getSectionsMock = Promise.resolve(data);
API.getSections = jest.fn(() => getSectionsMock);

describe('SectionSelect', ()=>{

    let store, wrapper;
    store = createStore(rootReducer, applyMiddleware(thunk));
    
    it('+++ render the connected() component', async () => {
        const props = {
            defaultValue: 'Секция',
            selected: '',
            id: 's1',
            size: 'sm'
        }

        const component = mount(
            <Provider store={store} >
                <ConnectedSectionSelect {...props} />
            </Provider>
        )

        getSectionsMock.then(() => {
        component.update();
        console.log(component.html());
    });

    });

})    