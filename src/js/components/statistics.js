export default class Statistics {
  constructor(storageData, request, resultsWeek, resultsHeading, graphDate) {
    this.storageData = storageData;
    this.request = request;
    this.resultsWeek = resultsWeek;
    this.resultsHeading = resultsHeading;
    this.graphDate = graphDate;
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
    let formerArray = this.getFormatedDates();
    let arrayOfDates = this.getDates();
    const getInitialObject = (array) => {
      return array.reduce((acc, current) => {
        formerArray.articles.filter((news) => news.publishedAt === current);
        acc[current] = [formerArray.articles];
        return acc;
      }, {});
    };

    const datesObject = getInitialObject(arrayOfDates);
    return datesObject;
  }

  //формируем объект "дата: массив новостей"

  getNewsArray() {
    let formerArray = this.getFormatedDates();
    let dateObject = this.getDates();
    console.log(formerArray.articles[0]);
    for (let i = 0; i < formerArray.length; i++) {
      formerArray.articles[i].publishedAt === dateObject[i];
    }
    return formerArray.articles;
  }

  setGraphDate() {
    let dates = this.getDates();
    for (let i = 0; i < 7; i++) {
      this.graphDate.children[i].textContent = dates[i];
    }
  }

  setRequest() {
    this.request.textContent = localStorage.getItem("keyword");
  }
}

/*getWeekDay() {
    let newsArray = this.sortedByDateData();
    for (let i = 0; i < newsArray.articles.length; i++) {
      function getWeekDay(date) {
        let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

        return days[date.getDay()];
      }
      let date = new Date(this.getDate());
      let day = getWeekDay(date);
      console.log(day);
    }
  }
}
sortbyDate() {
    if (this.storageData in localStorage) {
      const newsArray = JSON.parse(localStorage.getItem(`${this.storageData}`));
      newsArray.articles.forEach((element) => {
        element.publishedAt = new Date(element.publishedAt)
          .toISOString()
          .split("T")[0];
      });
      return newsArray;
    }
    let result = newsArray.articles.map(
      (publishedAt) => (publishedAt = publishedAt)
    );
    console.log(result);
  }
}
*/
