import DraggableContainer from "./DraggableContainer";
import Menus from "../../UI/Menus";
import useLoadTasks from "./useLoadTasks";
import TasksColumn from "../../UI/TasksColumn";

function Tasks() {
  const { tasks = [], isLoading } = useLoadTasks();
  return (
    <Menus>
      <TasksColumn>
        <DraggableContainer tasks={tasks} isLoading={isLoading} />
      </TasksColumn>
    </Menus>
  );
}

export default Tasks;
