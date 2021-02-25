import React from 'react'

import { InputGroup } from 'react-bootstrap'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { configure , mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import * as API from '../../api'
import ConnectedNewTopic from './new_topic'
import ConnectedTextEditor from '../common/text_editor'
import rootReducer from '../../reducers'

describe('NewTopic', ()=>{

    let wrapper;

    let initialState = {
        sections: {
            items: [],
            tree: {'1C': []}
        },
        newTopic: {
            isVoting: true,
            error: ''
        }
    }

    beforeAll(()=>{
        //let store = configureStore(initialState);
        let store = createStore(rootReducer, initialState, applyMiddleware(thunk));
        wrapper = shallow(
            <ConnectedNewTopic store={store}/>
        )
    })
    
    it('+++ render TextEditor', () => {
        const component = wrapper.dive().dive().find(ConnectedTextEditor);
        expect(component.length).toBe(1);
        expect(component.prop('isVoting')).toBe(true);
    });

    it('+++ render 10 voting options', () => {
        const component = wrapper.dive().dive().find(InputGroup);
        expect(component.length).toBe(10);
    });

})    