import { useLocation, useSearchParams } from "react-router-dom";
import useLoadList from "../features/TaskList/useLoadList";
import GeneralTasksLayout from "../features/General/GeneralTasksLayout";
import { format } from "date-fns";
import useLoadTasks from "../features/Task/useLoadTasksV2";

function CompletedDatePage() {
  const { pathname } = useLocation();
  const [useParams] = useSearchParams();
  const query = useParams.get("date");
  const title = pathname.slice(11, 20);
  const filter = {
    filterField: "",
    filterValue: "all",
  };
  const { tasks = [], isLoading: isLoadingTasks } = useLoadTasks(filter);

  const { taskList = [], isLoading: isLoadingList } = useLoadList();
  const filtered = tasks.filter((task) => {
    const completedAt = task.completed_at;

    if (completedAt !== null) {
      if (query === "month") {
        return format(new Date(completedAt), "MMM") === title;
      } else {
        return (
          format(new Date(completedAt), "MMM dd").replace(/\s/g, "") === title
        );
      }
    }

    return false;
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
      filter={filter}
    />
  );
}

export default CompletedDatePage;
