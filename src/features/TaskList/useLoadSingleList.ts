import { useQuery } from "@tanstack/react-query";
import { getList } from "../../services/apiTaskList";
import { useLocation } from "react-router-dom";
function useLoadSingleList() {
  const location = useLocation();
  const query = location.pathname.slice(6, 8);

  const {
    data: list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["list", query],
    queryFn: () => getList(query),
  });

  if (error) throw new Error(error.message);

  return { list, isLoading, error };
}

export default useLoadSingleList;
