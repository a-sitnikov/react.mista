
export function today(td: Date): boolean {
  var d = new Date();
  return td.getDate() === d.getDate() && td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
}

export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>)

export const parseJSON = (text: string): {} => {

  try {
    return JSON.parse(text);
  } catch (e) {

  }

  try {
    text = text
      .replace(/\\</g, '<')
      .replace(/\\>/g, '>')
      .replace(/\\&/g, '&')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, "")
      .replace(/ "/g, ' \\"')
      .replace(/""/g, '\\""')
      .replace(/\t/g, '\\t')
      .replace(/"(\.| |\?)/g, '\\"$1')

    //           console.log(text);
    return JSON.parse(text);

    //return eval(text);
  } catch (e) {
    console.error(e.message);
    console.log(text);

    return {};
  }
}

export const getMaxPage = (count: number): number => Math.min(Math.ceil(count / 100), 10) || 1;

export const childrenToText = (children: any): string => {

  if (!children) return children;

  return children.map(value => {
    if (typeof (value) === 'string') {
      return value;
    } else if (value.type === 'br') {
      return '<br>'
    } else if (value.type.displayName === 'Connect(LinkToPost)' || value.type.displayName === 'Connect(t)') {
      return value.props.number;
    } else {
      console.log(value);
      return value;
    }
  })
}

export const extractTextFromHTML = (htmltext: string): string => {
  const parser = new DOMParser();
  const floatingElement = parser.parseFromString(htmltext, 'text/html');
  return (floatingElement.firstChild as HTMLElement).innerText;
}