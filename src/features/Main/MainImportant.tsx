import styled from "styled-components";
import TaskListItem from "../TaskList/TaskListItem";

import { HiOutlineCalendarDays, HiCheck, HiOutlineStar } from "react-icons/hi2";
import { PiInfinity } from "react-icons/pi";
import useLoadSettings from "../settings/useLoadSettings";
import useLoadAllTasks from "../Task/useLoadAllTasks";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 4.4rem 0 4rem 0;
  border-bottom: 1px solid rgb(255, 255, 255, 0.1);
`;

function MainImportant() {
  const { settings } = useLoadSettings();
  const { tasks = [] } = useLoadAllTasks();
  return (
    <StyledContainer>
      {settings?.all_lists && (
        <TaskListItem path={""} link={"favorites"}>
          <div>
            <PiInfinity />
            <p>All</p>
          </div>
          <span>{tasks.length}</span>
        </TaskListItem>
      )}
      {settings?.primary_lists && (
        <TaskListItem path={""} link={"favorites"}>
          <div>
            <HiOutlineStar />
            <p>Favorite</p>
          </div>
          <span> {tasks.filter((item) => item.priority).length}</span>
        </TaskListItem>
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
      {settings?.completed_lists && (
        <TaskListItem>
          <div>
            <HiCheck />
            <p>Completed</p>
          </div>
          <span>
            {tasks.filter((item) => item.status === "completed").length}
          </span>
        </TaskListItem>
      )}
    </StyledContainer>
  );
}

export default MainImportant;
