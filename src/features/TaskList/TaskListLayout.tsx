import { HiPlus } from "react-icons/hi2";
import Button from "../../UI/Button";
import EditedAt from "../../UI/EditedAt";
import StyledHeader from "../../UI/Header";
import Heading from "../../UI/Heading";
import Spinner from "../../UI/Spinner";
import TaskLayout from "../../UI/TaskLayout";
import useLoadSingleList from "./useLoadSingleList";
import { useNavigate } from "react-router-dom";

function TaskListLayout() {
  const { list, isLoading } = useLoadSingleList();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  return (
    <TaskLayout list={list?.[0]}>
      <StyledHeader $use="list">
        <Heading as="h2">{list?.[0].list_name}</Heading>
      </StyledHeader>
      <EditedAt date={list?.[0].edited_at} />

      <Button onClick={() => navigate("createTask")}>
        <HiPlus />
      </Button>
    </TaskLayout>
  );
}

export default TaskListLayout;
