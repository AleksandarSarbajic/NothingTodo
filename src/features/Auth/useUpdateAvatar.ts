import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateUserAvatar } from "../../services/apiAuth";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const { mutate: updateAvatar, isPending: isUpdating } = useMutation({
    mutationFn: updateUserAvatar,
    onMutate: () => {
      toast.loading("Updating avatar...");
    },
    onSuccess: ({ user }) => {
      toast.dismiss();
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateAvatar, isUpdating };
}
