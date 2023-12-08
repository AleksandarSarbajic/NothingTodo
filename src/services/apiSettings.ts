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
export async function createSettings(id: string | undefined) {
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
  id?: string;
}

export async function updateSettings({ updatedSettings, id }: Settings) {
  const { data, error } = await supabase
    .from("settings")
    .update({ ...updatedSettings })
    .eq("user_id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
