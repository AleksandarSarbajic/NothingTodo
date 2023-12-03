import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../../services/apiTask";
function useLoadFavorites() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", "favorites"],
    queryFn: getFavorites,
  });

  if (error) throw new Error(error.message);

  return { tasks, isLoading, error };
}

export default useLoadFavorites;
