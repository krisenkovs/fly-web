export type Translate = Record<string, TranslateItem>;

// @ts-ignore
type SimpleItem = Record<string, TranslateItem>

// @ts-ignore
export type TranslateItem = string | SimpleItem | Array<SimpleItem>;

