import sliderSettings from "../../Page 2/js/slider";
import { generateFormatedDates } from "../utils/getDate";

export default class CommitCardList {
  constructor(commitContainer, slider, githubApi, commitCard, error) {
    this.commitContainer = commitContainer;
    this.slider = slider;
    this.githubApi = githubApi;
    this.commitCard = commitCard;
    this.error = error;
  }

  //добавление карточки в разметку
  addCommits(commitTemplate) {
    this.slider.insertAdjacentHTML("afterbegin", commitTemplate);
  }

  //получение коммитов с гитхаба и вывод их в разметку
  getCommits() {
    this.githubApi
      .getCommits()
      .then((res) => {
        for (let array of res) {
          const commitTemplate = this.commitCard.create(
            generateFormatedDates(array.commit.committer.date),
            array.author.avatar_url,
            array.commit.committer.name,
            array.commit.committer.email,
            array.commit.message,
            array.html_url
          );
          this.addCommits(commitTemplate);
        }
        sliderSettings();
      })
      .catch((error) => {
        this.errorOn();
        console.log(`Ошибка: ${error.message}`);
      });
  }
  //ошибка при отсуствии соединения
  errorOn() {
    this.error.classList.remove("hidden");
    this.commitContainer.style.height = "466px";
  }
}
