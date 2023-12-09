import GeneralTasksLayout from "../features/General/GeneralTasksLayout";

import useLoadAllTasks from "../features/Task/useLoadAllTasks";
import useLoadList from "../features/TaskList/useLoadList";

function AllPage() {
  const { tasks = [], isLoading: isLoadingTasks } = useLoadAllTasks();
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
    />
  );
}

export default AllPage;
