import React from "react";
import CheckInBody from "../features/check-in-out/CheckInBody";
import useBooking from "../features/bookings/useBooking";
import Loading from "../UI/Loading";
import { useParams } from "react-router-dom";
import useGetSetting from "../features/settings/useGetSetting";
import useGetSpecificBook from "../features/bookings/useGetSpecificBook";

function CheckIn() {
  const { Bookings, isLoading } = useBooking();
  const { Setting } = useGetSetting();
  const { idBooking } = useParams();

  const { specificBooking, status } = useGetSpecificBook(Bookings, idBooking);

  if (isLoading || !specificBooking) return <Loading />;

  return (
    <>
      <CheckInBody
        Status={status}
        isLoading={isLoading}
        BookFound={specificBooking}
        idBooking={idBooking}
        Setting={Setting}
      />
    </>
  );
}

export default CheckIn;
