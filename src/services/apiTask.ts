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
