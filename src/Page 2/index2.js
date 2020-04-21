import "./style2.css";
import sliderSettings from "./js/slider";

import {
  GIT_USER,
  GIT_REPO,
  GIT_COMMITS_PER_PAGE,
  GIT_TOKEN,
  COMMITS_SLIDER,
  COMMITS,
  COMMITS_ERROR,
  COMMITS_CONTAINER,
} from "../js/constants/constants2";

import GithubApi from "../js/modules/githubapi";
import CommitCardList from "../js/components/commitcardlist";
import CommitCard from "../js/components/commitcard";

(function () {
  const GITHUB_API = new GithubApi(
    GIT_USER,
    GIT_REPO,
    GIT_COMMITS_PER_PAGE,
    GIT_TOKEN
  );
  GITHUB_API.getCommits();

  const COMMIT_CARD = new CommitCard();

  const COMMITCARD_LIST = new CommitCardList(
    COMMITS_CONTAINER,
    COMMITS_SLIDER,
    GITHUB_API,
    COMMIT_CARD,
    COMMITS,
    COMMITS_ERROR
  );
  COMMITCARD_LIST.getCommits();
})();
