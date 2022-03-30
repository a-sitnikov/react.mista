//@flow
import fetchJsonp from 'fetch-jsonp'
import * as utils from 'src/utils'

export const domain: string = localStorage.getItem('domain') || 'https://forum.mista.ru';
//export const domain = 'https://dev.mista.ru';
export const urlTopicsList: string = localStorage.getItem('urlTopicsList') || 'api/topic.php';
export const urlTopicInfo: string = localStorage.getItem('urlTopicInfo') || 'ajax_gettopic.php';
export const urlTopicMessages: string = localStorage.getItem('urlTopicMessages') || 'api/message.php';
export const urlLogin: string = localStorage.getItem('urlLogin') || 'users.php?action=do_enter';
export const urlLogout: string = localStorage.getItem('urlLogout') || 'users.php?action=exit';
export const urlCookies: string = localStorage.getItem('urlCookies') || 'ajax_cookie.php';
export const urlSections: string = localStorage.getItem('urlSections') || 'ajax_getsectionslist.php';
export const urlNewMessage: string = localStorage.getItem('urlNewMessage') || 'topic.php?id=:id&page=1';
export const urlNewTopic: string = localStorage.getItem('urlNewTopic') || 'index.php';
export const urlAddBookmark: string = localStorage.getItem('urlAddBookmark') || 'ajax_addbookmark.php';
export const urlSearch: string = localStorage.getItem('urlSearch') || 'ajax_find.php';

// New message
export type RequestNewMessage = {
  message_text: string,
  action: "new",
  topic_id: string,
  rnd: number,
  voting_select?: number,
  as_admin?: boolean
}

export const postNewMessage = async (params: RequestNewMessage): Promise<any> => {

  let url = urlNewMessage.replace(':id', params.topic_id);

  let result = await fetch(`${domain}/${url}`, {
    method: 'POST',
    body: paramsToString('', params),
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow'
  });

  return result;
}


// New topic
export type RequestNewTopic = {
  action: "new",
  rnd: number,
  topic_text: string,
  message_text: string,
  target_section: string,
  target_forum: string,
  voting: number,
  select1?: string,
  select2?: string,
  select3?: string,
  select4?: string,
  select5?: string,
  select6?: string,
  select7?: string,
  select8?: string,
  select9?: string,
  select10?: string
}

export const postNewTopic = async (params: RequestNewTopic): Promise<any> => {

  await fetch(`${domain}/${urlNewTopic}`, {
    method: 'POST',
    body: paramsToString('', params),
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}


//Bookmark
export type RequestBookmark = {
  id: string
}

export const postBookmark = async (params: RequestBookmark) => {

  await fetch(`${domain}/${urlAddBookmark}`, {
    method: 'POST',
    body: paramsToString('', params),
    mode: 'no-cors',
    credentials: 'include',
  });
}

export const postSearch = async (params: RequestSearch) => {

  await fetch(`${domain}/${urlSearch}`, {
    method: 'POST',
    body: paramsToString('', params),
    mode: 'no-cors',
    credentials: 'include',
  });
}

export const paramsToString = (paramsPrefix: string, params: ?{}): string => {

  if (!params)
    return '';

  let arr = [];
  for (let key in params) {
    if (params[key] !== undefined)
      arr.push(key + '=' + params[key]);
  }

  if (arr.length > 0)
    return paramsPrefix + arr.join('&');
  else
    return '';
}

export const fetchJsonpAndGetJson = async (url: string, params: any): Promise<any> => {

  let fullUrl = `${domain}/${url}${paramsToString('?', params)}`;
  const response = await fetchJsonp(fullUrl);
  let responseJson = await response.json();
  let json;
  if (typeof (responseJson) === 'string') {

    try {
      json = JSON.parse(responseJson)
    } catch (e) {
      json = utils.parseJSON(responseJson);
    }
  } else {
    json = responseJson;
  }
  return json;
}

export const fetchAndGetJson = async (url: string, params: any, options: any): Promise<any> => {

  let fullUrl = `${domain}/${url}${paramsToString('?', params)}`;
  const response = await fetch(fullUrl, options);
  let responseJson = await response.json();
  let json;
  if (typeof (responseJson) === 'string') {

    try {
      json = JSON.parse(responseJson)
    } catch (e) {
      json = utils.parseJSON(responseJson);
    }
  } else {
    json = responseJson;
  }
  return json;
}