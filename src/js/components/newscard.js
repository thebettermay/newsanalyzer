export default class NewsCard {
  create(url, urlToImage, publishedAt, title, description, source) {
    const template = `
    <div class="news-card">

    <div class="news-card__image-container">
    <img src="${urlToImage}" alt="обложка новости" class="news-card__image">
    </div>
      <div class="news-card__info">
        <p class="date">${publishedAt}</p>
        <h2 class="heading">${title}</h2>
        <p class="text-news">
        ${description}
        </p>
        <p class="resource">${source}</p>
      </div>`;
    return template;
  }
}
