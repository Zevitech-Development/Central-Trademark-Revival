import { FormatDate } from "./format-date";
import { FormatTime } from "./format-time";

export const FormatDateTime = (
  date: Date | string | null | undefined
): string => {
  if (!date) return "N/A";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "Invalid Date/Time";
  }

  return `${FormatDate(dateObj)} ${FormatTime(dateObj)}`;
};
