export default function formatDateToCustomFormat(
  date: Date,
  format: string,
): string {
  if (!date) return "";
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return format
    .replace("yyyy", year)
    .replace("dd", day)
    .replace("MM", month)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}
