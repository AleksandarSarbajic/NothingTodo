import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateList as updateListApi } from "../../services/apiTaskList";
import { toast } from "react-hot-toast";

function useUpdateList(id?: number) {
  const queryClient = useQueryClient();
  const { mutate: updateList, isPending } = useMutation({
    mutationFn: updateListApi,
    onSuccess: () => {
      toast.success(`List #${id} successfully updated`);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error(`Coudn't update list #${id}`);
    },
  });
  return { updateList, isPending };
}

export default useUpdateList;
