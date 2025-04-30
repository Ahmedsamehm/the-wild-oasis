import React from "react";
import Loading from "../../UI/Loading";

function BookingDetailsBody({ BookFound, isLoading }) {
  if (!BookFound) return <Loading />;
  const {
    id,
    numNights,
    cabinId,
    startDate,
    endDate,
    guestID,
    observations,
    hasBreakfast,
    totalPrice,
    created_at,
    isPaid,
  } = BookFound;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-base-content text-2xl font-bold">
            booking #{id}
          </h1>
          <div>
            {/* flex justify-around items-center bg-base-300 p-5 rounded-t-xl */}
            <header className="bg-base-300 ">
              <div className="flex justify-between p-5 items-center ">
                <span className="text-sm md:text-lg text-center">
                  {numNights} nights in Cabin {cabinId}
                </span>

                <div className="text-sm md:text-md flex flex-col text-center ">
                  <span className="">
                    In:
                    {startDate
                      ? new Date(startDate).toLocaleDateString("en-GB")
                      : "N/A"}
                  </span>
                  <span className="mx-auto">
                    Out:
                    {endDate
                      ? new Date(endDate).toLocaleDateString("en-GB")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </header>
            <div className="p-5 bg-neutral rounded-b-xl space-y-3 flex flex-col flex-wrap overflow-auto ">
              <ul className="flex gap-3">
                <li>
                  <p>Guest ID: {guestID}</p>
                </li>
              </ul>
              <div>
                <p className="text-sm">
                  Observations: {observations || "None"}
                </p>
                <p className="text-sm">
                  Breakfast included? : {hasBreakfast ? "Yes" : "No"}
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-around items-center p-5 bg-primary rounded-xl text-base-300 gap-4 flex-nowrap   ">
                <span className="whitespace-nowrap">
                  Total price: ${totalPrice || "N/A"}
                </span>

                <span
                  className={`badge ${isPaid ? "badge-soft badge-success" : "badge-soft badge-error"} shrink-0 md:shrink  p-3 `}
                >
                  {isPaid === true ? "Paid" : "Will pay on arrival"}
                </span>
              </div>
              <p className="ml-auto">
                Booked{" "}
                {created_at
                  ? new Date(created_at).toLocaleString("en-GB")
                  : "N/A"}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BookingDetailsBody;
