export default class Statistics {
  constructor(
    storageData,
    request,
    resultsWeek,
    resultsHeading,
    graphDate,
    graphs,
    month
  ) {
    this.storageData = storageData;
    this.request = request;
    this.resultsWeek = resultsWeek;
    this.resultsHeading = resultsHeading;
    this.graphDate = graphDate;
    this.graphs = graphs;
    this.month = month;
  }

  //Сортирует массив новостей по датам, сверху оказываются свежие
  sortedByDateData() {
    if (this.storageData in localStorage) {
      const newsArray = JSON.parse(localStorage.getItem(`${this.storageData}`));
      for (let i = 0; i < newsArray.articles.length; i++) {
        //let dateone = new Date(newsArray.articles[i].publishedAt).getTime();
        newsArray.articles.sort(function (a, b) {
          return (
            Math.round(new Date(b.publishedAt).getTime()) -
            Math.round(new Date(a.publishedAt).getTime())
          );
        });
        return newsArray;
      }
    }
  }

  //Получаем сгодняшнюю дату в формате "число, день"
  getCurrentFormattedDate() {
    let newsArray = this.sortedByDateData();
    let findDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][
      new Date().getDay()
    ];
    let findDate = new Date(newsArray.articles[0].publishedAt).getDate();
    let maxDate = findDate + ", " + findDay;
    return maxDate;
  }

  //Получаем весь массив новостей за неделю с датой в формате "число, день"
  getFormatedDates() {
    let newsArray = this.sortedByDateData();
    for (let i = 0; i < newsArray.articles.length; i++) {
      let findDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][
        new Date(newsArray.articles[i].publishedAt).getDay()
      ];
      let findDate = new Date(newsArray.articles[i].publishedAt).getDate();
      let maxDate = findDate + ", " + findDay;
      newsArray.articles[i].publishedAt = maxDate;
    }
    let newsArrayFormatted = newsArray;
    return newsArrayFormatted;
  }

  // Отдельный массив дат в формате "число, день" за неделю для дальнейшей сортировки исходного массива по дням недели
  getDates() {
    let dateMass = [];
    let maxDate = this.getCurrentFormattedDate();
    for (let i = 1; i <= 6; i++) {
      dateMass.unshift(getFormatedDate(i));
    }
    dateMass.push(maxDate);
    return dateMass;

    function getFormatedDate(day) {
      let findDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][
        new Date(new Date() - day * 24 * 3600 * 1000).getDay()
      ];
      let findDate = new Date(new Date() - day * 24 * 3600 * 1000).getDate();
      let dayAndDate = findDate + ", " + findDay;
      return dayAndDate;
    }
  }

  //получаем  объект с ключами в виде дат
  getFormattedArray() {
    let arrayOfDates = this.getDates();
    const getInitialObject = (array) => {
      return array.reduce((acc, current) => {
        acc[current] = [];
        return acc;
      }, {});
    };

    const datesObject = getInitialObject(arrayOfDates);
    return datesObject;
  }

  //формируем объект "дата: массив новостей"

  getNewsArray() {
    let formerArray = this.getFormatedDates().articles;
    let dateObject = this.getFormattedArray();
    for (let key in dateObject) {
      for (let i = 0; i < formerArray.length; i++) {
        if (key === formerArray[i].publishedAt) {
          dateObject[key] = [...dateObject[key], formerArray[i]];
          //dateObject[key].push(formerArray[i]) - не уверен, какой вариант лучше с т.зр памяти
        }
      }
    }
    return dateObject;
  }

  //кол-во упоминаний запроса в заголовках
  mentionCount() {
    let data = JSON.parse(localStorage.getItem(this.storageData));
    let keyWord = localStorage.getItem("keyword");
    let counter = 0;
    const regexp = new RegExp(`${keyWord}`, `gi`);
    data.articles
      .map((item) => item.title)
      .forEach((element) => {
        if (element.match(regexp)) {
          counter += 1;
        }
      });
    return counter;
  }

  //отрисовка данных о количестве новостей за неделю и количестве упоминаний в заголовках
  keywordStats() {
    let data = JSON.parse(localStorage.getItem(this.storageData));
    this.request.textContent = localStorage.getItem("keyword");
    this.resultsWeek.textContent = data.totalResults;
    this.resultsHeading.textContent = this.mentionCount();
  }

  //добавление текущего месяца в столбец "Дата" графика
  setCurrentMonth() {
    function getCurrentMonth() {
      let month = new Date();
      let options = {
        month: "long",
      };
      return month.toLocaleString("ru", options);
    }
    this.month.textContent = getCurrentMonth();
  }

  setGraphDate() {
    let dates = this.getDates();
    for (let i = 0; i < 7; i++) {
      this.graphDate.children[i].textContent = dates[i];
    }
  }

  //подсчет количества упоминаний ключевого слова в заголовках и описании новостей
  countMentionsPerDay() {
    let keyWord = localStorage.getItem("keyword");
    let mentionsArray = [];
    const regexp = new RegExp(`${keyWord}`, `gi`);
    let weekArray = this.getNewsArray();
    for (let day in weekArray) {
      let counter = 0;
      weekArray[day]
        .map((item) => item.title)
        .forEach((element) => {
          if (element !== null) {
            if (element.match(regexp)) {
              counter += 1;
            }
          }
        });
      weekArray[day]
        .map((item) => item.description)
        .forEach((element) => {
          if (element !== null) {
            if (element.match(regexp)) {
              counter += 1;
            }
          }
        });
      mentionsArray.push(counter);
    }
    return mentionsArray;
  }

  //вывод аналитики
  renderGraph() {
    let mentionsArray = this.countMentionsPerDay();
    for (let i = 0; i < mentionsArray.length; i++) {
      this.graphs.children[i].textContent = mentionsArray[i];
      if (mentionsArray[i] !== 0) {
        let widthPC = 11.3 * mentionsArray[i];
        let widthTablet = 5.5 * mentionsArray[i];
        let widthMobile = 1.86 * mentionsArray[i];
        this.graphs.children[i].style.width = `${widthPC}px`;
        if (
          window.matchMedia(
            "screen and (min-width: 768px) and (max-width: 1250px)"
          ).matches
        ) {
          this.graphs.children[i].style.width = `${widthTablet}px`;
        }
        if (
          window.matchMedia(
            "screen and (min-width: 320px) and (max-width: 767px)"
          ).matches
        ) {
          this.graphs.children[i].style.width = `${widthMobile}px`;
        }
      } else {
        this.graphs.children[i].style.width = `15px`;
      }
    }
  }

  initializeStatistics() {
    this.keywordStats();
    this.setGraphDate();
    this.renderGraph();
    this.setCurrentMonth();
  }
}
