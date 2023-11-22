import { HiPlus } from "react-icons/hi2";
import Button from "../../UI/Button";
import EditedAt from "../../UI/EditedAt";
import StyledHeader from "../../UI/Header";
import Heading from "../../UI/Heading";
import Spinner from "../../UI/Spinner";
import TaskLayout from "../../UI/TaskLayout";
import useLoadSingleList from "./useLoadSingleList";
import Modal from "../../UI/Modal";
import CreateEditTask from "./CreateEditTask";

function TaskListLayout() {
  const { list, isLoading } = useLoadSingleList();
  console.log(list);

  if (isLoading) return <Spinner />;

  return (
    <TaskLayout list={list?.[0]}>
      <Modal>
        <StyledHeader $use="list">
          <Heading as="h2">{list?.[0].list_name}</Heading>
        </StyledHeader>
        <EditedAt date={list?.[0].edited_at} />
        <Modal.Open opens="add task">
          <Button>
            <HiPlus />
          </Button>
        </Modal.Open>
        <Modal.Window name="add task">
          <CreateEditTask />
        </Modal.Window>
      </Modal>
    </TaskLayout>
  );
}

export default TaskListLayout;
