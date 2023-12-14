import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDuplicatedTasks as apiCreateTasks } from "../../services/apiTask";
import { toast } from "react-hot-toast";

function useCreateTasks() {
  const queryClient = useQueryClient();

  const { mutate: createTasks, isPending } = useMutation({
    mutationFn: apiCreateTasks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Successfully created a new task");
    },
  });

  return { createTasks, isPending };
}

export default useCreateTasks;
