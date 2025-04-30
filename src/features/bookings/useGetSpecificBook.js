import { useState, useEffect } from "react";

function useGetSpecificBook(Bookings, idBooking) {
  const [specificBooking, setSpecificBooking] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    if (Bookings && idBooking) {
      const foundBooking = Bookings.find(
        (book) => book.id === Number(idBooking)
      );
      setSpecificBooking(foundBooking);
      setStatus(foundBooking?.status || "unconfirmed");
    }
    return () => {};
  }, [Bookings, idBooking]);

  return { specificBooking, status };
}

export default useGetSpecificBook;
