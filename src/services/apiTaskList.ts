import supabase from "./supabase";

export async function addList(listName: string) {
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

export async function updateList({
  newList,
  id,
}: {
  newList?: { list_name: string };
  id?: number;
}) {
  const date = new Date().toISOString();

  const { data, error } = await supabase
    .from("Task List")
    .update({ ...newList, edited_at: date })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("List could not be updated");
  }

  return data;
}
export async function deleteList(id: number) {
  const { error } = await supabase.from("Task List").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("List could not be updated");
  }
}

export async function getAllLists() {
  const { data, error } = await supabase.from("Task List").select("*");

  if (error) {
    console.error(error);
    throw new Error("List could not be loaded");
  }

  return data;
}
export async function getList(query: string) {
  const { data, error } = await supabase
    .from("Task List")
    .select()
    .eq("id", query);

  if (error) {
    console.error(error);
    throw new Error("List could not be loaded");
  }

  return data;
}
