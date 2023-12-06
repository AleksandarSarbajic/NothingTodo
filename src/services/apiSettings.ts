import supabase, { Database } from "./supabase";

export async function loadSettings(
  id?: string
): Promise<Database["public"]["Tables"]["settings"]["Row"]> {
  const { data, error } = await supabase
    .from("settings")
    .select()
    .eq("user_id", id)
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
