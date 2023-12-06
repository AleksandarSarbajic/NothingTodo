import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSettings } from "../../services/apiSettings";

function useCreateSettings() {
  const queryCliet = useQueryClient();
  const { mutate: insertSettings, isPending } = useMutation({
    mutationFn: createSettings,
    onSuccess: (settings) => {
      queryCliet.setQueryData(["settings"], settings);
    },
  });

  return { insertSettings, isPending };
}

export default useCreateSettings;
