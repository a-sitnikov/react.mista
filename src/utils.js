export function utimeToDate(utime) {
    let a = new Date(utime * 1000);
    return dateTimeStr(a);
}

export function dateTimeStr(a) {

    let year = String(a.getFullYear()).substr(-2);
    let month = '0' + (a.getMonth() + 1);
    month = month.substr(-2);

    let date = '0' + a.getDate();
    date = date.substr(-2);

    let hours = "0" + a.getHours();
    let minutes = "0" + a.getMinutes();

    return '' + date + '.' + month + '.' + year + ' - ' + hours.substr(-2) + ':' + minutes.substr(-2);
}

export function timeStr(time) {

    let hours = time.getHours();
    let minutes = "0" + time.getMinutes();

    return '' + hours + ':' + minutes.substr(-2);
}

export function today(td) {
    var d = new Date();
    return td.getDate() === d.getDate() && td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
}

export const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const parseJSON = (text) => {
    try {
        text = text
            .replace(/\\</g, '<')
            .replace(/\\>/g, '>')
            .replace(/\\&/g, '&')
            .replace(/\\'/g, "'")
            .replace(/\\"/g, "")

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