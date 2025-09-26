export function formatDate(value: string) {
  const date = new Date(value);
  const day = date.toISOString().split("T")[0];
  const time = date.toTimeString().split(" ")[0];

  return { day, time }
}
