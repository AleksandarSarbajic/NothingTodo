import { useQuery } from "@tanstack/react-query";
import { getList } from "../../services/apiTaskList";
function useLoadList() {
  const {
    data: taskList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task list"],
    queryFn: getList,
  });

  if (error) throw new Error(error.message);

  return { taskList, isLoading, error };
}

export default useLoadList;
