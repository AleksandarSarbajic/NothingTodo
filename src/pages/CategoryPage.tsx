import { useSearchParams } from "react-router-dom";
import GeneralTasksLayout from "../features/General/GeneralTasksLayout";

import useLoadList from "../features/TaskList/useLoadList";

import useLoadTasks from "../features/Task/useLoadTasksV2";

function CategoryPage() {
  const [useParams] = useSearchParams();
  const query = useParams.get("ca") || "";
  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks({
    filterField: "category",
    filterValue: query,
  });
  const { taskList = [], isLoading: isLoadingList } = useLoadList();

  return (
    <GeneralTasksLayout
      tasks={tasks}
      taskList={taskList}
      isLoadingList={isLoadingList}
      isLoadingTasks={isLoadingTasks}
      name={query}
      id={"category"}
      query="ca"
    />
  );
}

export default CategoryPage;