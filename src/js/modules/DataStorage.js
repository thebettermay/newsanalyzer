export default class DataStorage {
  constructor(newsContainer, newsCardlist, storageData) {
    this.newsContainer = newsContainer;
    this.newsCardlist = newsCardlist;
    this.storageData = storageData;
  }

  getLastResults() {
    if (this.storageData in localStorage) {
      console.log(localStorage);
      const newsArray = JSON.parse(localStorage.getItem(`${this.storageData}`));
      this.newsCardlist.renderNews(newsArray);
      this.newsContainer.classList.remove("hidden");
    } else {
      this.newsContainer.classList.add("hidden");
    }
  }
}
