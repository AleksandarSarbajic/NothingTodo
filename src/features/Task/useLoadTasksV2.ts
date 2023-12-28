import { useQuery } from "@tanstack/react-query";

import { getTasks } from "../../services/apiTask";
import { useLocation } from "react-router-dom";

function useLoadTasks({
  filterValue,
  filterField,
}: {
  filterValue: string | boolean;
  filterField: string;
}) {
  const location = useLocation();
  const query = location.pathname.slice(6, 11);

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : !Number.isNaN(+query)
      ? { field: "ListId", value: +query }
      : { field: filterField, value: filterValue };

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", query, filter],
    queryFn: () => getTasks({ filter }),
  });

  if (error) throw new Error(error.message);

  return { tasks, isLoading, error };
}

export default useLoadTasks;
