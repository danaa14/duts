import en from "./en.json";
import ro from "./ro.json";
import ru from "./ru.json";
import fr from "./fr.json";

import type { Language } from "../store/langSlice";

const translations: Record<Language, Record<string, string>> = {
  EN: en,
  RO: ro,
  RU: ru,
  FR: fr,
};

export const translate = (key: string, language: Language): string => {
  const langTable = translations[language];

  if (!langTable) {
    console.warn(`Missing language table for: ${language}`);
    return key;
  }

  return langTable[key] ?? key;
};