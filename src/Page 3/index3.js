import "./style3.css";
import {
  STORAGE_DATA,
  REQUEST,
  RESULTS_WEEK,
  RESULTS_HEADING,
  GRAPH_DATE,
} from "../js/constants/constants3";

import Statistics from "../js/components/statistics";

(function () {
  const statistics = new Statistics(
    STORAGE_DATA,
    REQUEST,
    RESULTS_WEEK,
    RESULTS_HEADING,
    GRAPH_DATE
  );
  console.log(statistics.sortedByDateData());
  console.log(statistics.getDates());
  console.log(statistics.getFormatedDates());
  statistics.setGraphDate();
  statistics.setRequest();
  console.log(statistics.getFormattedArray());
  statistics.getNewsArray();
})();
