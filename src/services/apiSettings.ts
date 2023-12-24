import supabase, { Database } from "./supabase";

export async function loadSettings(): Promise<
  Database["public"]["Tables"]["settings"]["Row"]
> {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);

  const { data, error } = await supabase
    .from("settings")
    .select()
    .eq("user_id", userData.user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}
export async function createSettings(id?: string | undefined) {
  if (id === undefined) return null;

  const { data: userData } = await supabase
    .from("settings")
    .select()
    .eq("user_id", id);

  if (userData && userData.length > 0) {
    return null;
  }

  const { data, error } = await supabase
    .from("settings")
    .insert([{ created_at: new Date().toISOString(), user_id: id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be created");
  }

  return data;
}

interface Settings {
  updatedSettings: Database["public"]["Tables"]["settings"]["Update"];
}

export async function updateSettings({ updatedSettings }: Settings) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error(userError);
    throw new Error("Could not get user");
  }

  const { data, error } = await supabase
    .from("settings")
    .update({ ...updatedSettings })
    .eq("user_id", userData.user.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
