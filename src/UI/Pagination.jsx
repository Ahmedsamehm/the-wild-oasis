import React from "react";
import { useSearchParams } from "react-router-dom";
import { Page_Number } from "../constants";
import useBooking from "../features/bookings/useBooking";

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { count, Bookings } = useBooking();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / Page_Number);

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  };

  const previousPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };

  return (
    <div className="join space-x-2">
      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className="join-item btn btn-outline"
      >
        Previous
      </button>
      <div className="join">{currentPage}</div>

      {Bookings?.length === 0 ? (
        <button
          onClick={nextPage}
          disabled={true}
          className="join-item btn btn-outline"
        >
          Next
        </button>
      ) : (
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="join-item btn btn-outline"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
