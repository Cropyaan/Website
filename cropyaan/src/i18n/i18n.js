// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// // Import all translation files
// import enTranslation from "../locales/en/translation.json";
// import hiTranslation from "../locales/hi/translation.json";
// import teTranslation from "../locales/te/translation.json";
// import mrTranslation from "../locales/mr/translation.json";
// import knTranslation from "../locales/kn/translation.json";
// import taTranslation from "../locales/ta/translation.json";

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: enTranslation },
//       hi: { translation: hiTranslation },
//       te: { translation: teTranslation },
//       mr: { translation: mrTranslation },
//       kn: { translation: knTranslation },
//       ta: { translation: taTranslation },    },
//     lng: localStorage.getItem("cropyaan_lang") || "en", // default language
//     fallbackLng: "en",  // if a key is missing in a language, fall back to English
//     interpolation: {
//       escapeValue: false, // React already handles XSS
//     },
//   });

// export default i18n;


import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import all translation files
import enTranslation from "../locales/en/translation.json";
import hiTranslation from "../locales/hi/translation.json";
import teTranslation from "../locales/te/translation.json";
import mrTranslation from "../locales/mr/translation.json";
import knTranslation from "../locales/kn/translation.json";
import taTranslation from "../locales/ta/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      hi: { translation: hiTranslation },
      te: { translation: teTranslation },
      mr: { translation: mrTranslation },
      kn: { translation: knTranslation },
      ta: { translation: taTranslation },
    },
    lng: localStorage.getItem("cropyaan_lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;