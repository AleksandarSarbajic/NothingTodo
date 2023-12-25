import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateTask } from "../../services/apiTask";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCreateTask() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: createUpdateTask,
    onSuccess: () => {
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Successfully created a new task");
    },
  });

  return { createTask, isPending };
}

export default useCreateTask;
