import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
  });
  return { signup, isPending };
}

export default useSignup;
