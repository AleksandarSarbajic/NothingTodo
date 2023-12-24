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
import SortByIndicator from "../../UI/SortByIndicator";
import Modal from "../../UI/Modal";
import SortByModal from "../../UI/SortByModal";

interface GeneralOptions {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasks: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  taskList: any[];
  isLoadingTasks: boolean;
  isLoadingList: boolean;
  name: string | null;
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
        <TaskNav direction="/dashboard" />

        <EmptyTasks />
      </div>
    );

  return (
    <div>
      <Modal>
        <Menus>
          <TaskNav direction="/dashboard">
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Modal.Open opens="sortBy">
                <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="sortBy" padding={true}>
              <SortByModal />
            </Modal.Window>
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
          <SortByIndicator />
          <TasksColumn>
            <DraggableContainer tasks={tasks} isLoading={isLoadingTasks} />
          </TasksColumn>
          <Button
            onClick={() =>
              navigate(
                `createEditTask?q=${taskList[0].id}&${query}=${
                  query === "ca" ? name : true
                }`
              )
            }
          >
            <HiPlus />
          </Button>
        </Menus>
      </Modal>
    </div>
  );
}

export default GeneralTasksLayout;
