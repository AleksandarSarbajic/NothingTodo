import { useQuery } from "@tanstack/react-query";

import { getAllTasks } from "../../services/apiTask";

function useLoadAllTasks() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });

  if (error) throw new Error(error.message);

  return { tasks, isLoading, error };
}

export default useLoadAllTasks;
