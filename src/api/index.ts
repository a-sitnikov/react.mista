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

export * from './cookies'
export * from './login'
export * from './new_message'
export * from './newtopic'
export * from './sections'
export * from './topic_info'
export * from './topic_messages'
export * from './topics_list'
