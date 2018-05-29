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

const nativeMax = Math.max;
const nativeMin = Math.min;

export const debounce = (func, wait, options) => {
    let lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;
    if (typeof func !== 'function') {
        throw new TypeError('FUNC_ERROR_TEXT');
    }
    wait = Number(wait) || 0;
    if (typeof options === 'object') {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing
            ? nativeMax(Number(options.maxWait) || 0, wait)
            : maxWait;
        trailing = 'trailing' in options
            ? !!options.trailing
            : trailing;
    }

    function invokeFunc(time) {
        let args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading
            ? invokeFunc(time)
            : result;
    }

    function remainingWait(time) {
        let timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;
        console.log('remainingWait');
        return maxing
            ? nativeMin(result, maxWait - timeSinceLastInvoke)
            : result;
    }

    function shouldInvoke(time) {
        let timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the trailing
        // edge, the system time has gone backwards and we're treating it as the
        // trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been debounced at
        // least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
        return timerId === undefined
            ? result
            : trailingEdge(Date.now());
    }

    function debounced() {
        let time = Date.now(),
            isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}

export const throttle = (func, wait, options) => {
    let leading = true,
        trailing = true;

    if (typeof func !== 'function') {
        throw new TypeError('FUNC_ERROR_TEXT');
    }
    if (typeof options === 'object') {
        leading = 'leading' in options
            ? !!options.leading
            : leading;
        trailing = 'trailing' in options
            ? !!options.trailing
            : trailing;
    }
    return debounce(func, wait, {
        leading,
        maxWait: wait,
        trailing,
    });
}

export const childrenToText = (children) => {

    if (!children) return children;

    return children.map(value => {
        if (typeof(value) === 'string') {
            return value;
        } else if (value.type.displayName === 'Connect(LinkToPost)') {
            return value.props.number;
        } else   
            return value;
    })    
}