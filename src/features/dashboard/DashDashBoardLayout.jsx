import Loading from "../../UI/Loading";
import useGetCabins from "../cabins/useGetCabins";
import ChartGraph from "./ChartGraph";
import GroupList from "./groupList";
import SalesChart from "./SalesChart";
import TodayCheckList from "./TodayCheckList";
import useRecentBooking from "./useRecentBooking";
import useRecentStays from "./useRecentStays";

function DashBoardLayout() {
  const { bookingDate, isLoading: isRecentLoading } = useRecentBooking();
  const { cabins } = useGetCabins();
  const { numDay } = useRecentStays();

  if (isRecentLoading) return <Loading />;
  return (
    <>
      <GroupList bookingDate={bookingDate} cabins={cabins} />
      <div className="grid grid-cols-2 gap-x-[1vw]   space-y-5 ">
        <div className="col-span-2  md:col-span-1 bg-neutral rounded-xl p-3 md:p-6 size-auto   overflow-auto shadow-xl   ">
          <TodayCheckList />
        </div>
        <div className="col-span-2 md:col-span-1 bg-neutral rounded-xl size-auto   ">
          <ChartGraph bookingDate={bookingDate} numDay={numDay} />
        </div>
        <div className="col-span-2  bg-neutral rounded-xl size-auto ">
          <SalesChart numDay={numDay} bookingDate={bookingDate} />
        </div>
      </div>
    </>
  );
}

export default DashBoardLayout;
