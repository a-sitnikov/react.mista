import React from 'react'
import renderer from 'react-test-renderer';

import { InputGroup } from 'react-bootstrap'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { configure , mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import * as API from '../../api'
import CustomLink from './custom_link'
import LinkToPost from './link_to_post'
import YoutubeLink from './youtube_link'
import rootReducer from '../../reducers'

describe('CustomLink', ()=>{

    let wrapper, store;
    
    beforeAll(()=>{
            let initialState = {
                options: {
                    items: {
                        showTooltipOnPostLink: 'true',
                        showYoutubeVideoTitle: 'true',
                        replaceCatalogMista: 'true',
                        fixBrokenLinks: 'true'                
                    }
                }
            }
        store = createStore(rootReducer, initialState, applyMiddleware(thunk));
    })
    
    it('+++ render link to post', () => {

        const href = 'https://www.forum.mista.ru/topic.php?id=822078#10';

        wrapper = shallow(
            <CustomLink store={store} href={href}/>
        )
        
        const component = wrapper.dive().find(LinkToPost);

        expect(component.length).toBe(1);
        expect(component.prop('topicId')).toBe('822078');
        expect(component.prop('number')).toBe('10');

    });

    it('+++ render link to post href=react.mista', () => {

        const href = 'https://a-sitnikov.github.io/react.mista/#/topic.php?id=822078#10';

        wrapper = shallow(
            <CustomLink store={store} href={href}/>
        )
        
        const component = wrapper.dive().find(LinkToPost);

        expect(component.length).toBe(1);
        expect(component.prop('topicId')).toBe('822078');
        expect(component.prop('number')).toBe('10');

    });

    it('+++ render link to youtube', () => {

        const href = 'https://www.youtube.com/watch?v=mIkEKO-B_OU';

        wrapper = shallow(
            <CustomLink store={store} href={href}/>
        )
        
        const component = wrapper.dive().find(YoutubeLink);
        expect(component.length).toBe(1);

    });

    it('+++ render link to catalog.mista', () => {

        const href = 'http://catalog.mista.ru/public/590993/';

        wrapper = shallow(
            <CustomLink store={store} href={href}>
                link title
            </CustomLink>
        )
        
        const component = wrapper.dive();
        expect(component.prop('href')).toBe('http://infostart.ru/public/590993/');

    });    

    it('+++ render fix broken link', () => {

        const href = 'https://wikipadia.ru/имя_(значение';

        wrapper = shallow(
            <CustomLink store={store} href={href} 
            parentText='<a href="https://wikipadia.ru/имя_(значение">https://wikipadia.ru/имя_(значение</a>)'
            />
        )
        
        const component = wrapper.dive();
        expect(component.prop('href')).toBe('https://wikipadia.ru/имя_(значение)');

    });  
})    