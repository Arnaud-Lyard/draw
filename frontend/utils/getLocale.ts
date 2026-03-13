export const getLocale = () => {
  if (typeof window === "undefined") return "en";
  const locale = window.navigator.language.split("-")[0];
  return locale;
};
