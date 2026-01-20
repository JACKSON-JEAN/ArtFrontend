import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export const getCountryNameFromCode = (code: string) => {
  if (!code) return "";
  return countries.getName(code, "en") || code; // "US" → "United States"
};

