import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSettings } from "../../services/apiSettings";
import { useRef } from "react";

function useCreateSettings() {
  const queryClient = useQueryClient();
  const { mutate: insertSettings, isPending } = useMutation({
    mutationFn: createSettings,
    onSuccess: (settings) => {
      if (settings) {
        queryClient.setQueryData(["settings"], settings);
      }
    },
  });

  const settingsInsertedRef = useRef(false);

  const insertSettingsOnce = (id?: string | undefined) => {
    if (id && !settingsInsertedRef.current) {
      insertSettings(id);
      settingsInsertedRef.current = true;
    }
  };

  return { insertSettings: insertSettingsOnce, isPending };
}

export default useCreateSettings;
