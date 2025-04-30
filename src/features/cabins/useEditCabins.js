import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EditCabinFun } from "../../services/CabinsApi";
import toast from "react-hot-toast";

function useEditCabins() {
  const queryClient = useQueryClient();
  const { mutate: EditCabin, isPending: isEditLoading } = useMutation({
    mutationFn: (cabinData) => EditCabinFun(cabinData, cabinData.id),
    onSuccess: () => {
      toast.success("Cabin updated successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update cabin");
    },
  });
  return { EditCabin, isEditLoading };
}

export default useEditCabins;
