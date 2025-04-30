import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import useGuest from "./useGuest";
import Loading from "../../UI/Loading";
import useBooking from "../bookings/useBooking";
import Header from "../../UI/Header";

function TodayCheckList() {
  const navigate = useNavigate();
  const { Bookings } = useBooking();
  const { GetGuest, isGuestLoading } = useGuest();
  if (isGuestLoading || !Bookings) return <Loading />;

  // Combine data from bookings and guests

  const combineData = Bookings?.map((book) => {
    const guest = GetGuest?.find((g) => g.id === book.guestID);

    return {
      id: book.id,
      fullName: guest?.fullName || "Unknown Guest",
      numNights: book.numNights || 0,
      status: book.status || "checkIn",
    };
  });

  return (
    <>
      <div className="space-y-[1svh]   ">
        <Header>Today</Header>
        <ul className="overflow-y-auto  space-y-[1svh]  h-[40svh]  md:h-full">
          {combineData?.map((guest) => {
            return (
              <li
                key={guest.id}
                className="grid grid-cols-4 text-center justify-center items-center  "
              >
                <p className="badge text-xs max-sm:text-[0.6rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem]  2xl:text-[0.9rem] badge-primary ">
                  {guest.status === "checkIn" ? "Arriving" : "Departing"}
                </p>
                <h1 className="text-xs max-sm:text-[0.6rem]md:text-[0.6rem]lg:text-[0.8rem] xl:text-[1rem] 2xl:text-[1.1rem]   ">
                  {guest.fullName}
                </h1>
                <span className="text-xs max-sm:text-[0.6rem]md:text-[0.6rem] lg:text-[0.8rem]  xl:text-[1rem]  2xl:text-[1.1rem] text-center">
                  {guest.numNights} nights
                </span>
                <button
                  onClick={() => {
                    navigate(`CheckIn/${guest.id}`);
                  }}
                  className="btn badge text-xs  max-sm:text-[0.6rem] md:text-[0.6rem] lg:text-[0.8rem] xl:text-[1rem]  2xl:text-[1.1rem]  badge-primary mx-auto"
                >
                  {guest.status === "checkIn" ? "CheckIn" : "CheckOut"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default TodayCheckList;
