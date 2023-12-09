import Button from "../../UI/Button";
import EditedAt from "../../UI/EditedAt";
import StyledHeader from "../../UI/Header";
import { useNavigate } from "react-router-dom";
import Heading from "../../UI/Heading";
import { HiEye, HiPlus } from "react-icons/hi2";
import TaskNav from "../../UI/TaskNav";
import TasksColumn from "../../UI/TasksColumn";
import DraggableContainer from "../Task/DraggableContainer";
import Menus from "../../UI/Menus";
import Spinner from "../../UI/Spinner";
import EmptyTasks from "../../UI/EmptyTasks";
import styled from "styled-components";

const StyledContainer = styled.div``;

interface GeneralOptions {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasks: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskList: any[];
  isLoadingTasks: boolean;
  isLoadingList: boolean;
  name: string;
  query: string;
}

function GeneralTasksLayout({
  id,
  name,
  tasks,
  taskList,
  isLoadingList,
  isLoadingTasks,
  query = "f",
}: GeneralOptions) {
  const navigate = useNavigate();

  if (isLoadingList || isLoadingTasks) return <Spinner />;

  if (!taskList || taskList?.length === 0)
    return (
      <div>
        <TaskNav></TaskNav>
        <EmptyTasks />
      </div>
    );

  return (
    <StyledContainer>
      <Menus>
        <TaskNav>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
          </Menus.List>
        </TaskNav>
        <StyledHeader $use="list">
          <Heading as="h2">{name}</Heading>
        </StyledHeader>
        <EditedAt
          date={
            taskList[0]?.edited_at
              ? new Date().toISOString()
              : new Date().toISOString()
          }
        />
        <TasksColumn>
          <DraggableContainer tasks={tasks} isLoading={isLoadingTasks} />
        </TasksColumn>
        <Button
          onClick={() =>
            navigate(`createEditTask?q=${taskList[0].id}&${query}=true`)
          }
        >
          <HiPlus />
        </Button>
      </Menus>
    </StyledContainer>
  );
}

export default GeneralTasksLayout;
