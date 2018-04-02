//@flow
import fetchJsonp from 'fetch-jsonp'

export const domain = 'https://www.forum.mista.ru';
export const urlTopicsList    = 'api/topic.php';
export const urlTopicInfo     = 'ajax_gettopic.php';
export const urlTopicMessages = 'api/message.php';
export const urlLogin         = 'ajax_login.php';
export const urlCookies       = 'ajax_cookie.php';
export const urlSections      = 'ajax_getsectionslist.php';
export const urlNewMessage    = 'ajax_newmessage.php';
export const urlAddBookmark   = 'ajax_addbookmark.php';

// Topics list
export type RequestTopicsList = {
    topics?:   number, // число тем, которые нужно вернуть (по умолчанию - 20);
    utime?:    number, // время (в формате unixtime) после которого надо вернуть ветки;
    callback?: string, // если указано, то ответ заворачивается в вызов функции, имя которой передано в параметре (реализация JSONP)
    forum?:    string, // раздел форума (1c|it|life);
    section_short_name?: string,
    user_id?:  string,
    mytopics?: string
}

export type ResponseTopicsListItem = {
    id: number,
    closed: number,
    down: number,
    sect1: string,
    sect2: string,
    v8: string,
    text: string,
    answ: number,
    user0: string
}

export type ResponseTopicsList = Array<ResponseTopicsListItem>;

export const getTopicsList = async (params: RequestTopicsList): Promise<ResponseTopicsList> =>  {
    const json = await fetchJsonpAndGetJson(urlTopicsList, params);
    return json;
} 


// Topics info
export type RequestInfo = {
    id: string // идентификатор (topic_id) темы
}

export type VoteItem = {
    select: string,
    result: number
}

export type ResponseInfo = {
    id?: string,
    text?: string,
    forum?: string,
    section?: string,
    created?: string,
    user_id?: string,
    user_name?: string,
    answers_count: string,
    down?: number,
    closed?: number,
    deleted?: number,
    is_voting?: number,
    voting?: Array<VoteItem>
}

export const getTopicInfo = async (params: RequestInfo): Promise<ResponseInfo> =>  {
    const json = await fetchJsonpAndGetJson(urlTopicInfo, params);
    return json;
} 


// Topic messages
export type RequestMessages = {
    id:    string, // идентификатор (topic_id) темы
    from?: number, // с какого сообщения. если не указан, то с первого
    to?:   number  // до какого сообщения. если не указан, то from+10
}

export type ResponseMessage = {
    id:    string,
    n:     string,
    user:  string,
    text:  string,
    utime: string,
    vote:  number
}

export type ResponseMessages = Array<ResponseMessage>;

export const getTopicMessages = async (params: RequestMessages): Promise<ResponseMessages> =>  {
    const json = await fetchJsonpAndGetJson(urlTopicMessages, params);
    return json;
} 


// Login
export type RequestLogin = {
    username:  string, // логин (ник) пользователя
    password:  string, // пароль пользователя
    callback?: string, // если указано, то ответ заворачивается в вызов функции, имя которой передано в параметре (реализация JSONP)
}

export type ResponseLogin = {
    userid: string,
    username: string,
    hashkey: string,
    error: string
}

export const getLogin = async (params: RequestLogin): Promise<ResponseLogin> =>  {
    const json = await fetchJsonpAndGetJson(urlLogin, params);
    return json;
} 


// Cookies
export type ResponseCookies = {
    cookie: {
        entr_id: string,
        entr_key: string,
        entr_hash: string
    },
    session: {
        user_id: string,
        user_name: string,
        user_hash: string,
        is_moderator: number,
        light_moderator: number,
        section: string,
        show_moderator_tools: number
    }    
}

export const getCookies = async (): Promise<ResponseCookies> =>  {
    const json = await fetchJsonpAndGetJson(urlCookies);
    return json;
} 


// Sections
export type ResponseSection = {
    id: number,
    forum: string,
    shortn: string,
    fulln: string
}

export type ResponseSections = Array<ResponseSection>;

export const getSections = async (): Promise<ResponseSections> =>  {
    const json = await fetchJsonpAndGetJson(urlSections);
    return json;
} 


// New message
export type RequestNewMessage = {
    message_text: string,
    action:       "new", 
    topic_id:     string,
    user_name:    string,
    rnd:          number    
}

export const postNewMessage = async (params: RequestNewMessage): Promise<any> =>  {
    await fetch(urlNewMessage, {
        method: 'POST',
        body: paramsToString('', params),
        mode: 'no-cors',
        credentials: 'include',
    });
} 


const paramsToString = (first: string, params: ?{}): string => {

    if (!params)
        return '';

    let arr = [];
    for (let key in params) {
        arr.push(key + '=' + params[key]);
    }

    if (arr.length > 0)
        return first + arr.join('&');
    else    
        return '';
}

export const fetchJsonpAndGetJson = async (url: string, params: any): Promise<any> => {

    let fullUrl = `${domain}/${url}${paramsToString('?', params)}`; 
    const response =  await fetchJsonp(fullUrl);
    const responseJson = await response.json();
    const json = typeof(responseJson) === 'string' ? JSON.parse(responseJson) : responseJson;
    return json;
}

export const fetchJsonpArrayAndGetJson = async (arr: Array<{ url: string, params: any }>): Promise<Array<any>> => {

    const responseArr = await Promise.all(
        arr
            .map(item => `${domain}/${item.url}${paramsToString('?', item.params)}`)
            .map(url => fetchJsonp(url))
    );

    const responseJsonArr = await Promise.all(
        responseArr
            .map(response => response.json)
    );    

    return responseJsonArr.map(responseJson => typeof(responseJson) === 'string' ? JSON.parse(responseJson) : responseJson);
}