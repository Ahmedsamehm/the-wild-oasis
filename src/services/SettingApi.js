import supabase from "./subabase";

const getSetting = async () => {
  const { data, error } = await supabase.from("Settings").select("*");

  if (error) {
    console.error(error);
    throw new error("Setting could not be loaded");
  } else {
    return data;
  }
};

const upDateSetting = async (newSetting) => {
  const { data, error } = await supabase
    .from("Settings")
    .update(newSetting)
    .eq("id", 1)
    .select();
  if (error) {
    console.error(error);
    throw new error("Setting could not be update");
  } else {
    console.log(data);

    return data;
  }
};
export { getSetting, upDateSetting };
