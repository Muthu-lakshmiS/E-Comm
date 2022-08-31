export interface ProductCategory {
  metaData: MetaData;
  name: DisplayText;
  logoId: string;
  _id: string;
  parentCategoryId: string;
  parent:CategorySummary;
  orderBy:number;
}

export interface MetaData {
  createdAt: string;
  updatedAt: string;
  version: number;
  state: string;
}

export interface CategorySummary {
  name:             DisplayText;
  logoId:           string;
  subCategory:      boolean;
  parentCategoryId: string;
  parent:           string;
  id:               string;
}

export interface DisplayText {
  defaultText: LanguageText;
  languageTexts: LanguageText[];
}

export interface LanguageText {
  language: string;
  text: string;
}
