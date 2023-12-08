import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detectCreateSettings } from "../../services/apiSettings";
import { useNavigate } from "react-router-dom";
function useDetectCreateSettings() {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: insertSettings, isPending } = useMutation({
    mutationFn: detectCreateSettings,
    onSuccess: (settings) => {
      queryClient.setQueryData(["settings"], settings);
      navigation("/dashboard");
    },
  });

  return { insertSettings, isPending };
}

export default useDetectCreateSettings;
