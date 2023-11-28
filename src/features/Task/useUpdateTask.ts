import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask as updateTaskApi } from "../../services/apiTask";
import { toast } from "react-hot-toast";

function useUpdateTask(id?: number) {
  const queryClient = useQueryClient();
  const { mutate: updateTask, isPending } = useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error(`Coudn't update task #${id}`);
    },
  });
  return { updateTask, isPending };
}

export default useUpdateTask;
