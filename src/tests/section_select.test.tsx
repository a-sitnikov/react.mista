import { screen, waitFor } from "@testing-library/react"
import { renderWithProviders } from './test-utils'

import * as API from 'src/api/sections'
import SectionSelect from 'src/pages/topics_list/sections'
import type { IProps } from 'src/pages/topics_list/sections'
import { ISectionItem } from 'src/store';

const data: ISectionItem[] = [
    {
        "forum": "1C",
        "code": "v7",
        "name": "1С:Предприятие 7.7 и ранее",
        "id": 3
    },
    {
        "forum": "1C",
        "code": "v8",
        "name": "1С:Предприятие 8 общая",
        "id": 8
    }
];

describe('SectionSelect', ()=>{

    it('render', async () => {
        const props: IProps = {
            defaultValue: 'Секция',
            selected: '',
            id: 's1',
            size: 'sm'
        }
        
        jest.spyOn(API, "fetchSections").mockImplementation(async () => Promise.resolve(data))

        renderWithProviders(
            <SectionSelect {...props} />
        );
        await waitFor(() => expect(API.fetchSections).toHaveBeenCalledTimes(1));
        
        const options = screen.getAllByRole('option');
        expect(options.length).toBe(3);
        expect(options[0].textContent).toBe('Секция');
        expect(options[1].textContent).toBe(data[0].name);
        expect(options[2].textContent).toBe(data[1].name);

    });

})    