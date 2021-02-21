
export type Column = {
    name: string,
    className?: string,
    width?: string
}

export type OptionsItems = {
    theme: 'yellow' | 'lightgray' | 'dark',
    topicsPerPage: string,
    autoRefreshTopicsList: string,
    autoRefreshTopicsListInterval: string,
    autoRefreshTopic: string,
    autoRefreshTopicInterval: string,
    contetnMaxWidth: string
}

export type OptionsState = {
    show: boolean,
    voteColors: Array<string>,
    listColumns: Array<Column>,
    showTitle: boolean,
    items: OptionsItems    
};

function readOption(name, defaultValue) {
    return window.localStorage.getItem(name) || defaultValue;
}

export const defaultOptionsState = {
    voteColors: [
        "#FF1616", //1
        "#1A861A", //2
        "#0023FF", //3
        "#FF6B18", //4
        "#9B3A6E", //5
        "#567655", //6
        "#233345", //7
        "#CC0000", //8
        "#00CCCC", //9
        "#0000CC", //10
    ],
    items: {
        theme: 'lightgray',
        topicsPerPage: '20',
        autoRefreshTopicsList: 'false',
        autoRefreshTopicsListInterval: '60',
        autoRefreshTopic: 'true',
        autoRefreshTopicInterval: '60',
        //tooltips
        showTooltips: 'true',
        tooltipDelay: '500',
        showTooltipOnTopicsList: 'true',
        showTooltipOnPostLink: 'true',
        //links
        showYoutubeVideoTitle: 'true',
        replaceCatalogMista: 'true',
        fixBrokenLinks: 'true',
    }    
}

const options = (state: OptionsState = defaultOptionsState, action: any) => {

    switch (action.type) {

        case 'READ_OPTIONS': 
            
            let items = Object.assign({}, defaultOptionsState.items);
            for (let key in items) {
                items[key] = readOption(key, defaultOptionsState.items[key]);
            }

            return {
                ...state,
                items
            }

        case 'SAVE_OPTIONS': 

            for (let key in action.options) {
                window.localStorage.setItem(key, String(action.options[key]));
            }

            return {
                ...state,
                items: action.options
            }
        default:
            return state
    }
}

export default options;