import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTasks as deleteTasksApi } from "../../services/apiTask";
import { toast } from "react-hot-toast";

function useDeleteTask() {
  const queryClient = useQueryClient();
  const { mutate: deleteTasks, isPending } = useMutation({
    mutationFn: deleteTasksApi,
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("Successfully deleted a tasks");
    },
  });
  return { deleteTasks, isPending };
}

export default useDeleteTask;
