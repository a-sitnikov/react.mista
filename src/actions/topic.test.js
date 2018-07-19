import { fetchTopic } from './topic'
import * as API from '../api'

const item0 = {
    id: "0", n: "0", text: "Пост 0"
}

describe('Topic.Actions', ()=>{

    beforeEach(() => {

        API.getTopicInfo = jest.fn(params => {
            return {
                id: "1",
                text: "Тестовая ветка",
                answers_count: "50"
            }
        })

        API.getTopicMessages = jest.fn(params => {

            return [
                {
                    id: "1",
                    n: params.from,
                    text: "Пост " + params.from
                },
                {
                    id: "1",
                    n: +params.from + 1,
                    text: "Пост " + (+params.from + 1)
                },
            ]
        })

        Date.now = jest.fn(() => 1);
    })

    it('+++ page 1, no item 0', async () => {

        const dispatch = jest.fn();
        await fetchTopic({
            id: "1",
            page: "1"
        }, null)(dispatch);
        
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0]).toMatchSnapshot();

    })
    
    it('+++ page 1, has item 0', async () => {
        
        const dispatch = jest.fn();
        await fetchTopic({
            id: "1",
            page: "1"
        }, item0)(dispatch)
        
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0]).toMatchSnapshot();
    })

    it('+++ page 2, no item 0', async () => {
        const dispatch = jest.fn();
        await fetchTopic({
            id: "1",
            page: "2"
        }, null)(dispatch)
        
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0]).toMatchSnapshot();
    });
    
    it('+++ page 2, has item 0', async () => {
        const dispatch = jest.fn();
        await fetchTopic({
            id: "1",
            page: "2"
        }, item0)(dispatch)
        
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0]).toMatchSnapshot();

    });
    
    it('+++ page last20, no item 0', async () => {
        const dispatch = jest.fn();
        await fetchTopic({
            id: "1",
            page: "last20"
        }, null)(dispatch)
        
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0]).toMatchSnapshot();

    });
    
    it('+++ page last20, less than 20 answers, no item 0', async () => {
        API.getTopicInfo = jest.fn(params => {
            return {
                id: "1",
                text: "Тестовая ветка",
                answers_count: "18"
            }
        })
        
        const dispatch = jest.fn();
        await fetchTopic({
            id: "1",
            page: "last20"
        }, null)(dispatch)
        
        expect(dispatch.mock.calls.length).toBe(2);
        expect(dispatch.mock.calls[1][0]).toMatchSnapshot();
    });
})