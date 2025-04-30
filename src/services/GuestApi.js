import supabase from "./subabase";

async function GuestApi() {
  const { data: Guest, error } = await supabase
    .from("Guest")
    .select("fullName,id");

  if (error) {
    console.error(error);
    throw new error("Guest could not be loaded");
  }
  return Guest;
}

export default GuestApi;
