import { useQuery } from "@tanstack/react-query";

import { getTask } from "../../services/apiTask";
import { useSearchParams } from "react-router-dom";

function useLoadTask() {
  const [useParams] = useSearchParams();

  const id = useParams.get("task");

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(Number(id)),
  });

  if (error) throw new Error(error.message);

  return { task, isLoading, error };
}

export default useLoadTask;
