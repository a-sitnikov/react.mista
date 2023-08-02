import { ITopicsListItem } from "src/store";


export const mock_topics_list_item0: ITopicsListItem = {
  id: 888064,
  author: "Злоп",
  lastUser: "Гена",
  forum: "life",
  sectionCode: "fear",
  section: "Как страшно жить",
  count: 202,
  text: "OFF: 3: ИП и единый налоговый платеж, кто понял что поменялось?",
  created: 1688017264000,
  updated: 1690369358000,
  closed: false,
  down: false,
  pinned: false,
  isVoting: false,
  showPreview: false,
  previewMsgNumber: 1
}

export const mock_topics_list_item1: ITopicsListItem = {
  id: 888424,
  author: "Автор 2",
  lastUser: "Редактор 2",
  forum: "life",
  sectionCode: "politics",
  section: "Политика",
  count: 95,
  text: "Тема 2",
  created: 1690293273381,
  updated: 1690294273381,
  closed: true,
  down: true,
  pinned: false,
  isVoting: true,
  showPreview: false,
  previewMsgNumber: 1
}

export const mock_topics_list = [
  mock_topics_list_item0
]