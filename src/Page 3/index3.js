import "./style3.css";
import {
  STORAGE_DATA,
  REQUEST,
  RESULTS_WEEK,
  RESULTS_HEADING,
  GRAPH_DATE,
  GRAPHS,
  MONTH,
} from "../js/constants/constants3";

import Statistics from "../js/components/statistics";

(function () {
  const statistics = new Statistics(
    STORAGE_DATA,
    REQUEST,
    RESULTS_WEEK,
    RESULTS_HEADING,
    GRAPH_DATE,
    GRAPHS,
    MONTH
  );
  statistics.initializeStatistics();
})();
