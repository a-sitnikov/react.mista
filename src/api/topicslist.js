import { fetchAndGetJson, urlTopicsList } from '.'

// Topics list
export type RequestTopicsList = {
  topics?: number, // число тем, которые нужно вернуть (по умолчанию - 20);
  utime?: number, // время (в формате unixtime) после которого надо вернуть ветки;
  callback?: string, // если указано, то ответ заворачивается в вызов функции, имя которой передано в параметре (реализация JSONP)
  forum?: string, // раздел форума (1c|it|life);
  section_short_name?: string,
  user_id?: string,
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

export const fetchTopicsList = async (params: RequestTopicsList): Promise<ResponseTopicsList> => {
  const json = await fetchAndGetJson(urlTopicsList, params);
  return json;
}