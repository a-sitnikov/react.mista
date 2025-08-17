import { groupBy } from "src/utils";

export const mock_sections = [
  {
    forum: "1C",
    code: "v7",
    name: "1С:Предприятие 7.7 и ранее",
    id: 3,
  },
  {
    forum: "1C",
    code: "v8",
    name: "1С:Предприятие 8 общая",
    id: 8,
  },
  {
    forum: "IT",
    code: "admin",
    name: "Администрирование",
    id: 9,
  },
  {
    forum: "IT",
    code: "mobile",
    name: "Мобильный мир",
    id: 10,
  },
];

export const mock_sections_tree = groupBy(mock_sections, (item) => item.forum);
