import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return { updateSetting, isPending };
}

export default useUpdateSettings;
