import "./style.css";
import now from "../js/utils/getDate";
import { weekAgo } from "../js/utils/getDate";
require("../Page 1/images/favicon.png");

import { CARD_CONTAINER } from "../js/constants/constants";
import { SEARCH } from "../js/constants/constants";
import { INPUT } from "../js/constants/constants";
import { NEWS } from "../js/constants/constants";
import { STORAGE_DATA } from "../js/constants/constants";
import { NEWS_WRAP } from "../js/constants/constants";
import { PRELOADING_ERROR } from "../js/constants/constants";
import { NOT_FOUND } from "../js/constants/constants";
import { PRELOADER } from "../js/constants/constants";
import { MORE_BUTTON } from "../js/constants/constants";

import NewsApi from "../js/modules/NewsApi";
import DataStorage from "../js/modules/datastorage";
import NewsCardList from "../js/components/newscardlist";
import NewsCard from "../js/components/newscard";

(function () {
  const NEWS_API = new NewsApi(INPUT, now, weekAgo());
  const NEWS_CARD = new NewsCard();
  const NEWS_CARD_LIST = new NewsCardList(
    NEWS,
    CARD_CONTAINER,
    STORAGE_DATA,
    NEWS_CARD,
    NEWS_API,
    PRELOADING_ERROR,
    NOT_FOUND,
    NEWS_WRAP,
    PRELOADER,
    MORE_BUTTON,
    INPUT
  );

  const DATA_STORAGE = new DataStorage(NEWS, NEWS_CARD_LIST, STORAGE_DATA);
  DATA_STORAGE.getLastResults();

  SEARCH.addEventListener("submit", (event) => {
    event.preventDefault();
    NEWS_CARD_LIST.getNews();
  });

  MORE_BUTTON.addEventListener("click", () => {
    event.preventDefault();
    NEWS_CARD_LIST.showMoreNews(JSON.parse(localStorage.getItem("news")));
  });
})();
