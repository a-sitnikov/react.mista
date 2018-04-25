
export type ParamDescr =  {
    title: string,
    postfix?: string,
    group: string
}

export type BoolParam = {
    value: boolean,
} & ParamDescr;

export type NumberParam = {
    value: number,
} & ParamDescr;

export type Column = {
    name: string,
    className?: string,
    width?: string
}

export type OptionsState = {
    voteColors: Array<string>,
    listColumns: Array<Column>,
    showTitle: BoolParam
};

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
    listColumns: [
        { name: 'Раздел', className: 'cc', width: '50px' },
        { name: 'Re', className: 'cc', width: '30px' },
        { name: 'Тема', className: 'ct' },
        { name: 'Автор', className: 'cl', width: '120px' },
        { name: 'Обновлено', className: 'cl', width: '150px' }
    ],    
    showTitle: {value: false, title: 'Показывать заголовок', group: 'Общее'},
}

const options = (state: OptionsState = defaultOptionsState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}

export default options;