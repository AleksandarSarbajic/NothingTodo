import { useQuery } from "@tanstack/react-query";
import { getList } from "../../services/apiTaskList";
import { useLocation } from "react-router-dom";
function useLoadSingleList(id?: string | undefined) {
  const location = useLocation();
  const categoriesEqual = location.pathname.includes("dashboard");
  const categoriesQuery = id ? id : location.pathname.slice(6, 11);
  const plannedEqual = location.pathname.includes("planned");

  const {
    data: list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["list", categoriesQuery],
    queryFn: () => getList(categoriesQuery),
  });

  if (error) throw new Error(error.message);

  return { list, isLoading, error, equal: categoriesEqual, plannedEqual };
}

export default useLoadSingleList;
