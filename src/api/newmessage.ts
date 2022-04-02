import { domain, paramsToString, urlNewMessage } from ".";

// New message
export interface IRequest {
  message_text: string,
  action: "new",
  topic_id: string,
  rnd: number,
  voting_select?: number,
  as_admin?: boolean
}

export const fetchNewMessage = async (params: IRequest): Promise<any> => {

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