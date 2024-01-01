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
  overflow-y: scroll;

  scrollbar-gutter: initial;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: var(--color-grey-100);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: var(--color-grey-100);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-black-200);
    border: 2px solid var(--color-grey-650);
    border-radius: 2px;
  }
  @media only screen and (max-width: 45em) {
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
  }
`;

function TaskList() {
  const { taskList } = useLoadList();
  const { tasks = [] } = useLoadTasks({
    filterField: "",
    filterValue: "all",
  });

  if (taskList?.length === 0)
    return <EmptyTasks text="Create your first task!" />;

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
