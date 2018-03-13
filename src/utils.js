export function utimeToDate(utime) {
    let a = new Date(utime*1000);
    let year  = a.getFullYear();
    let month = '0' + (a.getMonth() + 1);
    month = month.substr(-2);
    
    let date  = '0' + a.getDate();
    date = date.substr(-2);

    let hours = a.getHours();
    let minutes = "0" + a.getMinutes();

    return '' + date + '.' + month + '.' + year + ' - ' + hours + ':' + minutes.substr(-2);
}