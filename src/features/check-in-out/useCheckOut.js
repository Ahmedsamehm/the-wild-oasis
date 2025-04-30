import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "../../services/BookingsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckOut() {
  const queryClint = useQueryClient();

  const {
    mutate: CheckOutFunc,
    isPending: CheckOutLoading,
    error: CheckOutErr,
  } = useMutation({
    mutationFn: (idBooking) => {
      return updateBookingStatus(idBooking, {
        status: "checked-out",
      });
    },
    onSuccess: () => {
      toast.success("Checked out successfully");
      queryClint.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  return { CheckOutFunc, CheckOutLoading, CheckOutErr };
}

export default useCheckOut;
