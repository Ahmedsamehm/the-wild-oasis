import React from "react";
import useBooking from "../features/bookings/useBooking";
import BookingDetailsBody from "../features/bookings/BookingDetailsBody";
import Loading from "../UI/Loading";
import { useNavigate, useParams } from "react-router-dom";
import useGetSpecificBook from "../features/bookings/useGetSpecificBook";

function BookingDetails() {
  const { Bookings, isLoading } = useBooking();

  const { idBooking } = useParams();

  const navigate = useNavigate();

  const { specificBooking, status } = useGetSpecificBook(Bookings, idBooking);

  if (isLoading) return <Loading />;
  return (
    <>
      <BookingDetailsBody BookFound={specificBooking} isLoading={isLoading} />

      <div className="flex justify-end gap-x-2">
        {status === "unconfirmed" && (
          <button
            onClick={() => {
              navigate(`/CheckIn/${idBooking}`);
            }}
            className="btn btn-primary"
          >
            CheckIn
          </button>
        )}
        <button className="btn btn-error">Delete</button>
        <button onClick={() => navigate(-1)} className="btn btn-neutral">
          Back
        </button>
      </div>
    </>
  );
}

export default BookingDetails;
