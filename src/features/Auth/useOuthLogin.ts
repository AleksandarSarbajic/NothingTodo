import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { outhLogin } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useOuthLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: outhLogin,
    onSuccess: (user) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["user"], (user as any).user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
      console.error("ERROR", err);
    },
  });

  return { login, isPending };
}
