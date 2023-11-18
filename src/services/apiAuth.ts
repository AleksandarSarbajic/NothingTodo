import supabase, { supabaseUrl } from "./supabase";

interface Credidentials {
  userName?: string;
  email: string;
  password: string;
}

export async function signUp({ userName, email, password }: Credidentials) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { userName, avatar: "" },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }: Credidentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
