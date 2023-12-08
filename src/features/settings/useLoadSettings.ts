import { useQuery } from "@tanstack/react-query";
import { loadSettings } from "../../services/apiSettings";

function useLoadSettings(id?: string) {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings", id],
    queryFn: loadSettings,
  });

  if (error) throw new Error(error.message);

  return { settings, isLoading, error };
}

export default useLoadSettings;
