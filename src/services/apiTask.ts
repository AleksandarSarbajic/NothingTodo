import supabase from "./supabase";
import { Database } from "./supabase";

export async function createUpdateTask({
  newTask,
  id,
}: {
  newTask?:
    | Database["public"]["Tables"]["Tasks"]["Insert"]
    | Database["public"]["Tables"]["Tasks"]["Update"];
  id?: number;
}) {
  const date = new Date().toISOString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from("Tasks");
  if (!id) query = query.insert([{ ...newTask }]);

  if (id) query = query.update({ ...newTask, edited_at: date }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Task could not be updated");

  return data;
}

export async function createDuplicatedTasks({
  newId,
  listId,
}: {
  newId: number;
  listId: number;
}) {
  const { data: oldTasks, error: oldError } = await supabase
    .from("Tasks")
    .select()
    .eq("ListId", listId);

  if (oldError) throw new Error("Task could not be created");

  const newTasksData = oldTasks.map((task) => ({
    ListId: newId,
    task_name: `Copy of ${task.task_name}`,
    category: task.category,
    created_at: task.created_at,
    description: task.description,
    due_date: task.due_date,
    edited_at: task.edited_at,
    end_time: task.end_time,
    start_time: task.start_time,
    user_id: task.user_id,
  }));

  const { data, error } = await supabase
    .from("Tasks")
    .insert(newTasksData)
    .select();

  if (error) throw new Error("Task could not be created");

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

    if (error) throw new Error("Task could not be loaded");

    return data ?? null;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred while fetching the task");
  }
}

interface GetTasksProps {
  filter: {
    method?: string;
    field: string;
    value: string | number | boolean;
  } | null;
}

export async function getTasks({
  filter,
}: GetTasksProps): Promise<Database["public"]["Tables"]["Tasks"]["Row"][]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from("Tasks").select();

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  const { data, error } = await query;

  if (error) throw new Error("Tasks could not be loaded");

  return data as Database["public"]["Tables"]["Tasks"]["Row"][];
}
export async function getAllTasks() {
  const { data, error } = await supabase.from("Tasks").select("*");

  if (error) throw new Error("Tasks could not be loaded");

  return data;
}
interface DeleteProps {
  filter: {
    filterField: string;
    filterValue: string | boolean | number;
  };
}

export async function deleteTasks({ filter }: DeleteProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from("Tasks").delete();

  if (filter.filterValue !== "all")
    query = query.eq(filter.filterField, filter.filterValue);
  if (filter.filterValue === "all") query = query.neq("id", 0);

  const { error } = await query;
  if (error) throw new Error("Tasks could not be deleted");
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

  if (error) throw new Error("Tasks could not be deleted");
}

export async function searchTasks({ query }: { query: string | null }) {
  try {
    const { data, error } = await supabase
      .from("Tasks")
      .select()
      .ilike("task_name", `%${query}%`);

    if (error) throw new Error("Tasks could not be loaded");

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred while fetching tasks");
  }
}
