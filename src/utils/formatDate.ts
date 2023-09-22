export function formatDate(dateString: string) {
  const createdAtDate = new Date(dateString);

  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthAbbreviation = monthAbbreviations[createdAtDate.getMonth()];
  const day = createdAtDate.getDate();

  return `${monthAbbreviation}, ${day}`;
}
