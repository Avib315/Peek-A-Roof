// src/stores/useTranslationStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TranslationsKeys, TranslationsLangs, TranslationsObj, TranslationsStrings } from '../interfaces/ITranslation';
import TextJson from '../assets/Text/Text.json';
import { GetAllTextByTranslations } from '../utils/GetText';



interface TranslationStore {
  currentLang: TranslationsLangs;
  translations: TranslationsStrings;
  setLanguage: (lang: TranslationsLangs) => void;
  toggleLanguage: () => void;
  getTranslation: (key: keyof TranslationsKeys) => string;
  isEnglish: boolean;
  isHebrew: boolean;
}

// ============================================
// HELPER FUNCTION
// ============================================
const Text = TextJson as unknown as TranslationsKeys;

// ============================================
// ZUSTAND STORE
// ============================================
export const useTranslationStore = create<TranslationStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentLang: "en",
      translations: GetAllTextByTranslations("en"),
      isEnglish: true,
      isHebrew: false,

      // Set language and update translations
      setLanguage: (lang: TranslationsLangs) => {
        const translations = GetAllTextByTranslations(lang);
        set({
          currentLang: lang,
          translations,
          isEnglish: lang === "en",
          isHebrew: lang === "he",
        });
        
        // Update document direction for RTL
        document.documentElement.setAttribute('dir', lang === "he" ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang === "he" ? 'he' : 'en');
      },

      // Toggle between languages
      toggleLanguage: () => {
        const currentLang = get().currentLang;
        const newLang: TranslationsLangs = currentLang === "en" ? "he" : "en";
        get().setLanguage(newLang);
      },

      // Get a specific translation by key
      getTranslation: (key: keyof TranslationsKeys) => {
        return get().translations[key] || "";
      },
    }),
    {
      name: 'translation-storage', // localStorage key
      partialize: (state) => ({ currentLang: state.currentLang }), // Only persist language choice
    }
  )
);

// ============================================
// HOOKS FOR CONVENIENCE
// ============================================

// Get current language
export const useCurrentLang = () => useTranslationStore((state) => state.currentLang);

// Get all translations
export const useTranslations = () => useTranslationStore((state) => state.translations);

// Get specific translation
export const useTranslation = (key: keyof TranslationsKeys) => 
  useTranslationStore((state) => state.translations[key]);

// Get setLanguage function
export const useSetLanguage = () => useTranslationStore((state) => state.setLanguage);

// Get toggleLanguage function
export const useToggleLanguage = () => useTranslationStore((state) => state.toggleLanguage);

// Get language flags
export const useIsEnglish = () => useTranslationStore((state) => state.isEnglish);
export const useIsHebrew = () => useTranslationStore((state) => state.isHebrew);