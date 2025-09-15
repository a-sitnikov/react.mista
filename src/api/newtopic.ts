import { paramsToString } from "./api-utils";
import { domainApi, urlNewTopic } from ".";

export interface INewTopicRequest {
  action: "new";
  rnd: number;
  topic_text: string;
  message_text: string;
  target_section: string;
  target_forum: string;
  voting: number;
  select1?: string;
  select2?: string;
  select3?: string;
  select4?: string;
  select5?: string;
  select6?: string;
  select7?: string;
  select8?: string;
  select9?: string;
  select10?: string;
}

export const fetchNewTopic = async (params: INewTopicRequest): Promise<any> => {
  await fetch(`${domainApi}/${urlNewTopic}`, {
    method: "POST",
    body: paramsToString("", params),
    mode: "no-cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
