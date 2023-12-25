import GeneralTasksLayout from "../features/General/GeneralTasksLayout";

import useLoadTasks from "../features/Task/useLoadTasksV2";

import useLoadList from "../features/TaskList/useLoadList";

function CompletedPage() {
  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks({
    filterField: "status",
    filterValue: "completed",
  });
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
