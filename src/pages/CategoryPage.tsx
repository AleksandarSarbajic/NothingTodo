import { useSearchParams } from "react-router-dom";
import GeneralTasksLayout from "../features/General/GeneralTasksLayout";

import useLoadList from "../features/TaskList/useLoadList";

import useLoadTasks from "../features/Task/useLoadTasksV2";

function CategoryPage() {
  const [useParams] = useSearchParams();
  const query = useParams.get("ca") || "";

  const filter = {
    filterField: "category",
    filterValue: query.trim(),
  };
  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks(filter);
  const { taskList = [], isLoading: isLoadingList } = useLoadList();
  console.log(query);
  return (
    <GeneralTasksLayout
      tasks={tasks}
      taskList={taskList}
      isLoadingList={isLoadingList}
      isLoadingTasks={isLoadingTasks}
      name={query.trim()}
      id={"category"}
      query="ca"
      filter={filter}
    />
  );
}

export default CategoryPage;
