import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";
import { getBooking } from "../../services/BookingsApi";

function useBooking() {
  const [searchParams] = useSearchParams();
  const queryClint = useQueryClient();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    data: { data: Bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", currentPage],
    queryFn: () => getBooking(currentPage),
    staleTime: 20000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (currentPage < count) {
    queryClint.prefetchQuery({
      queryKey: ["bookings", currentPage + 1],
      queryFn: () => getBooking(currentPage + 1),
      staleTime: 20000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });
  } else {
    queryClint.prefetchQuery({
      queryKey: ["bookings", currentPage - 1],
      queryFn: () => getBooking(currentPage - 1),
      staleTime: 20000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });
  }

  return { Bookings, count, isLoading };
}

export default useBooking;
