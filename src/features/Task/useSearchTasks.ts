import { useQuery } from "@tanstack/react-query";
import { searchTasks } from "../../services/apiTask";
import { useSearchParams } from "react-router-dom";

function useSearchTasks() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchTasks", searchQuery],
    queryFn: () => searchTasks({ query: searchQuery }),
    enabled: !!searchQuery,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { searchResults, isLoading, error };
}

export default useSearchTasks;
