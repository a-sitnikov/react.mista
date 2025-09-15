import fetchJsonp from "fetch-jsonp";
import * as utils from "src/utils";
import { domainApi } from ".";

export const paramsToString = (paramsPrefix: string, params?: {}): string => {
  if (!params) return "";

  let searchParams = new URLSearchParams();
  for (let key in params) {
    const value = params[key];
    if (value !== undefined) searchParams.append(key, value);
  }

  let str = searchParams.toString();
  if (str.length > 0) return paramsPrefix + str;
  else return "";
};

export const fetchJsonpAndGetJson = async (
  url: string,
  params?: {},
  _options?: {}
): Promise<any> => {
  let fullUrl = `${domainApi}/${url}${paramsToString("?", params)}`;
  const response = await fetchJsonp(fullUrl);
  let responseJson = await response.json();
  let json;
  if (typeof responseJson === "string") {
    try {
      json = JSON.parse(responseJson);
    } catch (e) {
      console.log(e);
      json = utils.parseJSON(responseJson);
    }
  } else {
    json = responseJson;
  }
  return json;
};

export const fetchAndGetJson = async (
  url: string,
  params?: {},
  init?: RequestInit
): Promise<any> => {
  let fullUrl = `${domainApi}/${url}${paramsToString("?", params)}`;

  if (!init)
    init = {
      mode: "cors",
      credentials: "same-origin",
    };

  const response = await fetch(fullUrl, init);
  return await response.json();
};
