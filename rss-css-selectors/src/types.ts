export type Level = {
  mainClass: string;
  taskName: string;
  images: Image[];
  html_code: HtmlCode[];
  closedTag1: string;
  curLevel: string;
  answers: string[];
  checkMarkSideId: string;
  isLevelDone: boolean;
  isLevelDoneWithHelp: boolean;
  levelInMenu: string;
};
export type Image = {
  src: string;
  class: string;
  tooltip: string;
  nestedImg: Image;
};
export type HtmlCode = {
  html: string;
  html_close: string;
  html_nested: HtmlCode;
};
export type LevelDescription = {
  classHelp: string;
  topic_task: string;
  task: string;
  symbol_task: string;
  description_task: string;
  example_word: string;
  example_first: string;
  example_second: string;
};
