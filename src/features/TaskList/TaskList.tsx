import styled from "styled-components";

import TaskListItem from "./TaskListItem";

import { HiListBullet } from "react-icons/hi2";
import useLoadList from "./useLoadList";
// import SpinnerMini from "../../UI/SpinnerMini";
const StyledContainer = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-height: 40dvh;
  overflow: scroll;
`;

function TaskList() {
  const { taskList, isLoading } = useLoadList();
  console.log(isLoading);

  // if (isLoading) return <SpinnerMini />;

  return (
    <StyledContainer>
      {taskList?.map((task) => {
        return (
          <TaskListItem key={task.id}>
            <div>
              <HiListBullet />
              <p>{task.list_name}</p>
            </div>
            {/* <span>1</span> */}
          </TaskListItem>
        );
      })}
    </StyledContainer>
  );
}

export default TaskList;
