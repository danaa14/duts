import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Language = "EN" | "RO" | "RU" | "FR";

export interface LangState {
  language: Language;
}

const isLanguage = (value: any): value is Language =>
  value === "EN" || value === "RO" || value === "RU" || value === "FR";

const savedLanguageRaw = localStorage.getItem("language");

const initialState: LangState = {
  language: isLanguage(savedLanguageRaw) ? savedLanguageRaw : "EN",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;