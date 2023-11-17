import styled from "styled-components";

import TaskListItem from "./TaskListItem";

import { HiListBullet } from "react-icons/hi2";
const StyledContainer = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-height: 40dvh;
  overflow: scroll;
`;

function TaskList() {
  return (
    <StyledContainer>
      <TaskListItem>
        <div>
          <HiListBullet />
          <p>Nothing To Do</p>
        </div>
        <span>1</span>
      </TaskListItem>
    </StyledContainer>
  );
}

export default TaskList;
