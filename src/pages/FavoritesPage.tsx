import GeneralTasksLayout from "../features/General/GeneralTasksLayout";

import useLoadTasks from "../features/Task/useLoadTasksV2";
import useLoadList from "../features/TaskList/useLoadList";

function FavoritesPage() {
  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks({
    filterValue: true,
    filterField: "priority",
  });

  const { taskList = [], isLoading: isLoadingList } = useLoadList();

  return (
    <GeneralTasksLayout
      tasks={tasks}
      taskList={taskList}
      isLoadingList={isLoadingList}
      isLoadingTasks={isLoadingTasks}
      name={"Favorites"}
      id={"favorite"}
      query={"f"}
    />
  );
}

export default FavoritesPage;
// "priority", true
