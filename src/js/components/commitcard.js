export default class CommitCard {
  create(date, urlToImage, name, mail, message, urlToCommit) {
    const template = `
    <div class="carousel-cell">
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
  </div>
    `;
    return template;
  }
}
