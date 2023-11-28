import { useQuery } from "@tanstack/react-query";

import { getTasks } from "../../services/apiTask";
import { useLocation } from "react-router-dom";

function useLoadTasks() {
  const location = useLocation();
  const query = location.pathname.slice(6, 8);

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", query],
    queryFn: () => getTasks(+query),
  });

  if (error) throw new Error(error.message);

  return { tasks, isLoading, error };
}

export default useLoadTasks;
