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

export function generateFormatedDates(day) {
  let date = new Date(day);
  let year = date.getFullYear();
  let month = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ][date.getMonth()];
  let dayOfMonth = date.getDate();
  let formatedDate = dayOfMonth + " " + month + ", " + year;
  return formatedDate;
}
