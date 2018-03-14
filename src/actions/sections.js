
export const requestSections = () => ({
    type: 'REQUEST_SECTIONS'
})

export const receiveSections = (json) => ({
    type: 'RECEIVE_SECTIONS',
    items: json,
    receivedAt: Date.now()
})

export const fetchSections = () => dispatch => {

    dispatch(requestSections());

    let sections = [
        {
            name: '1C',
            items: [
                { name: '1С 7.7 и ранее', value: 3 },
                { name: '1С 8', value: 8 }
            ]
        },
        {
            name: 'IT',
            items: [
                { name: 'Админ', value: 15 },
                { name: 'Мобильный мир', value: 24 },
                { name: 'IT-новости', value: 1 },
                { name: 'Математика и алгоритмы', value: 10 },
                { name: 'Unix / Linux', value: 19 },
                { name: 'Веб-мастеринг', value: 4 },
                { name: 'Убийцы 1С', value: 45 }
            ]
        },
        {
            name: 'LIFE',
            items: [
                { name: 'Политика', value: 13 },
                { name: 'Как страшно жить', value: 23 }
            ]
        }
    ];
    
    dispatch(receiveSections(sections));
}
