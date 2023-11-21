import styled from "styled-components";

import TaskListItem from "./TaskListItem";

import { HiListBullet } from "react-icons/hi2";
import useLoadList from "./useLoadList";

const StyledContainer = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-height: 40dvh;
  overflow: scroll;
`;

function TaskList() {
  const { taskList } = useLoadList();

  return (
    <StyledContainer>
      {taskList
        ?.slice()
        .sort((a, b) => {
          return (
            new Date(b.edited_at).getTime() - new Date(a.edited_at).getTime()
          );
        })
        ?.sort((a, b) => b.edited_at - a.edited_at)
        .map((task) => {
          return (
            <TaskListItem key={task.id} path="list_" link={task.id}>
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
