import TaskNav from "../../UI/TaskNav";
import Analytics from "./Analytics";
import AnalyticsButtonRow from "../../UI/AnalyticsButtonRow";
import Heading from "../../UI/Heading";
import styled from "styled-components";
import AnalyticsHistoryItem from "../../UI/AnalyticsHistoryItem";

import { useSearchParams } from "react-router-dom";
import {
  analyticsInterval,
  completedTasksForInterval,
} from "../../utils/helpers";
import { format } from "date-fns";
import useLoadSettings from "../settings/useLoadSettings";

const StyledContainer = styled.div`
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-700);
  }
`;
const StyledList = styled.ul`
  margin: 2.4rem 0;
`;

const StyledInfo = styled.span`
  font-size: 1.6rem;
  margin-top: 1.4rem;
  color: var(--color-grey-700);
  opacity: 0.5;
`;

function AnalyticsLayout() {
  const [useParams] = useSearchParams();
  const { settings } = useLoadSettings();
  const completedArray = settings?.completed_array || [];
  const queryType = useParams.get("q") as "day" | "week" | "month";
  const numIntervals =
    queryType === "day"
      ? 7
      : queryType === "week"
      ? 30
      : queryType === "month"
      ? 12
      : 7;

  const allMonths = analyticsInterval(numIntervals, "month");
  const allDates = analyticsInterval(numIntervals, "date");

  const completedTasksPerMonth: number[] = completedTasksForInterval(
    completedArray,
    numIntervals,
    "month"
  );
  const completedTasksPerDay: number[] = completedTasksForInterval(
    completedArray,
    numIntervals,
    "date"
  );

  const monthLabels = allMonths.map((month) => format(month, "MMM"));

  const resultArray =
    queryType === "month"
      ? monthLabels.map((label, index) => ({
          day: label,
          completedTasks: completedTasksPerMonth[index],
        }))
      : allDates.map((date, index) => ({
          day: format(date, "MMM dd"),
          completedTasks: completedTasksPerDay[index],
        }));

  return (
    <StyledContainer>
      <TaskNav direction="/dashboard" />

      <Heading as="h1" style={{ textAlign: "center", marginTop: "5rem" }}>
        Analytics
      </Heading>
      <AnalyticsButtonRow />
      <Analytics data={resultArray} />
      <Heading as="h3" style={{ marginTop: "5rem" }}>
        History
      </Heading>
      <StyledInfo>
        Completed tasks remain in the analytics history even after deletion, but
        they are inaccessible.
      </StyledInfo>
      <StyledList>
        {resultArray.map((result) => {
          return (
            <AnalyticsHistoryItem
              key={result.day}
              title={result.day}
              numOfCompleted={result.completedTasks}
              query={queryType}
            />
          );
        })}
      </StyledList>
    </StyledContainer>
  );
}

export default AnalyticsLayout;
