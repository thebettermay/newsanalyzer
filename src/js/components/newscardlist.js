import { COUNTER_PLUS } from "../constants/constants";

export default class NewsCardList {
  constructor(
    resultsSection,
    cardsContainer,
    storageData,
    newsCard,
    newsApi,
    errorBlock,
    noResultsBlock,
    newsBlock,
    loaderBlock,
    showMoreButton,
    input
  ) {
    this.resultsSection = resultsSection;
    this.cardsContainer = cardsContainer;
    this.storageData = storageData;
    this.newsCard = newsCard;
    this.newsApi = newsApi;
    this.errorBlock = errorBlock;
    this.noResultsBlock = noResultsBlock;
    this.newsBlock = newsBlock;
    this.loaderBlock = loaderBlock;
    this.startCounter = 0;
    this.showMoreButton = showMoreButton;
    this.input = input;
  }

  addCard(cardTemplate) {
    this.cardsContainer.insertAdjacentHTML("beforeend", cardTemplate);
  }

  clearLastNews() {
    this.cardsContainer.innerHTML = "";
  }

  preloaderOn() {
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.remove("hidden");
  }

  noResultsOff() {
    this.noResultsBlock.classList.add("hidden");
    this.errorBlock.classList.add("hidden");
    this.resultsSection.classList.remove("hidden");
    this.newsBlock.classList.remove("hidden");
    this.loaderBlock.classList.add("hidden");
  }

  noResultsOn() {
    this.resultsSection.classList.remove("hidden");
    this.noResultsBlock.classList.remove("hidden");
    this.errorBlock.classList.add("hidden");
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.add("hidden");
  }

  errorOn() {
    this.resultsSection.classList.remove("hidden");
    this.errorBlock.classList.remove("hidden");
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.add("hidden");
    this.noResultsBlock.classList.add("hidden");
  }

  hideAndShowMoreNewsButton(newsArray) {
    let countedCards = this.cardsContainer.childElementCount;
    if (countedCards < newsArray.articles.length) {
      this.showMoreButton.classList.remove("hidden");
    } else {
      this.showMoreButton.classList.add("hidden");
    }
  }

  renderNews(newsArray) {
    const newsArticles = newsArray.articles;
    for (let i = this.startCounter; i < this.startCounter + COUNTER_PLUS; i++) {
      newsArticles[i] = this.newsCard.create(
        newsArticles[i].url,
        newsArticles[i].urlToImage,
        newsArticles[i].publishedAt,
        newsArticles[i].title,
        newsArticles[i].description,
        newsArticles[i].source.name
      );
      this.addCard(newsArticles[i]);
    }
  }

  showMoreNews(newsArray) {
    this.startCounter += COUNTER_PLUS;
    this.renderNews(newsArray);
    this.hideAndShowMoreNewsButton(newsArray);
  }

  getNews() {
    this.preloaderOn();
    this.newsApi
      .getNews()
      .then((res) => {
        if (+res.totalResults !== 0) {
          this.clearLastNews();
          localStorage.clear();
          this.noResultsOff();
          localStorage.setItem("keyword", `${this.input.value}`);
          localStorage.setItem(`${this.storageData}`, JSON.stringify(res));
          this.renderNews(
            JSON.parse(localStorage.getItem(`${this.storageData}`))
          );
        } else {
          this.noResultsOn();
        }
      })
      .catch((error) => {
        this.errorOn();
        console.log(`Ошибка: ${error.message}`);
      });
  }
}
