import GeneralTasksLayout from "../features/General/GeneralTasksLayout";
import useLoadFavorites from "../features/General/useLoadFavorites";
import useLoadList from "../features/TaskList/useLoadList";

function FavoritesPage() {
  const { tasks = [], isLoading: isLoadingTasks } = useLoadFavorites();
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
