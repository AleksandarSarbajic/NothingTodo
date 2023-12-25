import DraggableContainer from "./DraggableContainer";
import Menus from "../../UI/Menus";
import TasksColumn from "../../UI/TasksColumn";
import SortByIndicator from "../../UI/SortByIndicator";
import useLoadTasks from "./useLoadTasksV2";

function Tasks() {
  const { tasks = [], isLoading } = useLoadTasks({
    filterField: "",
    filterValue: "id",
  });

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
