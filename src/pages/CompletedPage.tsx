import GeneralTasksLayout from "../features/General/GeneralTasksLayout";
import useLoadCompleted from "../features/General/useLoadCompleted";

import useLoadList from "../features/TaskList/useLoadList";

function CompletedPage() {
  const { tasks = [], isLoading: isLoadingTasks } = useLoadCompleted();
  const { taskList = [], isLoading: isLoadingList } = useLoadList();

  return (
    <GeneralTasksLayout
      tasks={tasks}
      taskList={taskList}
      isLoadingList={isLoadingList}
      isLoadingTasks={isLoadingTasks}
      name={"Completed Tasks"}
      id={"completed"}
      query="c"
    />
  );
}

export default CompletedPage;
