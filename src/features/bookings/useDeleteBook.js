import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking } from "../../services/BookingsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBook() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: DeleteBook,
    isPending: DeleteLoading,
    isError: DeletingErr,
  } = useMutation({
    mutationFn: (id) => {
      return deleteBooking(id);
    },
    onSuccess: () => {
      navigate("/Booking");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      toast.success("Booking deleted successfully" + id);
    },
    onError: (err) => {
      toast.error(err.message, id);
    },
  });

  return { DeleteBook, DeleteLoading, DeletingErr };
}

export default useDeleteBook;
