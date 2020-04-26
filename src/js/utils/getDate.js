const now = new Date().toISOString().split("T")[0];
export default now;

export function weekAgo() {
  let date = new Date();
  date.setDate(date.getDate() - 6);
  let weekAgo =
    date.getFullYear() +
    "-" +
    (parseInt(date.getMonth() + 1) < 10
      ? "0" + parseInt(date.getMonth() + 1)
      : parseInt(date.getMonth() + 1)) +
    "-" +
    date.getDate();
  return weekAgo;
}
