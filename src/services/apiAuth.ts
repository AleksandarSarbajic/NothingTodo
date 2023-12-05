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

interface Update {
  password?: string;
  userName?: string;
  avatar?: File;
  data?: { userName: string };
}

export async function updateCurrentUser({ password, userName }: Update) {
  const updateData: Update = {};

  if (password) {
    updateData.password = password;
  }

  if (userName) {
    updateData.data = { userName };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateUserAvatar({ avatar }: Update) {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${self.crypto.randomUUID()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
