
export function today(td) {
    var d = new Date();
    return td.getDate() === d.getDate() && td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
}

export const groupBy = (list, getKey) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {})


export const parseJSON = (text) => {

    try {
        return JSON.parse(text);    
    } catch(e) {

    }

    try {
        text = text
            .replace(/\\</g, '<')
            .replace(/\\>/g, '>')
            .replace(/\\&/g, '&')
            .replace(/\\'/g, "'")
            .replace(/\\"/g, "")
            .replace(/ "/g, ' \\"')
            .replace(/""/g, '\\""')
            .replace(/\t/g, '\\t')
            .replace(/"(\.| |\?)/g, '\\"$1')

        //           console.log(text);
        return JSON.parse(text);

        //return eval(text);
    } catch (e) {
        console.error(e.message);
        console.log(text);

        return {};
    }
}

export const getMaxPage = (answ) => Math.min(Math.ceil(answ / 100), 10) || 1;

export const encodeText = (text) => {
    text = text
        .replace(/&/g, '%26')
        .replace(/\+/g, '%2B')

    return text;
}

export const compare = (obj1, obj2) => {

    for (let key in obj2) {
        if (obj1[key] !== obj2[key])
            return false
    }

    return true;
}

export const join = (obj, str) => {

    let res = [];
    for (let key in obj) {
        res.push('' + key + ':' + obj[key]);
    }

    return res.join(str);
}

export const childrenToText = (children) => {

    if (!children) return children;

    return children.map(value => {
        if (typeof(value) === 'string') {
            return value;
        } else if (value.type === 'br') {
            return '<br>'
        } else if (value.type.displayName === 'Connect(LinkToPost)' || value.type.displayName === 'Connect(t)') {
            return value.props.number;
        } else {  
            console.log(value);
            return value;
        }    
    })    
}