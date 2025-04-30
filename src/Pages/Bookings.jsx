import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Header from "../UI/Header";

function bookings() {
  return (
    <>
      <>
        <header className="flex flex-col md:flex-row justify-between gap-2 w-full">
          <Header className="w-full md:w-1/3 lg:w-1/4">Bookings</Header>
          <div className="flex w-full md:w-2/3 lg:w-3/4 gap-2">
            <BookingTableOperations />
          </div>
        </header>
        <BookingTable />
      </>
    </>
  );
}

export default bookings;
