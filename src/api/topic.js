import { domain, urlTopicInfo, urlTopicMessages, fetchAndGetJson, fetchJsonpAndGetJson } from '.'

// Topics info
export type RequestInfo = {
  id: string // идентификатор (topic_id) темы
}

export type ResponseVoteItem = {
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
  voting?: Array<ResponseVoteItem>
}

export const getTopicInfo = async (params: RequestInfo): Promise<ResponseInfo> => {
  const json = await fetchAndGetJson(urlTopicInfo, params);
  return json;
}


// Topic messages
export type RequestMessages = {
  id: number | string, // идентификатор (topic_id) темы
  from?: number, // с какого сообщения. если не указан, то с первого
  to?: number  // до какого сообщения. если не указан, то from+10
}

export type ResponseMessage = {
  id: string,
  n: string,
  user: string,
  userId: string,
  text: string,
  utime: string,
  vote: number
}

export type ResponseMessages = Array<ResponseMessage>;

export const getTopicMessages = async (params: RequestMessages): Promise<ResponseMessages> => {
  const json = await fetchAndGetJson(urlTopicMessages, params);
  return json;
}

export const getMessage = async (id: number | string, n: number): Promise<?ResponseMessage> => {
  
  let from = n;
  let to = +n;
  if (n === 0) //does't work from=0&to=0
    to++;

  const json = await getTopicMessages({
    id,
    from,
    to
  }
  );

  let data;
  if (json && json.length > 0)
    data = json.find(val => val.n === String(n));

  return data;
}

export const getTopicMessagesCount = async (id: number | string): Promise<number> => {
  const info = await getTopicInfo({ id: String(id) });
  return +info.answers_count;
}