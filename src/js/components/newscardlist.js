import { COUNTER_PLUS } from "../constants/constants";
import { generateFormatedDates } from "../utils/getDate";

export default class NewsCardList {
  constructor(
    results,
    cards,
    storageData,
    newsCard,
    newsApi,
    errorBlock,
    noResultsBlock,
    newsBlock,
    loaderBlock,
    showMoreButton,
    input,
    errorImg
  ) {
    this.results = results;
    this.cards = cards;
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
    this.errorImg = errorImg;
  }

  //вывод карточки в разметку
  _addCard(cardTemplate) {
    this.cards.insertAdjacentHTML("beforeend", cardTemplate);
  }
  //очистка контейнера с карточками новостей
  _clearLastNews() {
    while (this.cards.firstChild) this.cards.removeChild(this.cards.firstChild);
  }

  //прелоадер
  _preloaderOn() {
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.remove("hidden");
  }

  //показать/скрыть кнопку "Показать еще"
  _moreBtnSwitch(newsArray) {
    let countedCards = this.cards.childElementCount;
    if (countedCards < newsArray.articles.length) {
      this.showMoreButton.classList.remove("hidden");
    } else {
      this.showMoreButton.classList.add("hidden");
    }
  }

  //ошибка при отс-ии картинки новости
  _checkArticleImage(articleImage) {
    if (articleImage === null) {
      articleImage = `${this.errorImg}`;
    }

    return articleImage;
  }

  //отрисовка карточек
  renderNews(newsArray) {
    const newsArticles = newsArray.articles;
    console.log(newsArticles);
    for (let i = this.startCounter; i < this.startCounter + COUNTER_PLUS; i++) {
      const articleImg = this._checkArticleImage(newsArticles[i].urlToImage);
      newsArticles[i] = this.newsCard.create(
        newsArticles[i].url,
        articleImg,
        generateFormatedDates(newsArticles[i].publishedAt),
        newsArticles[i].title,
        newsArticles[i].description,
        newsArticles[i].source.name
      );
      this._addCard(newsArticles[i]);
    }
    this._moreBtnSwitch(newsArray);
  }

  //показать еще
  showMoreNews(newsArray) {
    this.startCounter += COUNTER_PLUS;
    this.renderNews(newsArray);
  }

  //получение данных с News Api
  getNews() {
    this._preloaderOn();
    this.startCounter = 0;
    this.newsApi
      .getNews()
      .then((res) => {
        if (+res.totalResults !== 0) {
          this._clearLastNews();
          localStorage.clear();
          this._noResultsOff();
          localStorage.setItem("keyword", `${this.input.value}`);
          localStorage.setItem(`${this.storageData}`, JSON.stringify(res));
          this.renderNews(
            JSON.parse(localStorage.getItem(`${this.storageData}`))
          );
        } else {
          this._noResultsOn();
        }
      })
      .catch((error) => {
        this._errorOn();
        console.log(`Ошибка: ${error.message}`);
      });
  }

  //скрыть блок "отстутствие рез-в"
  _noResultsOff() {
    this.noResultsBlock.classList.add("hidden");
    this.errorBlock.classList.add("hidden");
    this.results.classList.remove("hidden");
    this.newsBlock.classList.remove("hidden");
    this.loaderBlock.classList.add("hidden");
  }

  //показать блок "отсутствие рез-в"
  _noResultsOn() {
    this.results.classList.remove("hidden");
    this.noResultsBlock.classList.remove("hidden");
    this.errorBlock.classList.add("hidden");
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.add("hidden");
  }

  //ошибка получения данных с News Api
  _errorOn() {
    this.results.classList.remove("hidden");
    this.errorBlock.classList.remove("hidden");
    this.newsBlock.classList.add("hidden");
    this.loaderBlock.classList.add("hidden");
    this.noResultsBlock.classList.add("hidden");
  }
}
