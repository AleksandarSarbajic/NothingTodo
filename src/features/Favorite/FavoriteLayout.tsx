import Button from "../../UI/Button";
import EditedAt from "../../UI/EditedAt";
import StyledHeader from "../../UI/Header";
import { useNavigate } from "react-router-dom";
import Heading from "../../UI/Heading";
import { HiEye, HiPlus } from "react-icons/hi2";
import TaskNav from "../../UI/TaskNav";
import TasksColumn from "../../UI/TasksColumn";
import DraggableContainer from "../Task/DraggableContainer";
import useLoadFavorites from "./useLoadFavorites";
import Menus from "../../UI/Menus";
import useLoadList from "../TaskList/useLoadList";
import Spinner from "../../UI/Spinner";
import EmptyTasks from "../../UI/EmptyTasks";

function FavoriteLayout() {
  const navigate = useNavigate();
  const { tasks = [], isLoading: isLoadingFavorites } = useLoadFavorites();
  const { taskList, isLoading: isLoadingList } = useLoadList();

  if (isLoadingList || isLoadingFavorites) return <Spinner />;

  if (!taskList || taskList?.length === 0)
    return (
      <div>
        <TaskNav></TaskNav>
        <EmptyTasks />
      </div>
    );

  return (
    <div>
      <Menus>
        <TaskNav>
          <Menus.Toggle id={"favorite"} />
          <Menus.List id={"favorite"}>
            <Menus.Button icon={<HiEye />}>Sort by</Menus.Button>
          </Menus.List>
        </TaskNav>
        <StyledHeader $use="list">
          <Heading as="h2">Favorites</Heading>
        </StyledHeader>
        <EditedAt
          date={
            taskList[0]?.edited_at
              ? new Date().toISOString()
              : new Date().toISOString()
          }
        />
        <TasksColumn>
          <DraggableContainer tasks={tasks} isLoading={isLoadingFavorites} />
        </TasksColumn>
        <Button
          onClick={() => navigate(`createEditTask?q=${taskList[0].id}&f=true`)}
        >
          <HiPlus />
        </Button>
      </Menus>
    </div>
  );
}

export default FavoriteLayout;
