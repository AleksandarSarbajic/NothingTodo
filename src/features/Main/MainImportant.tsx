import styled from "styled-components";
import TaskListItem from "../TaskList/TaskListItem";

import { HiOutlineCalendarDays, HiCheck, HiOutlineStar } from "react-icons/hi2";
import { PiInfinity } from "react-icons/pi";
import useLoadSettings from "../settings/useLoadSettings";

import ThreeDotsLoading from "../../UI/ThreeDotsLoading";
import useLoadTasks from "../Task/useLoadTasksV2";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 4.4rem 0 4rem 0;
  border-bottom: 1px solid var(--line-color);
`;

function MainImportant() {
  const { settings, isLoading } = useLoadSettings();
  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks({
    filterField: "",
    filterValue: "all",
  });

  if (isLoading || isLoadingTasks) return <ThreeDotsLoading alone={true} />;
  const shouldHideTasks = settings?.autohide_lists ? tasks.length !== 0 : true;
  const shouldHidePriority = settings?.autohide_lists
    ? tasks.filter((item) => item.priority).length !== 0
    : true;
  const shouldHideCompleted = settings?.autohide_lists
    ? tasks.filter((item) => item.status === "completed").length !== 0
    : true;

  if (
    !(settings?.all_lists && shouldHideTasks) &&
    !(settings?.primary_lists && shouldHidePriority) &&
    !settings?.planned_lists &&
    !(settings?.completed_lists && shouldHideCompleted)
  )
    return null;

  return (
    <StyledContainer>
      {settings?.all_lists && shouldHideTasks ? (
        <TaskListItem path={""} link={"allTasks"}>
          <div>
            <PiInfinity />
            <p>All</p>
          </div>
          <span>{tasks.length}</span>
        </TaskListItem>
      ) : (
        ""
      )}
      {settings?.primary_lists && shouldHidePriority ? (
        <TaskListItem path={""} link={"favorites"}>
          <div>
            <HiOutlineStar />
            <p>Favorite</p>
          </div>
          <span> {tasks.filter((item) => item.priority).length}</span>
        </TaskListItem>
      ) : (
        ""
      )}
      {settings?.planned_lists && (
        <TaskListItem>
          <div>
            <HiOutlineCalendarDays />
            <p>Planned</p>
          </div>
          <span>69</span>
        </TaskListItem>
      )}
      {settings?.completed_lists && shouldHideCompleted ? (
        <TaskListItem path={""} link={"completed"}>
          <div>
            <HiCheck />
            <p>Completed</p>
          </div>
          <span>
            {tasks.filter((item) => item.status === "completed").length}
          </span>
        </TaskListItem>
      ) : (
        ""
      )}
    </StyledContainer>
  );
}

export default MainImportant;
