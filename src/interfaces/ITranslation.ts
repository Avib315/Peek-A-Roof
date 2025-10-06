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
    contactUs: TranslationsObj;
    Email: TranslationsObj;
    phoneNumber:TranslationsObj;
    emailAddress:TranslationsObj;
    contactTitle:TranslationsObj;
    contactDescription:TranslationsObj;
    titleLogo:TranslationsObj;
    home:TranslationsObj;
    gallery:TranslationsObj;
    contact:TranslationsObj;
    getQuote:TranslationsObj;
    recentImages:TranslationsObj;
    allRightReserved:TranslationsObj;
    callUs:TranslationsObj;
    emailUs:TranslationsObj;
  }
  
  
  interface TranslationsStrings {
    titleLogo:string
    title: string;
    secondTitle: string;
    question: string;
    description: string;
    footer: string;
    home:string;
    gallery:string;
    contact:string;
    contactUs: string;
    Email: string;
    phoneNumber:string;
    emailAddress:string;
    contactTitle:string;
    contactDescription:string
    getQuote:string;
    recentImages:string;
    allRightReserved:string;
    callUs:string;
    emailUs:string;
  }
  
  export type { TranslationsKeys, TranslationsObj  , TranslationsStrings , TranslationsLangs};
  