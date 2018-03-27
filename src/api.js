
const domain = 'https://www.forum.mista.ru';

const api = {

    /*
    username - логин (ник) пользователя (!);
    password - пароль пользователя (!);
    */
    login: `${domain}/ajax_login.php`, 

    /*
    topics - число тем, которые нужно вернуть (по умолчанию - 20);
    utime - время (в формате unixtime) после которого надо вернуть ветки;
    callback - если указано, то ответ заворачивается в вызов функции, имя которой передано в параметре (реализация JSONP);
    forum - раздел форума (1c|it|life);
    section_short_name=politic - отбор по краткому имени секции
    mytopics=1 - отбор только своих тем
    user_id - отбор тем пользователя
    */
    topicsList: `${domain}/api/topic.php`,

    /*
    id - идентификатор (topic_id) темы (!)
    */
    topicInfo: `${domain}/ajax_gettopic.php`,

    /*
    id - идентификатор (topic_id) темы (!)
    from - с какого сообщения. если не указан, то с первого
    to - до какого сообщения. если не указан, то from+10
    */    
    topicMessages: `${domain}/api/message.php`,

    /*
    POST
    {
        topic_id - идентификатор (topic_id) темы (!)   
    }
    */
    addBookmark: `${domain}/ajax_addbookmark.php`,

    sections: `${domain}/ajax_getsectionslist.php`,

    /*
    POST
    {
        topic_id - идентификатор (topic_id) темы (!)   
    }
    */
    newTopic: `index.php`,

    newMessage: `${domain}/ajax_newmessage.php`
}

export default api;