import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEditList } from "../../services/apiTaskList";
import toast from "react-hot-toast";
function useCreateList() {
  const queryClient = useQueryClient();

  const { mutate: createList, isPending } = useMutation({
    mutationFn: addEditList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task list"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { createList, isPending };
}

export default useCreateList;