import { useQuery } from "@tanstack/react-query";
import { getList } from "../../services/apiTaskList";
import { useLocation } from "react-router-dom";
function useLoadSingleList(id?: string | undefined) {
  const location = useLocation();
  const equal = location.pathname.includes("dashboard");
  const query = equal ? id : location.pathname.slice(6, 10);

  const {
    data: list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["list", query],
    queryFn: () => getList(query),
  });

  if (error) throw new Error(error.message);

  return { list, isLoading, error, equal };
}

export default useLoadSingleList;
