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
export async function getAllTasks() {
  const { data, error } = await supabase.from("Tasks").select("*");

  if (error) {
    console.error(error);
    throw new Error("Tasks could not be loaded");
  }

  return data;
}
export async function getTasks(id: number) {
  const { data, error } = await supabase
    .from("Tasks")
    .select()
    .eq("ListId", id);

  if (error) {
    console.error(error);
    throw new Error("Tasks could not be loaded");
  }

  return data;
}
export async function deleteTask(id: number) {
  const { error } = await supabase.from("Tasks").delete().eq("id", id);

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
