import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookingAfterDate } from "../../services/BookingsApi";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  // def value
  const numDay = !searchParams.get("Last")
    ? 7
    : Number(searchParams.get("Last"));

  const QueryDate = subDays(new Date(), numDay).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryFn: () => getBookingAfterDate(QueryDate, numDay),
    queryKey: ["Stays", `Last-${numDay}`],
    staleTime: 20000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const confirmedBookings = stays?.filter(
    (stay) => stay?.status === "checked-in" || stay?.status === "checked-out"
  );

  return { Stays: confirmedBookings, isLoading, numDay };
}

export default useRecentStays;
