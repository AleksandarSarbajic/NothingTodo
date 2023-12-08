import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detectCreateSettings } from "../../services/apiSettings";
function useDetectCreateSettings() {
  const queryClient = useQueryClient();
  const { mutate: insertSettings, isPending } = useMutation({
    mutationFn: detectCreateSettings,
    onSuccess: (settings) => {
      queryClient.setQueryData(["settings"], settings);
    },
  });

  return { insertSettings, isPending };
}

export default useDetectCreateSettings;
