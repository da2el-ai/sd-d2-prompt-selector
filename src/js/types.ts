type TConfig = {
  sort: string[];
};

type TTagsArray = string[];
type TTagsDict = { [key: string]: any };
type TTags = TTagsArray | TTagsDict;

type TTagButtonClick = (tag: string, toNegative: boolean) => void;

export type { TConfig, TTags, TTagsArray, TTagsDict, TTagButtonClick };
