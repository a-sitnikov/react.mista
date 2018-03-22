export function utimeToDate(utime) {
    let a = new Date(utime*1000);
    return dateTimeStr(a);
}

export function dateTimeStr(a) {
    
    let year  = String(a.getFullYear()).substr(-2);
    let month = '0' + (a.getMonth() + 1);
    month = month.substr(-2);
    
    let date  = '0' + a.getDate();
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

export const groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
