export default class GithubApi {
  constructor(user, repo, commitsPerPage, token) {
    this.user = user;
    this.repo = repo;
    this.commitsPerPage = commitsPerPage;
    this.token = token;
  }

  getCommits() {
    return fetch(
      `https://api.github.com/repos/${this.user}/${this.repo}/commits?&per_page=${this.commitsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.token}`,
        },
      }
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }
}
