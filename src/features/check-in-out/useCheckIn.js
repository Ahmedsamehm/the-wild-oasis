import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBookingStatus } from "../../services/BookingsApi";

function useCheckIn() {
  const queryClint = useQueryClient();

  const navigate = useNavigate();

  const {
    mutate: checkInFunc,
    isPending: isCheckLoading,
    error,
  } = useMutation({
    mutationFn: ({ idBooking, breakfast }) => {
      return updateBookingStatus(idBooking, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess: () => {
      toast.success("Checked in successfully");
      queryClint.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/Booking");
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { checkInFunc, isCheckLoading, error };
}

export default useCheckIn;
