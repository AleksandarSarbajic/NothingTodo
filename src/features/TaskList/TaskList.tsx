import styled from "styled-components";

import TaskListItem from "./TaskListItem";

import { HiListBullet } from "react-icons/hi2";
import useLoadList from "./useLoadList";
import EmptyTasks from "../../UI/EmptyTasks";
import useLoadTasks from "../Task/useLoadTasksV2";

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
  const { tasks = [] } = useLoadTasks({
    filterField: "",
    filterValue: "all",
  });

  if (taskList?.length === 0) return <EmptyTasks />;

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
              <span>
                {tasks?.filter((item) => item.ListId === task.id).length}
              </span>
            </TaskListItem>
          );
        })}
    </StyledContainer>
  );
}

export default TaskList;
