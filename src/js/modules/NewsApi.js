export default class NewsApi {
  constructor(request, now, weekAgo) {
    this.request = request;
    this.now = now;
    this.weekAgo = weekAgo;
  }
  getNews() {
    return fetch(
      "https://praktikum.tk/news/v2/everything?" +
      `q=${this.request.value}&` +
      `from=${this.weekAgo}&` +
      `to=${this.now}&` +
      "pageSize=100&" +
      "sortBy=date&" +
      "language=ru&" +
      "apiKey=b99ed99ced6a450b962a2138904e4943"
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

      .then((res) => res)
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}
