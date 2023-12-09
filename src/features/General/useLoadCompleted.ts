import { useQuery } from "@tanstack/react-query";
import { getCompleted } from "../../services/apiTask";

function useLoadCompleted() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", "completed"],
    queryFn: getCompleted,
  });

  if (error) throw new Error(error.message);

  return { tasks, isLoading, error };
}

export default useLoadCompleted;
