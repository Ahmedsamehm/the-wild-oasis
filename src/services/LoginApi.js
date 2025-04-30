import supabase from "./subabase";

const LoginApi = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const GetCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

const Logout = async () => {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};
export { LoginApi, GetCurrentUser, Logout };
