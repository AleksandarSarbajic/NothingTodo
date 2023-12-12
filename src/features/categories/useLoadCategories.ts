import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/apiTask";

function useLoadCategories({ query }: { query: string | null }) {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", query],
    queryFn: () => getCategories({ query }),
  });

  if (error) throw new Error(error.message);

  return { tasks, isLoading, error };
}

export default useLoadCategories;
