import GeneralTasksLayout from "../features/General/GeneralTasksLayout";

import useLoadTasks from "../features/Task/useLoadTasksV2";
import useLoadList from "../features/TaskList/useLoadList";

function FavoritesPage() {
  const filter = {
    filterValue: true,
    filterField: "priority",
  };
  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks(filter);

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
      filter={filter}
    />
  );
}

export default FavoritesPage;
