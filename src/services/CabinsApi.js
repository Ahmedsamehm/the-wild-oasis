import supabase, { supabaseUrl } from "./subabase";

const getCabins = async () => {
  const { data, error } = await supabase
    .from("Cabins")
    .select("Name,id,image,maxCapacity,regularPrice,discount,description");



  if (error) {
    console.error(error);
    throw new error("Cabins could not be loaded");
  } else {
    return data;
  }
};

const AddCabinFun = async (newCabin) => {
  const imageName = `${Math.random()}=${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;
  const { data, error } = await supabase
    .from("Cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    throw new Error(error?.message);
  }


  // img upload to db
  const { error: storageError } = await supabase.storage
    .from("Cabins")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("Cabins").delete().eq("id", data.id);
    console.log("err in uploading img");
    throw new Error("err in uploading img ");
  }
  return data;
};
const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new error("Cabin could not be Deleted");
  } else {
    return data;
  }
};
const EditCabinFun = async (newCabin, id) => {
  let imagePath = newCabin.image; // Could be a URL (old image) or File (new image)

  if (newCabin.image instanceof File) {
    // New image uploaded
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      ""
    );
    imagePath = `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("Cabins")
      .upload(imageName, newCabin.image);

    if (storageError) {
      throw new Error("Failed to upload the new cabin image");
    }
  }

  // Prepare the update data, exclude image if it’s not a new File
  const updateData = { ...newCabin };
  if (!(newCabin.image instanceof File)) {
    delete updateData.image; // Keep the old image in the database
  } else {
    updateData.image = imagePath; // Use the new image path
  }

  const { data, error } = await supabase
    .from("Cabins")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Failed to update cabin");
  }

  return data;
};
const updateCabinData = async ({ newCabinData, id }) => {
  const { data, error } = await supabase
    .from("Cabins")
    .update({ other_column: newCabinData })
    .eq("some_column", id)
    .select();
  if (error) {
    console.error(error);
    throw new error("Cant Update Cabin");
  } else {
    return data;
  }
};

export { getCabins, deleteCabin, AddCabinFun, updateCabinData, EditCabinFun };
