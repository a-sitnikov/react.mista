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
export const urlNewTopic      = 'index.php';
export const urlAddBookmark   = 'ajax_addbookmark.php';
export const urlSearch        = 'ajax_find.php';

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
    forum: string,
    sect1: string,
    sect2: string,
    v8: string,
    closed: number,
    down: number,
    text: string,
    utime: number,
    created: number,
    user: string,
    user0: string,
    is_voting: number,
    answ: number
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
    id: string,
    text: string,
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

export const defaultInfo = {
    id: "",
    text: "",
    answers_count: ""
}

export const getTopicInfo = async (params: RequestInfo): Promise<ResponseInfo> =>  {
    const json = await fetchJsonpAndGetJson(urlTopicInfo, params);
    return json;
} 


// Topic messages
export type RequestMessages = {
    id:    number | string, // идентификатор (topic_id) темы
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
    fulln: string,
    id: number
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
    rnd:          number,
    voting_select?: number,
    as_admin?: boolean    
}

export const postNewMessage = async (params: RequestNewMessage): Promise<any> =>  {
    await fetch(urlNewMessage, {
        method: 'POST',
        body: paramsToString('', params),
        mode: 'no-cors',
        credentials: 'include',
    });
} 


// New topic
export type RequestNewTopic = {
    action:         "new", 
    rnd:            number,
    topic_text:     string,
    message_text:   string,
    target_section: string, 
    target_forum:   string,
    voting:         number,
    select1?:       string,    
    select2?:       string,    
    select3?:       string,    
    select4?:       string,    
    select5?:       string,    
    select6?:       string,    
    select7?:       string,    
    select8?:       string,    
    select9?:       string,    
    select10?:      string
}

export const postNewTopic = async (params: RequestNewTopic): Promise<any> =>  {
    await fetch(urlNewTopic, {
        method: 'POST',
        body: paramsToString('', params),
        mode: 'no-cors',
        credentials: 'include',
    });
} 


//Bookmark
export type RequestBookmark = {
    id: string
}

export const postBookmark = async (params: RequestBookmark) => {

    await fetch(urlAddBookmark, {
        method: 'POST',
        body: paramsToString('', params),
        mode: 'no-cors',
        credentials: 'include',
    });
}


//Search
export type RequestSearch = {
    keywords: string
}

export type ResponseSearch = {

}

export const postSearch = async (params: RequestSearch) => {

    await fetch(`${domain}/${urlSearch}`, {
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
