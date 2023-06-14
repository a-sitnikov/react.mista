export const formTabs = [
  {
    tabName: 'Общие',
    rows: [
      ['theme'],
      ['topicsPerPage'],
      ['autoRefreshTopicsList', 'autoRefreshTopicsListInterval'],
      ['autoRefreshTopic', 'autoRefreshTopicInterval'],
    ]
  },
  {
    tabName: 'Тултипы',
    rows: [
      ['showTooltips', 'tooltipDelay'],
      ['showTooltipOnPostLink']
    ]
  },
  {
    tabName: 'Ссылки',
    rows: [
      ['showYoutubeVideoTitle'],
      ['replaceCatalogMista'],
      ['fixBrokenLinks'],
    ]
  }
];

export const formParams = {
  'theme': {
    type: 'radio',
    label: 'Цветовая палитра:',
    oneLine: true,
    values: [
      { name: 'yellow', descr: 'Золотая' },
      { name: 'lightgray', descr: 'Серая' },
      { name: 'dark', descr: 'Темная' }
    ]
  },
  'topicsPerPage': {
    type: 'number',
    label: 'Тем на странице (max 99):',
    min: 1,
    max: 99
  },
  'autoRefreshTopicsList': {
    type: 'checkbox',
    label: 'Автообновление списка тем'
  },
  'autoRefreshTopicsListInterval': {
    type: 'number',
    label: '',
    min: 60,
    max: 1000000,
    postfix: 'сек'
  },
  'autoRefreshTopic': {
    type: 'checkbox',
    label: 'Автообновление темы'
  },
  'autoRefreshTopicInterval': {
    type: 'number',
    label: '',
    min: 60,
    max: 1000000,
    postfix: 'сек'
  },
  //Tooltips   
  'showTooltips': {
    type: 'checkbox',
    label: 'Показывать тултипы, задержка',
    disabled: true
  },
  'tooltipDelay': {
    type: 'number',
    max: 1000000,
    label: '',
    postfix: 'мс',
    disabled: true
  },
  'showTooltipOnPostLink': {
    type: 'checkbox',
    label: 'Показывать тултип ссыки на другую ветку',
    disabled: true    
  },
  //links   
  'showYoutubeVideoTitle': {
    type: 'checkbox',
    label: 'Показывать наименования роликов youtube'
  },
  'replaceCatalogMista': {
    type: 'checkbox',
    label: 'Обратно заменять catalog.mista.ru на infostart.ru'
  },
  'fixBrokenLinks': {
    type: 'checkbox',
    label: 'Чинить поломанные ссылки (с русскими символами)'
  },
}