export interface ProductCategory {
    metaData: MetaData;
    name:     DisplayText;
    logoId:   string;
    _id:      string;
}

export interface MetaData {
    createdAt: string;
    updatedAt: string;
    version:   number;
    state:     string;
}

export interface DisplayText {
    defaultText:   LanguageText;
    languageTexts: LanguageText[];
}

export interface LanguageText {
    language: string;
    text:     string;
}
