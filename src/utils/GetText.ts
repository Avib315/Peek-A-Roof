// GetTranslations.ts
import type { TranslationsKeys, TranslationsLangs, TranslationsObj, TranslationsStrings } from "../interfaces/ITranslation";
import TextJson from "../assets/Text/Text.json" assert { type: "json" }; // optional if using ES modules

const Text = TextJson as unknown as TranslationsKeys;

function GetTranslationsPerWord<K extends keyof TranslationsKeys>(key: K, lang: TranslationsLangs = "en") {
  const item = Text[key] as TranslationsObj;
  switch (lang) {
    case "en":
      return item.eng
    case "he":
      return item.heb;
  }
}
function GetAllTextByTranslations(lang: TranslationsLangs = "en"): TranslationsStrings {
  const langText = {} as TranslationsStrings;

  for (const [key, value] of Object.entries(Text)) {
    switch (lang) {
      case "en":
        (langText as any)[key] = value.eng;
        break;
      case "he":
        (langText as any)[key] = value.heb;
        break;
    }
  }

  return langText;
}
export { GetTranslationsPerWord, GetAllTextByTranslations };
