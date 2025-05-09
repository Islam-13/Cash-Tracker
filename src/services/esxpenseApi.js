import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ name, email, password, phone }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, phone, avatar: "", limit: "", loctaion: "" } },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Email or password is incorrect");

  return data;
}

export async function SignOut() {
  let { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function createEditExpense(newExpense, id) {
  let query = supabase.from("userData");

  if (!id) query = query.insert([newExpense]);

  if (id) query = query.update({ ...newExpense }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Expenses couldn't be created");

  return data;
}

export async function getExpenses() {
  const { data, error } = await supabase
    .from("userData")
    .select()
    .eq("userId", localStorage.getItem("userId"));

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteExpense(id) {
  const { data, error } = await supabase.from("userData").delete().eq("id", id);

  if (error) throw new Error("Expense couldn't be deleted");

  return data;
}

export async function clearExpenses(id) {
  const { data, error } = await supabase
    .from("userData")
    .delete()
    .eq("userId", id);

  if (error) throw new Error("Expense couldn't be deleted");

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updatePassword(password) {
  const { data, error } = await supabase.auth.updateUser(password);

  if (error) throw new Error("Password couldn't be updated!!");

  return data;
}

export async function updateUserData({ name, avatar, phone, limit }) {
  const { data: userData, error } = await supabase.auth.updateUser({
    data: { name, phone, limit },
  });

  if (error) throw new Error(error.message);
  if (!avatar) return userData;

  // upload avatar image
  const fileName = `avatar-${Math.random()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error("Avatar couldn't be uploaded!!");

  // update avatar image
  const { data, error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updateError) throw new Error("Avatar couldn't be updated!!");

  return data;
}

export async function forgetPassword(email) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
