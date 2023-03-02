import dayjs from "dayjs";

export function formatDate(date, format = "MM月DD日") {
  return dayjs(date).format(format);
}