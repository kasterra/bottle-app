export function parseDateString(dateString: string | null) {
  if (dateString === null) {
    return new Date(0);
  }
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
}
