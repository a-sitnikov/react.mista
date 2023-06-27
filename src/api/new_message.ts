import { domain, urlNewMessage } from ".";
import { paramsToString } from './api-utils';

// New message
export interface INewMessageRequest {
  message_text: string,
  action: "new",
  topic_id: string,
  rnd: number,
  voting_select?: number,
  as_admin?: boolean
}

export const fetchNewMessage = async (params: INewMessageRequest): Promise<any> => {
  
  const url = urlNewMessage.replace(':id', params.topic_id);

  const options: RequestInit = {
    method: 'POST',
    body: paramsToString('', params),
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml',
      'Content-Type': 'application/x-www-form-urlencoded'  
    },
    redirect: 'follow'
  }

  const result = await fetch(`${domain}/${url}`, options);
  return result;
}