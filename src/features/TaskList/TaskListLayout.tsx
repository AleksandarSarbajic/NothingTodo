import { HiPlus } from "react-icons/hi2";
import Button from "../../UI/Button";
import EditedAt from "../../UI/EditedAt";
import StyledHeader from "../../UI/Header";
import Heading from "../../UI/Heading";
import Spinner from "../../UI/Spinner";
import TaskLayout from "../../UI/TaskLayout";
import useLoadSingleList from "./useLoadSingleList";
import { useNavigate } from "react-router-dom";
import Tasks from "../Task/Tasks";

function TaskListLayout() {
  const { list, isLoading } = useLoadSingleList();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  return (
    <TaskLayout list={list}>
      <StyledHeader $use="list">
        <Heading as="h2">
          {list.list_name.length < 55
            ? list.list_name
            : `${list.list_name.slice(0, 55)}...`}
        </Heading>
      </StyledHeader>
      <EditedAt date={list.edited_at} />
      <Tasks />
      <Button onClick={() => navigate(`createEditTask?q=${list.id}`)}>
        <HiPlus />
      </Button>
    </TaskLayout>
  );
}

export default TaskListLayout;
