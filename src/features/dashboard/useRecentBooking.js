import { useSearchParams } from "react-router-dom";
import {
  eachDayOfInterval,
  isWithinInterval,
  max,
  min,
  parseISO,
  subDays,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getBookingAfterDate } from "../../services/BookingsApi";

function useRecentBooking() {
  const [searchParams] = useSearchParams();
  // def value
  const numDay = !searchParams.get("Last")
    ? 7
    : Number(searchParams.get("Last"));

  const QueryDate = subDays(new Date(), numDay).toISOString();

  const { data: bookingDate, isLoading } = useQuery({
    queryFn: () => getBookingAfterDate(QueryDate, numDay),
    queryKey: ["Bookings", `Last-${numDay}`],
    staleTime: 20000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (!bookingDate?.length)
    return { bookingDate, isLoading, filteredDates: [] };
  const today = new Date();
  const startDate = subDays(today, numDay);
  const filteredDates = bookingDate
    .map((booking) => parseISO(booking.created_at))
    .filter((date) => isWithinInterval(date, { start: startDate, end: today }));

  return { bookingDate, isLoading, filteredDates };
}

export default useRecentBooking;
