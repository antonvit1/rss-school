export type Level = {
  mainClass: string;
  taskName: string;
  images: Image[];
  html_code: HtmlCode[];
  curLevel: string;
  answer: string;
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
  html_nested: HtmlCode;
};

