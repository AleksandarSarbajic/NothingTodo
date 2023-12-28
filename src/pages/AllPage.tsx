import GeneralTasksLayout from "../features/General/GeneralTasksLayout";

import useLoadTasks from "../features/Task/useLoadTasksV2";
import useLoadList from "../features/TaskList/useLoadList";

function AllPage() {
  const filter = {
    filterValue: "all",
    filterField: "",
  };

  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks(filter);

  const { taskList = [], isLoading: isLoadingList } = useLoadList();

  return (
    <GeneralTasksLayout
      tasks={tasks}
      taskList={taskList}
      isLoadingList={isLoadingList}
      isLoadingTasks={isLoadingTasks}
      name={"All Tasks"}
      id={"all"}
      query="a"
      filter={filter}
    />
  );
}

export default AllPage;
