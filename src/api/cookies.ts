import { fetchJsonpAndGetJson, urlCookies } from '.'
import { ILogin } from 'src/data/login';

export type IAPIResponse = {
  cookie: {
    entr_id: string,
    entr_key: string,
    entr_hash: string,
    musthave: string,
    hotlog: string
  },
  session: {
    entered: number,
    user_id: string,
    user_name: string,
    user_hash: string,
    is_moderator: number,
    light_moderator: number,
    section: string,
    show_moderator_tools: number,
    kb: string,
    registered_unixtime: string,
    guid: string,
    last_error?: string,
    user: {
      id: string,
      name: string,
      is_moderator: boolean,
      light_moderator: boolean,
      kb: boolean,
      section_owner: boolean,
      section: string,
      registered_unixtime: string,
      balance: number
    }
  }
}

function convertResponse(response: IAPIResponse): ILogin {

  const { session } = response;

  return ({
    userId: Number(session?.user_id),
    userName: session?.user_name,
    userHash: session?.user_hash,
    lastError: session?.last_error
  })

}

async function fetchCookies(): Promise<ILogin| undefined>  {

  const response = await fetchJsonpAndGetJson(urlCookies);
  return convertResponse(response);

}

export { fetchCookies }