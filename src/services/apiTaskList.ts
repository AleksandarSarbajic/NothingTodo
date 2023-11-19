import supabase from "./supabase";

export async function addEditList(listName: string) {
  const { data, error } = await supabase
    .from("Task List")
    .insert([{ list_name: listName }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("List could not be created");
  }

  return data;
}

export async function getList() {
  const { data, error } = await supabase.from("Task List").select("*");

  if (error) {
    console.error(error);
    throw new Error("List could not be loaded");
  }

  return data;
}
