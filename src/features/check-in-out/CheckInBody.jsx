import React from "react";
import Loading from "../../UI/Loading";
import BookingDetailsBody from "../bookings/BookingDetailsBody";
import { useNavigate } from "react-router-dom";
import useCheckInActions from "./useCheckInActions";

import useDeleteBook from "../bookings/useDeleteBook";

function CheckInBody({ BookFound, Status, idBooking, Setting, isLoading }) {
  const navigate = useNavigate();
  const { guestID, id } = BookFound || {};
  const { DeleteBook, DeleteLoading } = useDeleteBook();
  const {
    payConfirm,
    breakfastConfirm,
    isCheckLoading,
    CheckOutLoading,
    totalBreakfast,
    handlePay,
    handleBreakfast,
    handleCheckIn,
    handleCheckOut,
  } = useCheckInActions(BookFound, idBooking, Setting);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <BookingDetailsBody BookFound={BookFound} isLoading={isLoading} />

          {Status === "unconfirmed" ? (
            <>
              <div className="p-5 bg-neutral mt-4 rounded-xl">
                <div>
                  <input
                    type="checkbox"
                    onChange={handleBreakfast}
                    className="checkbox"
                  />
                  <span>
                    Want to add breakfast for ${totalBreakfast || "N/A"}
                  </span>
                </div>
              </div>
              <div className="p-5 bg-neutral mt-4 rounded-xl">
                <div>
                  <input
                    type="checkbox"
                    onChange={handlePay}
                    disabled={payConfirm}
                    className="checkbox"
                  />
                  <span>
                    I confirm that {guestID} has paid the total amount of $
                    {BookFound?.totalPrice}
                  </span>
                  {breakfastConfirm ? (
                    <span>
                      ({BookFound?.totalPrice}+{totalBreakfast}) = $
                      {BookFound?.totalPrice + totalBreakfast}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ) : null}

          <div className="flex justify-end mt-3 gap-2">
            {Status === "checked-out" && (
              <button
                disabled={DeleteLoading}
                onClick={() => {
                  DeleteBook(id);
                }}
                className="btn btn-error "
              >
                {DeleteLoading ? (
                  <span className="flex items-center gap-2">
                    <Loading /> Deleting...
                  </span>
                ) : (
                  `Delete ${id}`
                )}
              </button>
            )}
            {Status === "unconfirmed" && (
              <>
                <button
                  onClick={handleCheckIn}
                  className="btn btn-primary"
                  disabled={!payConfirm || isCheckLoading}
                >
                  {isCheckLoading ? (
                    <span className="flex items-center gap-2">
                      <Loading /> Loading...
                    </span>
                  ) : (
                    `Check-in ${id}`
                  )}
                </button>
              </>
            )}
            {Status === "checked-in" && (
              <>
                <button
                  onClick={handleCheckOut}
                  className="btn btn-primary"
                  disabled={CheckOutLoading}
                >
                  {CheckOutLoading ? (
                    <span className="flex items-center gap-2">
                      <Loading /> Loading...
                    </span>
                  ) : (
                    `Check-out ${id}`
                  )}
                </button>
                <button
                  onClick={() => {
                    DeleteBook(id);
                  }}
                  className="btn btn-error"
                >
                  {DeleteLoading ? (
                    <span className="flex items-center gap-2">
                      <Loading /> Deleting...
                    </span>
                  ) : (
                    `Delete ${id}`
                  )}
                </button>
              </>
            )}

            <button
              onClick={() => navigate("/Booking")}
              className="btn btn-neutral"
            >
              Back
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CheckInBody;
