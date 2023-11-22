import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteList as deleteListApi } from "../../services/apiTaskList";
import { toast } from "react-hot-toast";

function useDeleteList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteList, isPending } = useMutation({
    mutationFn: deleteListApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task list"] });
      toast.success("Successfully deleted a list");
      navigate("/dashboard", { replace: true });
    },
  });
  return { deleteList, isPending };
}

export default useDeleteList;
