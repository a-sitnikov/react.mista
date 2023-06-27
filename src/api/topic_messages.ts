
import { urlTopicMessages } from '.'
import { fetchAndGetJson } from './api-utils'
import type { ITopicMessage, ITopicMessagesList } from 'src/store'

interface IAPIRequest {
  id: number,
  from?: number,
  to?: number
}

export interface ITopicMessageRequest extends IAPIRequest {}

interface IAPIResponse {
  id: string,
  n: string,
  user: string,
  userId: string,
  text: string,
  utime: string,
  vote: number
}  

function convertResponse(response: IAPIResponse): ITopicMessage {

  return ({
    id: parseInt(response.id),
    n: parseInt(response.n),
    user: response.user,
    userId: parseInt(response.userId),
    text: response.text,
    time: parseInt(response.utime) * 1000,
    vote: response.vote
  })

}

async function fetchTopicMessages(params?: ITopicMessageRequest): Promise<ITopicMessagesList> {

  const list = await fetchAndGetJson(urlTopicMessages, params);
  return list.map(convertResponse);

}

async function fetchTopicMessage(id: number, n: number): Promise<ITopicMessage> {

  const to = (n === 0) ? n+1 : n;

  const list = await fetchAndGetJson(urlTopicMessages, {id, from: n, to});
  return list.map(convertResponse).find((item: ITopicMessage) => item.n === n);

}

export { fetchTopicMessages, fetchTopicMessage }