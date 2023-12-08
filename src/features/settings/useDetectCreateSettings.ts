import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detectCreateSettings } from "../../services/apiSettings";
function useDetectCreateSettings() {
  const queryCliet = useQueryClient();
  const { mutate: insertSettings, isPending } = useMutation({
    mutationFn: detectCreateSettings,
    onSuccess: (settings) => {
      queryCliet.setQueryData(["settings"], settings);
    },
  });

  return { insertSettings, isPending };
}

export default useDetectCreateSettings;
