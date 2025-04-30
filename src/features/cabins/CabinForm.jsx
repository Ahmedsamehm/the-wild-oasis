import { useForm } from "react-hook-form";
import useAddCabins from "./useAddCabins";
import useEditCabins from "./useEditCabins";

import Loading from "../../UI/Loading";

function CabinForm({ setIsOpen, cabinToEdit }) {
  const { AddCabins, isAddLoading } = useAddCabins();
  const { EditCabin, isEditLoading } = useEditCabins();
  const isEditSession = Boolean(cabinToEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: cabinToEdit || {},
    image: undefined, // Clear image field in edit mode
  });

  const isLoading = isAddLoading || isEditLoading;
  if (isLoading) return <Loading />;

  const onSubmit = (data) => {
    // Only include image if it's a new file, otherwise keep the old one in edit mode
    const image =
      data.image?.[0] instanceof File
        ? data.image[0]
        : isEditSession
          ? cabinToEdit?.image
          : "";

    if (isEditSession) {
      // Include id for edit mode
      EditCabin({
        ...data,
        image,
        id: cabinToEdit.id,
      });
    } else {
      AddCabins({ ...data, image });
    }

    // Close the modal after submission
    setIsOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-base-200 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-base-content text-center">
        {isEditSession ? "Edit Cabin" : "Create New Cabin"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-base-content mb-2">Cabin name</label>
          <input
            type="text"
            {...register("Name", { required: "Cabin name is required" })}
            className="w-full p-3 rounded-lg bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter cabin name"
          />
          {errors.Name && (
            <p className="text-error text-sm mt-1">{errors.Name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-base-content mb-2">
            Maximum capacity
          </label>
          <input
            type="number"
            {...register("maxCapacity", {
              required: "Maximum capacity is required",
              min: { value: 1, message: "Capacity must be at least 1" },
            })}
            className="w-full p-3 rounded-lg bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter maximum capacity"
          />
          {errors.maxCapacity && (
            <p className="text-error text-sm mt-1">
              {errors.maxCapacity.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-base-content mb-2">Regular price</label>
          <input
            type="number"
            {...register("regularPrice", {
              required: "Regular price is required",
              min: { value: 0, message: "Price cannot be negative" },
            })}
            className="w-full p-3 rounded-lg bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter regular price"
          />
          {errors.regularPrice && (
            <p className="text-error text-sm mt-1">
              {errors.regularPrice.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-base-content mb-2">Discount</label>
          <input
            type="number"
            {...register("discount", {
              required: "Discount is required",
              min: { value: 0, message: "Discount cannot be negative" },
            })}
            className="w-full p-3 rounded-lg bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter discount"
            defaultValue={0}
          />
          {errors.discount && (
            <p className="text-error text-sm mt-1">{errors.discount.message}</p>
          )}
        </div>

        <div className="mb-4 md:col-span-2">
          <label className="block text-base-content mb-2">
            Description for website
          </label>

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full p-3 rounded-lg bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-6 md:col-span-2">
          <label className="block text-base-content mb-2">Cabin image</label>
          {isEditSession && cabinToEdit.image && (
            <img
              src={cabinToEdit.image}
              alt="Current cabin"
              className="w-24 h-24 mb-2 rounded-lg"
            />
          )}
          <input
            type="file"
            {...register("image")}
            className="w-full p-3 rounded-lg bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-content hover:file:bg-primary-focus"
            accept="image/*"
          />
          <p className="text-base-content text-sm mt-1">
            {isEditSession
              ? "Upload a new image to replace the current one (optional)"
              : "You should use an image to create the cabin"}
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6 md:col-span-2">
        <button
          type="button"
          className="btn btn-neutral"
          onClick={() => setIsOpen(false)}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button disabled={isLoading} type="submit" className="btn btn-primary">
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              {isEditSession ? "Updating..." : "Adding..."}
            </>
          ) : isEditSession ? (
            "Update Cabin"
          ) : (
            "Add Cabin"
          )}
        </button>
      </div>
    </form>
  );
}

export default CabinForm;
