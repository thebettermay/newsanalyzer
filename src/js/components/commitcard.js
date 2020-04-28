export default class CommitCard {
  create(date, urlToImage, name, mail, message, urlToCommit) {
    const template = `
    <div class="carousel-cell">
    <a href="${urlToCommit}" class="card-link" target="_blank">
    <p class="date">${date}</p>
    <div class="cell-wrap">
      <div class="cell-photo"><img src="${urlToImage}" alt="аватар автора коммита" class="cell-photo"/></div>
      <div>
        <p class="name">${name}</p>
        <p class="email">${mail}</p>
      </div>
    </div>
    <p class="text-carousel">
    ${message}
    </p>
    </a>
  </div>
    `;
    return template;
  }
}
