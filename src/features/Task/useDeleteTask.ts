import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTask as deleteTaskApi } from "../../services/apiTask";
import { toast } from "react-hot-toast";

function useDeleteTask() {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Successfully deleted a task");
    },
  });
  return { deleteTask, isPending };
}

export default useDeleteTask;
