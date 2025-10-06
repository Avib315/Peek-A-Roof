// translations.ts
interface TranslationsObj {
    heb: string;
    eng: string;
  }
  type TranslationsLangs = "he" | "en" 
  interface TranslationsKeys {
    title: TranslationsObj;
    secondTitle: TranslationsObj;
    question: TranslationsObj;
    description: TranslationsObj;
    footer: TranslationsObj;
    home: TranslationsObj;
    contactUs: TranslationsObj;
    Email: TranslationsObj;
  }
  
  
  interface TranslationsStrings {
    title: string;
    secondTitle: string;
    question: string;
    description: string;
    footer: string;
    home: string;
    contactUs: string;
    Email: string;
  }
  
  export type { TranslationsKeys, TranslationsObj  , TranslationsStrings , TranslationsLangs};
  