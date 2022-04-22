import { fetchAndGetJson, urlTopicInfo } from '.'
import type { ITopicInfo } from 'src/data/topic'

interface IAPIResponse {
  id: string,
  text: string,
  forum: string,
  section: string,
  created: string,
  user_id: string,
  user_name: string,
  updated: string,
  updated_name: string,
  answers_count: string,
  down: number,
  closed: number,
  deleted: number,
  is_voting: number,
  voting: {
    select: string,
    result: number
  }[]
}

function convertResponse(response: IAPIResponse): ITopicInfo {

  let voting = [];
  if (response.voting)
    voting = response.voting.map(x => ({
      text: x.select,
      count: x.result
    }));
    
  return ({
    id: parseInt(response.id),
    title: response.text,
    forum: response.forum,
    sectionId: response.section,
    created: parseInt(response.created) * 1000,
    authorId: response.user_id,
    author: response.user_name,
    updated: parseInt(response.updated) * 1000,
    lastUser: response.updated_name,
    count: parseInt(response.answers_count),
    down: response.down,
    closed: response.closed,
    deleted: response.deleted,
    isVoting: response.is_voting,
    voting
  })

}

async function fetchTopicInfo(id: number): Promise<ITopicInfo> {

  const info = await fetchAndGetJson(urlTopicInfo, { id });
  return convertResponse(info);

}

export { fetchTopicInfo }