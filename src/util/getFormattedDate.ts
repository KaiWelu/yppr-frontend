export const getFormattedDate = (date: string): string => {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
