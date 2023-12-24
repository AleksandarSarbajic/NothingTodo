import DraggableContainer from "./DraggableContainer";
import Menus from "../../UI/Menus";
import useLoadTasks from "./useLoadTasks";
import TasksColumn from "../../UI/TasksColumn";
import SortByIndicator from "../../UI/SortByIndicator";

function Tasks() {
  const { tasks = [], isLoading } = useLoadTasks();
  return (
    <Menus>
      <SortByIndicator />

      <TasksColumn>
        <DraggableContainer tasks={tasks} isLoading={isLoading} />
      </TasksColumn>
    </Menus>
  );
}

export default Tasks;
