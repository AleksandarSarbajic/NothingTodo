import supabase from "./supabase";
import { Database } from "./supabase";

export async function createTask(
  newTask: Database["public"]["Tables"]["Tasks"]["Insert"]
) {
  const { data, error } = await supabase
    .from("Tasks")
    .insert([{ ...newTask }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Task could not be created");
  }

  return data;
}
export async function getTask(
  id: number | null
): Promise<Database["public"]["Tables"]["Tasks"]["Row"] | null> {
  if (id === 0 || typeof id !== "number" || id < 0) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Task could not be loaded");
    }

    return data ?? null;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred while fetching the task");
  }
}

export async function getAllTasks() {
  const { data, error } = await supabase.from("Tasks").select("*");

  if (error) {
    console.error(error);
    throw new Error("Tasks could not be loaded");
  }

  return data;
}
export async function getFavorites() {
  const { data, error } = await supabase
    .from("Tasks")
    .select()
    .eq("priority", true);

  if (error) {
    console.error(error);
    throw new Error("Favorite Tasks could not be loaded");
  }

  return data;
}
export async function getTasks(
  id: number
): Promise<Database["public"]["Tables"]["Tasks"]["Row"][]> {
  const { data, error } = await supabase
    .from("Tasks")
    .select()
    .eq("ListId", id);

  if (error) {
    console.error(error);
    throw new Error("Tasks could not be loaded");
  }

  return data as Database["public"]["Tables"]["Tasks"]["Row"][];
}
export async function deleteTask({
  id,
  ListId,
}: {
  id?: number | null;
  ListId?: number | null;
}) {
  const { error } = await supabase
    .from("Tasks")
    .delete()
    .eq(id ? "id" : "ListId", id ? id : ListId);

  if (error) {
    console.error(error);
    throw new Error("Tasks could not be deleted");
  }
}

export async function updateTask({
  newTask,
  id,
}: {
  newTask?: Database["public"]["Tables"]["Tasks"]["Update"];
  id?: number;
}) {
  const date = new Date().toISOString();

  const { data, error } = await supabase
    .from("Tasks")
    .update({ ...newTask, edited_at: date })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Task could not be updated");
  }

  return data;
}
