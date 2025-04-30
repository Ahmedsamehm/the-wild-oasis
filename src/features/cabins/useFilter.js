import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function useFilter(cabins) {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("Discount") || "All";
  const sortBy = searchParams.get("SortBy") || "startDate-asc";

  // Filter cabins

  let filteredCabins;
  if (filterValue === "All") filteredCabins = cabins;
  if (filterValue === "No-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "With-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);

  // Sort cabins
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  return { sortedCabins };
}

function useBookingFilter(bookings) {
  const [searchParams] = useSearchParams();

  const sortedBookings = useMemo(() => {
    // Filter
    const filterValue = searchParams.get("Status") || "all";
    const sortBy = searchParams.get("SortBy") || "startDate-desc";

    // Filter bookings
    let filteredBookings = bookings;
    if (filterValue === "checked-out")
      filteredBookings = bookings.filter(
        (booking) => booking.status === "checked-out"
      );
    if (filterValue === "checked-in")
      filteredBookings = bookings.filter(
        (booking) => booking.status === "checked-in"
      );
    if (filterValue === "unconfirmed")
      filteredBookings = bookings.filter(
        (booking) => booking.status === "unconfirmed"
      );

    // Sort bookings
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;

    return [...filteredBookings].sort((a, b) => {
      if (field === "startDate") {
        return (new Date(a.startDate) - new Date(b.startDate)) * modifier;
      }
      if (field === "totalPrice") {
        return (a.totalPrice - b.totalPrice) * modifier;
      }

      return 0;
    });
  }, [bookings, searchParams]);

  return sortedBookings;
}

export { useBookingFilter, useFilter };
