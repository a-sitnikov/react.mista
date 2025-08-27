import dayjs from "dayjs";

export const toNumber = (
  str: string | number | undefined | null,
  defaultValue = 0
) => {
  if (!str) return defaultValue;
  if (typeof str === "number") return str;

  const number = parseInt(str, 10);
  if (isNaN(number)) return defaultValue;
  return number;
};

export const groupBy = <T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

export const parseJSON = (text: string): {} => {
  try {
    return JSON.parse(text);
  } catch (e) {}

  try {
    text = text
      .replace(/\\</g, "<")
      .replace(/\\>/g, ">")
      .replace(/\\&/g, "&")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, "")
      .replace(/ "/g, ' \\"')
      .replace(/""/g, '\\""')
      .replace(/\t/g, "\\t")
      .replace(/"(\.| |\?)/g, '\\"$1');

    //           console.log(text);
    return JSON.parse(text);

    //return eval(text);
  } catch (e) {
    console.error(e.message);
    console.log(text);

    return {};
  }
};

export const getPageNumber = (
  locationPage: string | undefined | null
): number | "last20" => {
  if (!locationPage) return 1;
  if (locationPage === "last20") return "last20";

  return toNumber(locationPage, 1);
};

export const getMaxPage = (count: number): number => {
  if (count === -1 || count === undefined) return -1;
  return Math.min(Math.ceil(count / 100), 10) || 1;
};

export const childrenToText = (children: any): string[] => {
  if (!children) return [""];

  return children.map((value) => {
    if (typeof value === "string") {
      return value;
    } else if (value.type === "br") {
      return "<br>";
    } else if (
      value.type.displayName === "Connect(LinkToPost)" ||
      value.type.displayName === "Connect(t)"
    ) {
      return value.props.number;
    } else {
      console.log(value);
      return value;
    }
  });
};

export const extractTextFromHTML = (htmltext: string): string => {
  const parser = new DOMParser();
  const floatingElement = parser.parseFromString(htmltext, "text/html");
  return (floatingElement.firstChild as HTMLElement).innerText;
};

export function isToday(td: Date | number): boolean {
  return dayjs(td).isSame(new Date(), "day");
}

export const formattedTime = (time: number): string => {
  if (time === 2147483648000) return "";

  if (isToday(time)) {
    return dayjs(time).format("HH:mm");
  } else {
    return dayjs(time).format("DD.MM.YY");
  }
};
