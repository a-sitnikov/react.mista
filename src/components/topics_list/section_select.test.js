import React from 'react'
import renderer from 'react-test-renderer';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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

const mockPromise = (data) => {
    return new Promise(resolve => resolve(data), err => null)
}

describe('SectionSelect', ()=>{

    let store, wrapper;
    store = createStore(rootReducer, applyMiddleware(thunk));

    beforeEach(()=>{
    })
    
    it('+++ render the connected() component', () => {
        const props = {
            defaultValue: 'Секция',
            selected: '',
            id: 's1',
            bsSize: 'sm'
        }

        const component = renderer.create(
            <Provider store={store} >
                <ConnectedSectionSelect {...props} />
            </Provider>
        )

        getSectionsMock.then(()=>{ 
            const tree = component.toJSON();
            expect(tree).toMatchSnapshot()
        });

    });

})    