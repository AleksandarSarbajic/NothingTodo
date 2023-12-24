import { useLocation, useSearchParams } from "react-router-dom";

import useLoadList from "../features/TaskList/useLoadList";
import GeneralTasksLayout from "../features/General/GeneralTasksLayout";
import useLoadAllTasks from "../features/Task/useLoadAllTasks";
import { format } from "date-fns";

function CompletedDatePage() {
  const { pathname } = useLocation();
  const [useParams] = useSearchParams();
  const query = useParams.get("date");
  const title = pathname.slice(11, 20);
  const { tasks = [], isLoading: isLoadingTasks } = useLoadAllTasks();
  const { taskList = [], isLoading: isLoadingList } = useLoadList();
  const filtered = tasks.filter((task) => {
    if (query === "month") {
      return format(new Date(task.completed_at), "MMM") === title;
    } else {
      return (
        format(new Date(task.completed_at), "MMM dd").replace(/\s/g, "") ===
        title
      );
    }
  });

  return (
    <GeneralTasksLayout
      tasks={filtered}
      taskList={taskList}
      isLoadingList={isLoadingList}
      isLoadingTasks={isLoadingTasks}
      name={title}
      id={"date"}
      query="date"
    />
  );
}

export default CompletedDatePage;
