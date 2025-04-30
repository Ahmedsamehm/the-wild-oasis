import { EllipsisVertical } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useDeleteBook from "../features/bookings/useDeleteBook";

function ListDropdownMenu({ idBooking, status }) {
  const navigate = useNavigate();
  const { DeleteBook, DeleteLoading } = useDeleteBook();
  const handleSeeDetails = () => {
    navigate(`/BookingDetails/${idBooking}`);
  };

  const handelCheckIn = () => {
    navigate(`/CheckIn/${idBooking}`);
  };

  return (
    <details className="dropdown">
      <summary className="btn m-1">
        <EllipsisVertical />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box shadow-lg z-10 flex flex-row space-x-2 p-2 min-w-fit max-w-[90vw]">
        {status === "unconfirmed" ? (
          <li>
            <a
              onClick={handleSeeDetails}
              className="text-sm font-bold whitespace-nowrap hover:bg-base-200 px-3 py-2 rounded"
            >
              See details
            </a>
          </li>
        ) : (
          <li>
            <a
              onClick={handelCheckIn}
              className="text-sm font-bold whitespace-nowrap hover:bg-base-200 px-3 py-2 rounded"
            >
              See details
            </a>
          </li>
        )}
        {status === "unconfirmed" && (
          <li>
            <a
              onClick={handelCheckIn}
              className="text-sm font-bold whitespace-nowrap hover:bg-base-200 px-3 py-2 rounded"
            >
              Check in
            </a>
          </li>
        )}
        <li>
          {DeleteLoading ? (
            <button className="text-sm font-bold whitespace-nowrap hover:bg-base-200 px-3 py-2 rounded">
              Deleting...
            </button>
          ) : (
            <button
              onClick={() => DeleteBook(idBooking)}
              className="text-sm font-bold whitespace-nowrap hover:bg-base-200 px-3 py-2 rounded"
            >
              Delete
            </button>
          )}
        </li>
      </ul>
    </details>
  );
}

export default ListDropdownMenu;
