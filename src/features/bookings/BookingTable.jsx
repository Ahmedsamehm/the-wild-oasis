import React, { useEffect } from "react";
import Table from "../../UI/Table";
import { useBookingFilter } from "../cabins/useFilter";
import { EllipsisVertical, MoveRight } from "lucide-react";
import ListDropdownMenu from "../../UI/ListDropdownMenu";
import Pagination from "../../UI/Pagination";
import useBooking from "./useBooking";
import Loading from "../../UI/Loading";

function BookingTable() {
  const { Bookings, isLoading } = useBooking();

  const sortedBookings = useBookingFilter(Bookings || []);

  const columns = [
    { header: "Cabin" },
    { header: "Guest" },
    { header: "Dates" },
    { header: "Status" },
    { header: "Amount" },
    { header: "Actions" },
  ];

  if (!Bookings) return <span>No Bookings</span>;
  return (
    <>
      {isLoading && Bookings ? (
        <Loading />
      ) : (
        <Table columns={columns}>
          {sortedBookings?.map(
            (
              { cabinId, guestID, startDate, endDate, status, totalPrice, id },
              index
            ) => (
              <tr key={index} className="hover:bg-base-300 transition-colors ">
                <th className="break-words">{cabinId}</th>
                <td className="break-words">{guestID}</td>
                <td className="break-words">
                  <ul className="list-none space-y-1">
                    <li className="truncate  flex flex-col ">
                      <span className="flex mx-auto gap-1">
                        {new Date(startDate).toLocaleDateString("en-GB")}
                        <MoveRight size={15} />
                      </span>
                      <span className="badge badge-ghost badge-sm  w-full ">
                        {new Date(endDate).toLocaleDateString("en-GB")}
                      </span>
                    </li>
                  </ul>
                </td>
                <td className="break-words">
                  <span className="badge badge-primary  badge-sm p-4">
                    {status}
                  </span>
                </td>
                <td className="break-words">${totalPrice}</td>

                <ListDropdownMenu idBooking={id} status={status} />
              </tr>
            )
          )}

          <td colSpan={12}>
            <Pagination />
          </td>
        </Table>
      )}
    </>
  );
}

export default BookingTable;
