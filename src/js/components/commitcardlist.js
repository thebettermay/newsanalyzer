import sliderSettings from "../../Page 2/js/slider";

export default class CommitCardList {
  constructor(
    commitContainer,
    sliderContainer,
    githubApi,
    commitCard,
    sliderSection,
    error
  ) {
    this.commitContainer = commitContainer;
    this.sliderContainer = sliderContainer;
    this.githubApi = githubApi;
    this.commitCard = commitCard;
    this.sliderSection = sliderSection;
    this.error = error;
  }

  addCommits(commitTemplate) {
    this.sliderContainer.insertAdjacentHTML("afterbegin", commitTemplate);
  }

  errorOn() {
    this.error.classList.remove("hidden");
    this.commitContainer.style.height = "466px";
  }

  getCommits() {
    this.githubApi
      .getCommits()
      .then((res) => {
        for (let array of res) {
          const commitTemplate = this.commitCard.create(
            array.commit.committer.date,
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
}
