export interface IOptionsItems {
  theme: 'yellow' | 'lightgray' | 'dark',
  topicsPerPage: string,
  autoRefreshTopicsList: string,
  autoRefreshTopicsListInterval: string,
  autoRefreshTopic: string,
  autoRefreshTopicInterval: string,
  tooltipDelay: string,
  showTooltips: string,
  showYoutubeVideoTitle: string,
  replaceCatalogMista: string,
  fixBrokenLinks: string
}

export interface IOptionsState {
  voteColors: Array<string>,
  items: IOptionsItems,
  show?: boolean
};

export const defaultOptionsState: IOptionsState = {
  voteColors: [
    "#FF1616", //1
    "#1A861A", //2
    "#0023FF", //3
    "#FF6B18", //4
    "#9B3A6E", //5
    "#567655", //6
    "#233345", //7
    "#CC0000", //8
    "#00CCCC", //9
    "#0000CC", //10
  ],
  items: {
    theme: 'lightgray',
    topicsPerPage: '20',
    autoRefreshTopicsList: 'false',
    autoRefreshTopicsListInterval: '60',
    autoRefreshTopic: 'true',
    autoRefreshTopicInterval: '60',
    //tooltips
    showTooltips: 'true',
    tooltipDelay: '500',
    //links
    showYoutubeVideoTitle: 'true',
    replaceCatalogMista: 'true',
    fixBrokenLinks: 'true',
  }
}