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

export const paramsToString = (paramsPrefix: string, params?: {}): string => {

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

export const fetchJsonpAndGetJson = async (url: string, params?: {}): Promise<any> => {

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

export const fetchAndGetJson = async (url: string, params?: {}, options?: {}): Promise<any> => {

  let fullUrl = `${domain}/${url}${paramsToString('?', params)}`;
  const response = await fetch(fullUrl, options);
  return await response.json();
  
}